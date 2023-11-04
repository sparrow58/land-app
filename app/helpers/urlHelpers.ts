export function getCurrentLanguage(relativePath: string) {
  const pathParts = relativePath.split("/");

  if (pathParts.length > 0) {
    return pathParts[1];
  }
  return null;
}

export function toggleLanguage(relativePath: string) {
  const languages = ["en", "ar"];
  const pathParts = relativePath.split("/");

  if (pathParts.length > 0) {
    const currentLanguage = pathParts[1];
    const currentIndex = languages.indexOf(currentLanguage);

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % languages.length;
      pathParts[1] = languages[nextIndex];
      return { newPath: pathParts.join("/"), currentLanguage };
    }
  }

  return { relativePath, currentLanguage: "en" }; // Return the original relative path if no language code was found
}
