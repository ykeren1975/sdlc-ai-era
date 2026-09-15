// Link preview images (1200×630 PNG), rendered at build time: satori (object tree → SVG) + resvg (SVG → PNG).
import { readFileSync } from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Light theme tokens from global.css, as hex (satori/resvg don't understand oklch).
const C = {
  paper: "#faf9f6",
  ink: "#1a2233",
  muted: "#5b6475",
  line: "#dfe2e8",
  dot: "#d3d8df",
  accent: "#0b6e66",
  soft: "#dff3ef",
};

// Satori needs TTF/OTF/WOFF (not WOFF2), so use the static @fontsource packages.
function font(pkg: string, file: string) {
  return readFileSync(
    path.resolve("node_modules/@fontsource", pkg, "files", file),
  );
}
let fonts: Parameters<typeof satori>[1]["fonts"] | undefined;
function loadFonts() {
  fonts ??= [
    {
      name: "Inter",
      data: font("inter", "inter-latin-400-normal.woff"),
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: font("inter", "inter-latin-600-normal.woff"),
      weight: 600,
      style: "normal",
    },
    {
      name: "Fraunces",
      data: font("fraunces", "fraunces-latin-600-normal.woff"),
      weight: 600,
      style: "normal",
    },
    {
      name: "Fraunces",
      data: font("fraunces", "fraunces-latin-600-italic.woff"),
      weight: 600,
      style: "italic",
    },
  ];
  return fonts;
}

// Same drawing as src/components/Logo.astro and public/favicon.svg, with fixed light-theme colours.
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><g stroke="${C.accent}" stroke-width="3" stroke-linecap="round"><path d="M17.10 4.55A11.5 11.5 0 0 1 24.26 8.00" stroke-opacity="1"/><path d="M25.64 9.72A11.5 11.5 0 0 1 27.41 17.47" stroke-opacity="0.9"/><path d="M26.91 19.62A11.5 11.5 0 0 1 21.96 25.84" stroke-opacity="0.8"/><path d="M19.97 26.79A11.5 11.5 0 0 1 12.03 26.79" stroke-opacity="0.7"/><path d="M10.04 25.84A11.5 11.5 0 0 1 5.09 19.62" stroke-opacity="0.6"/><path d="M4.59 17.47A11.5 11.5 0 0 1 6.36 9.72" stroke-opacity="0.5"/><path d="M7.74 8.00A11.5 11.5 0 0 1 14.90 4.55" stroke-opacity="0.4"/></g><path fill="${C.ink}" d="M16 10.2c.5 3 2.8 5.3 5.8 5.8-3 .5-5.3 2.8-5.8 5.8-.5-3-2.8-5.3-5.8-5.8 3-.5 5.3-2.8 5.8-5.8Z"/></svg>`;
const LOGO_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

// Dots fade out towards the bottom-left; the glow sits top-right behind the eyebrow.
const BACKDROP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
<defs>
<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="1.4" fill="${C.dot}"/></pattern>
<radialGradient id="fade" cx="0.85" cy="0.05" r="1.1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0.15"/></radialGradient>
<mask id="m"><rect width="100%" height="100%" fill="url(#fade)"/></mask>
<radialGradient id="glow" cx="${OG_WIDTH - 180}" cy="40" r="720" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.accent}" stop-opacity="0.2"/><stop offset="0.45" stop-color="${C.accent}" stop-opacity="0.07"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="100%" height="100%" fill="${C.paper}"/>
<rect width="100%" height="100%" fill="url(#dots)" mask="url(#m)"/>
<rect width="100%" height="100%" fill="url(#glow)"/>
</svg>`;
const BACKDROP_URI = `data:image/svg+xml;base64,${Buffer.from(BACKDROP_SVG).toString("base64")}`;

type Node = {
  type: string;
  props: Record<string, unknown> & {
    style?: Record<string, unknown>;
    children?: Child | Child[];
  };
};
type Child = Node | string | null | false;

const h = (
  type: string,
  style: Record<string, unknown>,
  children?: Child | Child[],
  props: Record<string, unknown> = {},
): Node => ({ type, props: { ...props, style, children } });

export interface OgCard {
  /** Small label top-right, e.g. "Role guide". */
  eyebrow: string;
  /** Main heading. Wrap a word in *asterisks* to set it in accent italic. */
  title: string;
  subtitle?: string;
  /** Short list under the subtitle (role takeaways). */
  bullets?: string[];
  /** Left side of the footer strip. */
  footer: string;
  /** Title size in px (default depends on length); titles clamp at two lines. */
  titleSize?: number;
}

function titleNodes(title: string): Child[] {
  // Split into words so satori can wrap across the accent span.
  return title.split(/\s+/).map((word) => {
    const accent = /^\*(.+)\*(\W*)$/.exec(word);
    if (!accent) return h("span", { marginRight: "0.24em" }, word);
    return h("span", { marginRight: "0.24em" }, [
      h("span", { color: C.accent, fontStyle: "italic" }, accent[1]),
      accent[2] || null,
    ]);
  });
}

function tree(card: OgCard): Node {
  // Shrink long titles so a two-line title still leaves room for the subtitle and list.
  const titleSize = card.titleSize ?? (card.title.length > 32 ? 54 : 64);
  const hasBullets = !!card.bullets?.length;
  return h(
    "div",
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      backgroundColor: C.paper,
      color: C.ink,
      fontFamily: "Inter",
    },
    [
      // Faint dot grid and soft teal glow, as on the home hero (an SVG, which resvg renders faithfully).
      h("img", { position: "absolute", top: 0, left: 0 }, undefined, {
        src: BACKDROP_URI,
        width: OG_WIDTH,
        height: OG_HEIGHT,
      }),
      // Header: logo + wordmark, eyebrow pill.
      h(
        "div",
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "52px 72px 0",
        },
        [
          h("div", { display: "flex", alignItems: "center" }, [
            h("img", { width: 58, height: 58 }, undefined, {
              src: LOGO_URI,
              width: 58,
              height: 58,
            }),
            h(
              "div",
              {
                display: "flex",
                marginLeft: 16,
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: -0.5,
              },
              [
                "SDLC",
                h("span", { color: C.accent, marginLeft: 9 }, "in the AI Era"),
              ],
            ),
          ]),
          h(
            "div",
            {
              display: "flex",
              padding: "9px 20px",
              borderRadius: 999,
              backgroundColor: C.soft,
              color: C.accent,
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: 1.6,
            },
            // Non-breaking spaces: satori dropped the space after a hyphenated word ("ROLE-BY-ROLEGUIDE").
            card.eyebrow.toUpperCase().replace(/ /g, "\u00a0"),
          ),
        ],
      ),
      // Body.
      h(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          padding: "0 72px",
        },
        [
          h(
            "div",
            {
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: titleSize,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxHeight: titleSize * 1.1 * 2,
              overflow: "hidden",
            },
            titleNodes(card.title),
          ),
          card.subtitle
            ? h(
                "div",
                {
                  display: "block",
                  marginTop: hasBullets ? 14 : 22,
                  fontSize: hasBullets ? 29 : 34,
                  lineHeight: 1.35,
                  color: C.muted,
                  lineClamp: 2,
                  maxWidth: 1000,
                },
                card.subtitle,
              )
            : null,
          hasBullets
            ? h(
                "div",
                { display: "flex", flexDirection: "column", marginTop: 30 },
                card.bullets!.slice(0, 3).map((text, i) =>
                  h(
                    "div",
                    {
                      display: "flex",
                      alignItems: "center",
                      marginTop: i === 0 ? 0 : 14,
                    },
                    [
                      h("div", {
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        backgroundColor: C.accent,
                        marginRight: 20,
                        flexShrink: 0,
                      }),
                      h(
                        "div",
                        {
                          display: "block",
                          fontSize: 27,
                          lineHeight: 1.3,
                          lineClamp: 1,
                          maxWidth: 1020,
                        },
                        text,
                      ),
                    ],
                  ),
                ),
              )
            : null,
        ],
      ),
      // Footer strip.
      h(
        "div",
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 78,
          padding: "0 72px",
          borderTop: `1px solid ${C.line}`,
          backgroundColor: "rgba(255,255,255,0.72)",
          fontSize: 21,
          color: C.muted,
        },
        [
          h("div", { display: "flex", alignItems: "center" }, [
            h("div", {
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: C.accent,
              marginRight: 14,
            }),
            card.footer,
          ]),
          h(
            "div",
            { display: "flex", color: C.ink, fontWeight: 600 },
            "ykeren1975.github.io/sdlc-ai-era",
          ),
        ],
      ),
    ],
  );
}

/** Render a card to PNG bytes. */
export async function renderOgImage(
  card: OgCard,
): Promise<Uint8Array<ArrayBuffer>> {
  // satori's types expect a ReactNode; the plain object form is what it consumes at runtime.
  const svg = await satori(
    tree(card) as unknown as Parameters<typeof satori>[0],
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: loadFonts(),
    },
  );
  const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_WIDTH } })
    .render()
    .asPng();
  return new Uint8Array(png);
}
