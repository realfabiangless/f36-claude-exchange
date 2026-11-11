---
name: skill-einreichen
description: Verpackt einen vorhandenen Skill als eigenes Plugin für den F36 Claude Exchange (GitHub-Repo realfabiangless/f36-claude-exchange) und bereitet einen Pull Request vor. USE WHEN skill einreichen, skill teilen, skill hochladen, skill in den exchange, skill für F36 veröffentlichen.
---

# Skill einreichen

Du hilfst einem F36-Mitglied, einen Skill in den F36 Claude Exchange zu bringen. Jeder Skill wird ein eigenes Plugin, damit andere ihn einzeln installieren können.

## Ablauf

1. **Skill finden.** Frag, welcher Skill geteilt werden soll, und lies den Ordner (meist `~/.claude/skills/<name>/`). Zeig kurz, welche Dateien dazugehören.
2. **Sicherheits-Check, bevor irgendetwas kopiert wird.** Das Repo ist öffentlich. Durchsuche alle Dateien des Skills nach:
   - API-Keys, Tokens, Passwörtern, Webhook-URLs mit Secrets
   - Kundendaten, Namen, E-Mail-Adressen, Telefonnummern
   - internen Firmen-Details (Umsätze, Preise, interne Systemnamen, private Pfade wie `/Users/<name>/`)
   - Inhalten aus dem Forum (Themen, Namen oder erkennbare Details anderer Mitglieder)
   Liste jeden Fund mit Datei und Zeile auf und schlag eine neutrale Ersetzung vor. Erst weitermachen, wenn das Mitglied alle Funde geklärt hat.
3. **Repo holen.** Falls noch nicht vorhanden: `gh repo fork realfabiangless/f36-claude-exchange --clone` (oder `git clone`, wenn die Person Schreibrechte hat). Neuen Branch anlegen: `skill/<name>`.
4. **Plugin anlegen** nach der Vorlage in `templates/skill-plugin/`:
   ```
   plugins/<name>/
   ├── .claude-plugin/plugin.json
   └── skills/<name>/SKILL.md   (+ weitere Dateien des Skills)
   ```
   Der Plugin-Name ist kebab-case und identisch mit dem Ordnernamen. In `plugin.json` kein `version`-Feld setzen; Updates laufen über Commits.
5. **Im Marketplace eintragen.** In `.claude-plugin/marketplace.json` einen Eintrag ins `plugins`-Array ergänzen: `name`, `source` (`./plugins/<name>`), `description`.
6. **Prüfen:** `bun scripts/check-marketplace.ts` muss grün sein.
7. **Pull Request** als Draft öffnen: Titel `Add skill: <name>`, im Text ein Satz, was der Skill tut, und ein Beispiel-Prompt, der ihn auslöst.

## Worauf achten

- Ein Skill pro Plugin. Nie mehrere Skills in ein Plugin bündeln; die anderen sollen frei wählen.
- Die `description` im SKILL.md entscheidet, wann Claude den Skill lädt. Sie soll konkrete Auslöser nennen.
- Nichts direkt auf `main` pushen.
