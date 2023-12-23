function slugify(text: string): string {
  const cleanedText = text.replace(/[^\w\s-]/g, "");

  const slug = cleanedText.replace(/\s+/g, "-");

  return slug.toLowerCase();
}

export { slugify };
