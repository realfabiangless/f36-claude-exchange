// Prüft, dass marketplace.json und plugins/ zusammenpassen.
// Aufruf: bun scripts/check-marketplace.ts
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const errors: string[] = [];
const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const readJson = (path: string) => {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`${path}: kein gültiges JSON (${(e as Error).message})`);
    return null;
  }
};

const marketplace = readJson(join(root, ".claude-plugin/marketplace.json"));
const entries: { name: string; source: string; description?: string }[] = marketplace?.plugins ?? [];
const listed = new Set(entries.map((p) => p.name));

for (const p of entries) {
  if (!kebab.test(p.name)) errors.push(`${p.name}: Name muss kebab-case sein`);
  if (p.source !== `./plugins/${p.name}`) errors.push(`${p.name}: source muss "./plugins/${p.name}" sein`);
  if (!p.description) errors.push(`${p.name}: description fehlt im Marketplace-Eintrag`);
}

const pluginDirs = readdirSync(join(root, "plugins")).filter((d) => statSync(join(root, "plugins", d)).isDirectory());

for (const dir of pluginDirs) {
  const base = join(root, "plugins", dir);
  if (!listed.has(dir)) errors.push(`plugins/${dir}: fehlt in marketplace.json`);

  const manifest = readJson(join(base, ".claude-plugin/plugin.json"));
  if (manifest && manifest.name !== dir) errors.push(`plugins/${dir}: plugin.json name ist "${manifest.name}", erwartet "${dir}"`);
  if (manifest?.version) errors.push(`plugins/${dir}: bitte kein version-Feld, Updates laufen über Commits`);

  const skillsDir = join(base, "skills");
  const skills = existsSync(skillsDir) ? readdirSync(skillsDir).filter((s) => statSync(join(skillsDir, s)).isDirectory()) : [];
  if (skills.length !== 1) errors.push(`plugins/${dir}: genau ein Skill pro Plugin erwartet, gefunden ${skills.length}`);
  for (const s of skills) {
    const skillMd = join(skillsDir, s, "SKILL.md");
    if (!existsSync(skillMd)) {
      errors.push(`plugins/${dir}/skills/${s}: SKILL.md fehlt`);
      continue;
    }
    const head = readFileSync(skillMd, "utf8").split("---")[1] ?? "";
    if (!/^name:\s*\S/m.test(head)) errors.push(`${s}/SKILL.md: name im Frontmatter fehlt`);
    if (!/^description:\s*\S/m.test(head)) errors.push(`${s}/SKILL.md: description im Frontmatter fehlt`);
  }
}

for (const name of listed) {
  if (!pluginDirs.includes(name)) errors.push(`marketplace.json: "${name}" hat keinen Ordner unter plugins/`);
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${pluginDirs.length} Plugin(s) geprüft, alles konsistent`);
