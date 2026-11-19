const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;

export function lintSkill(text, directoryName) {
  if (!FRONTMATTER.test(text)) {
    return ['missing frontmatter: the file must start with a --- delimited block'];
  }
  return [];
}
