const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const REQUIRED_FIELDS = ['name', 'description'];

export function lintSkill(text, directoryName) {
  const match = FRONTMATTER.exec(text);
  if (!match) {
    return ['missing frontmatter: the file must start with a --- delimited block'];
  }
  const fields = parseFields(match[1]);
  return REQUIRED_FIELDS.filter((field) => !fields[field]).map(
    (field) => `missing required field: ${field}`,
  );
}

function parseFields(frontmatter) {
  const fields = {};
  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return fields;
}
