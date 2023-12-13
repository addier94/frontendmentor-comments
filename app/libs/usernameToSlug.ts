// make slug to a userName 
export const makeSlug = (userName: string) => {
  // Replace spaces and special characters with a hyphen
  const slug = userName
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (excluding spaces and hyphens)
    .replace(/\s+/g, '-') // Replace spaces with a single hyphen
    .replace(/--+/g, '-') // Replace consecutive hyphens with a single hyphen
    .trim(); // Remove leading and trailing spaces

  return slug;
}