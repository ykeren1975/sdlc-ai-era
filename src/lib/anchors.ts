// Stable, readable anchors for shareable deep links (they don't change when items are reordered).
export function slugify(text: string, maxWords = 6): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, maxWords)
    .join("-")
    .replace(/-+/g, "-");
}

/** Unique anchors for a list, e.g. change-writing-code; duplicates get -2, -3. */
export function anchorIds(prefix: string, labels: string[]): string[] {
  const seen = new Map<string, number>();
  return labels.map((label) => {
    const base = `${prefix}-${slugify(label)}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  });
}

export const changeIds = (shifts: { activity: string }[]) =>
  anchorIds(
    "change",
    shifts.map((s) => s.activity),
  );
export const riskIds = (risks: { headline?: string; text: string }[]) =>
  anchorIds(
    "risk",
    risks.map((r) => r.headline ?? r.text),
  );
