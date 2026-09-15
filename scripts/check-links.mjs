// Checks that every external URL in the content (role sources, data files, guide pages) resolves.
// Usage: npm run check:links [-- path/to/role.md ...]
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

const ROOT = path.resolve(import.meta.dirname, "..");
const ROLES_DIR = path.join(ROOT, "src/content/roles");
const DATA_FILES = ["tools.yaml", "agent-skills.yaml"].map((f) =>
  path.join(ROOT, "src/data", f),
);
const PAGES_WITH_LINKS = [
  path.join(ROOT, "src/pages/agent-skills.astro"),
  path.join(ROOT, "src/pages/about.astro"),
];
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;
// Some sites block non-browser clients; 401/403/429 means the page exists but refused us.
const SOFT_FAIL = new Set([401, 403, 429]);

async function frontmatter(file) {
  const text = await readFile(file, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  return match ? parse(match[1]) : {};
}

async function collectUrls(roleFiles) {
  const urls = new Map(); // url -> where it is used
  const add = (url, where) => {
    if (!urls.has(url)) urls.set(url, []);
    urls.get(url).push(where);
  };

  for (const file of roleFiles) {
    const data = await frontmatter(file);
    for (const s of data.sources ?? [])
      add(s.url, `${path.basename(file)} → source ${s.id}`);
  }
  for (const dataFile of DATA_FILES) {
    try {
      const entries = parse(await readFile(dataFile, "utf8")) ?? [];
      for (const e of entries)
        add(e.url, `${path.basename(dataFile)} → ${e.id}`);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }
  // Hardcoded external links in pages (e.g. the Agent skills guide).
  for (const page of PAGES_WITH_LINKS) {
    const text = await readFile(page, "utf8");
    for (const [href] of text.matchAll(/https:\/\/[^\s"'`)<>]+/g))
      add(href, path.relative(ROOT, page));
  }
  return urls;
}

async function request(url, method) {
  return fetch(url, {
    method,
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36",
      accept: "text/html,application/xhtml+xml,*/*",
    },
  });
}

async function check(url, retries = 1) {
  try {
    let res = await request(url, "HEAD");
    if (!res.ok && !SOFT_FAIL.has(res.status)) res = await request(url, "GET");
    if (res.ok) return { status: "ok", code: res.status };
    if (SOFT_FAIL.has(res.status)) return { status: "warn", code: res.status };
    return { status: "fail", code: res.status };
  } catch (err) {
    // Network errors (DNS, timeouts) are often transient; retry before failing.
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 2000));
      return check(url, retries - 1);
    }
    return { status: "fail", code: err.cause?.code ?? err.name };
  }
}

const args = process.argv.slice(2);
const roleFiles = args.length
  ? args.map((a) => path.resolve(a))
  : (await readdir(ROLES_DIR))
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .map((f) => path.join(ROLES_DIR, f));

const urls = await collectUrls(roleFiles);
const entries = [...urls.entries()];
const results = [];
for (let i = 0; i < entries.length; i += CONCURRENCY) {
  const batch = entries.slice(i, i + CONCURRENCY);
  results.push(
    ...(await Promise.all(
      batch.map(async ([url, where]) => ({
        url,
        where,
        ...(await check(url)),
      })),
    )),
  );
}

const failed = results.filter((r) => r.status === "fail");
const warned = results.filter((r) => r.status === "warn");
for (const r of warned)
  console.warn(`WARN ${r.code} ${r.url}\n     used in: ${r.where.join(", ")}`);
for (const r of failed)
  console.error(`FAIL ${r.code} ${r.url}\n     used in: ${r.where.join(", ")}`);
console.log(
  `\nChecked ${results.length} URLs: ${results.length - failed.length - warned.length} ok, ${warned.length} blocked-but-exists, ${failed.length} failed.`,
);
process.exit(failed.length ? 1 : 0);
