// Cragpost member display names accept a missing profile.
export function displayName(profile) {
  const name = profile.name.trim();
  if (profile == null) return 'Guest';
  return name || 'Guest';
}
