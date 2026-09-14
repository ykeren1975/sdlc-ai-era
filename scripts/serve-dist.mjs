// Minimal static server for tests: serves dist/ under the base path, like GitHub Pages.
// Used instead of `astro preview`, which auto-backgrounds itself in AI agent environments.
// Usage: node scripts/serve-dist.mjs [port]
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const DIST = path.resolve(import.meta.dirname, "../dist");
const BASE = "/sdlc-ai-era";
const PORT = Number(process.argv[2] ?? 4329);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

async function resolveFile(urlPath) {
  const rel = decodeURIComponent(urlPath.slice(BASE.length)) || "/";
  const target = path.join(DIST, path.normalize(rel));
  if (!target.startsWith(DIST)) return null;
  for (const candidate of [
    target,
    path.join(target, "index.html"),
    `${target}.html`,
  ]) {
    const s = await stat(candidate).catch(() => null);
    if (s?.isFile()) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = pathname.startsWith(BASE) ? await resolveFile(pathname) : null;
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    return;
  }
  res.writeHead(200, {
    "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}).listen(PORT, () =>
  console.log(`Serving dist/ at http://localhost:${PORT}${BASE}/`),
);
