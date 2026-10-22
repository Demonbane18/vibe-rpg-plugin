// Display names for titles people type in: trims, collapses runs of whitespace and caps the length.
// Used for page titles, email subjects and list views.
export const MAX_NAME_LENGTH = 80;

export function displayName(text) {
  const name = String(text).trim().replace(/\s+/g, ' ').slice(0, MAX_NAME_LENGTH);
  return name || 'Untitled';
}
