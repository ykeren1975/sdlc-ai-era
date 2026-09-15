// GoatCounter (privacy-friendly, no cookies). The loader only runs on the live host,
// so local builds and tests never send hits. Click events use data-goatcounter-click.
export const ANALYTICS_HOST = "ykeren1975.github.io";
export const GOATCOUNTER_ENDPOINT = "https://sdlc-ai-era.goatcounter.com/count";
export const GOATCOUNTER_SCRIPT = "https://gc.zgo.at/count.js";

/** Attributes for a counted click, e.g. {...track("copy-instructions", "developer/ai-diff-review")}. */
export function track(event: string, detail?: string) {
  return {
    "data-goatcounter-click": detail ? `${event}/${detail}` : event,
  };
}
