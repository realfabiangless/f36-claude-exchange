# Einen Skill beitragen

## Regeln

1. **Ein Skill = ein Plugin.** Keine Bundles. Jeder soll frei wählen, was er installiert.
2. **Öffentlich heißt öffentlich.** Vor dem Einreichen prüfen: keine API-Keys, Tokens, Passwörter, keine Kundendaten, keine internen Zahlen, keine privaten Pfade (`/Users/<name>/…`), keine Forum-Inhalte anderer Mitglieder.
3. **Kein `version`-Feld** in `plugin.json`. Jeder Commit gilt automatisch als neue Version.
4. **Pull Request statt direkt auf `main`.** Die GitHub Action prüft die Struktur, einer von uns merged.

## Struktur

Kopier [`templates/skill-plugin/`](templates/skill-plugin/) nach `plugins/<skill-name>/` und benenne `skills/mein-skill/` um:

```
plugins/<skill-name>/
├── .claude-plugin/plugin.json      # name = <skill-name>
└── skills/<skill-name>/
    ├── SKILL.md                    # Frontmatter: name + description
    └── …                           # weitere Dateien des Skills, falls nötig
```

Dann in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) eintragen:

```json
{
  "name": "<skill-name>",
  "source": "./plugins/<skill-name>",
  "description": "Ein Satz, was der Skill tut."
}
```

Und die Tabelle „Verfügbare Skills“ im [README](README.md) ergänzen.

## Lokal prüfen

```
bun scripts/check-marketplace.ts
```

Lokal testen, bevor du den PR öffnest:

```
/plugin marketplace add ./pfad/zu/f36-claude-exchange
/plugin install <skill-name>@f36-claude-exchange
```

## Die `description` ist das Wichtigste

Claude entscheidet anhand der `description` im SKILL.md, wann ein Skill geladen wird. Schreib rein, was der Skill tut **und** bei welchen Formulierungen er greifen soll, z.B. `USE WHEN angebot schreiben, angebot erstellen`.
