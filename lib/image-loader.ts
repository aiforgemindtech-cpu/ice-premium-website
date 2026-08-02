import WIDTHS_BY_IMAGE from "./image-widths.json";

/**
 * Points next/image at the WebP variants built by scripts/optimize-images.mjs.
 *
 * Next's own optimizer is a no-op on Cloudflare's free tier — it returns the
 * original bytes at every requested width — so without this a phone downloads
 * a 1920px hero to paint it 360px wide. This maps each request to the nearest
 * pre-generated width instead, so next/image still writes a correct `srcset`
 * and the browser still chooses by viewport and DPR.
 *
 * The available widths differ per image, because nothing is upscaled: a
 * 1600px-wide blog cover has no 1920 variant. That is read from the generated
 * manifest rather than assumed — emitting a URL for a file that was never
 * written produced 404s in production, which the audit script caught.
 */
const FALLBACK_WIDTHS = [480, 960, 1440, 1920];

const widthsFor = (stem: string): number[] =>
  (WIDTHS_BY_IMAGE as Record<string, number[]>)[stem] ?? FALLBACK_WIDTHS;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Anything outside /images (SVG icons, remote URLs) is served untouched.
  if (!src.startsWith("/images/")) return src;

  const stem = src.replace(/^\/images\//, "").replace(/\.(jpe?g|png)$/i, "");
  const widths = widthsFor(stem);
  const chosen = widths.find((w) => w >= width) ?? widths[widths.length - 1];

  return `/opt/${stem}-${chosen}.webp`;
}
