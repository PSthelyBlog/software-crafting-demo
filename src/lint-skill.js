const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const MAX_LENGTH = { name: 64, description: 1024 };
const REQUIRED_FIELDS = Object.keys(MAX_LENGTH);
const PORTABLE_NAME = /^[a-z0-9-]+$/;

export function lintSkill(text, directoryName) {
  const match = FRONTMATTER.exec(text);
  if (!match) {
    return ['missing frontmatter: the file must start with a --- delimited block'];
  }
  const fields = parseFields(match[1]);
  return [
    ...missingFieldProblems(fields),
    ...nameProblems(fields.name, directoryName),
    ...lengthProblems(fields),
  ];
}

function missingFieldProblems(fields) {
  return REQUIRED_FIELDS.filter((field) => !fields[field]).map(
    (field) => `missing required field: ${field}`,
  );
}

function nameProblems(name, directoryName) {
  if (!name) return [];
  const problems = [];
  if (!PORTABLE_NAME.test(name)) {
    problems.push(`name "${name}" must use only lowercase letters, digits and hyphens`);
  }
  if (name !== directoryName) {
    problems.push(`name "${name}" does not match directory "${directoryName}"`);
  }
  return problems;
}

function lengthProblems(fields) {
  return REQUIRED_FIELDS.filter((field) => fields[field]?.length > MAX_LENGTH[field]).map(
    (field) => `${field} is ${fields[field].length} characters long; the limit is ${MAX_LENGTH[field]}`,
  );
}

function parseFields(frontmatter) {
  const fields = {};
  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = unquote(line.slice(separator + 1).trim());
  }
  return fields;
}

function unquote(value) {
  const quoted = /^(["'])(.*)\1$/.exec(value);
  return quoted ? quoted[2] : value;
}
