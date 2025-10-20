/**
 * Converts a string to a URL-friendly slug
 * Handles Lithuanian characters consistently across the app
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    // Convert Lithuanian characters to ASCII
    .replace(/ą/g, 'a')
    .replace(/č/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ė/g, 'e')
    .replace(/į/g, 'i')
    .replace(/š/g, 's')
    .replace(/ų/g, 'u')
    .replace(/ū/g, 'u')
    .replace(/ž/g, 'z')
    // Replace any non-alphanumeric characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')
}
