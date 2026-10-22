/**
 * Product photos are stored as full-size originals (about 3000 x 3000 px).
 * cdnImage returns a URL for a square copy cut to `px` pixels on each side.
 */
export function cdnImage(url: string, px: number): string {
  const size = Math.round(px);
  return `${url}?w=${size}&h=${size}&fit=cover`;
}
