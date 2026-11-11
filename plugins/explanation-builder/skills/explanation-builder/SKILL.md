---
name: explanation-builder
description: Baut per Interview einen persönlichen Explanation-Skill für den Nutzer. Danach erklärt Claude Themen aus seinem Arbeitsalltag als visuelle Seite mit Diagrammen, Bildern und einem Motion-Graphics-Erklärvideo mit Sprecherstimme. Prüft vorher, welche Werkzeuge vorhanden sind (Artifact, Bild-API, ElevenLabs/OpenAI/Gemini für die Stimme) und hilft beim Einrichten. USE WHEN explanation-builder, erklär-skill bauen, eigenen explanation skill erstellen, explanation skill einrichten, explanation skill anpassen, mein explanation skill aktualisieren. NOT FOR eine einzelne Erklärung jetzt sofort (dafür ist der erzeugte Skill da).
---

# explanation-builder

Du baust mit dem Nutzer seinen eigenen Explanation-Skill. Der erzeugte Skill landet in `~/.claude/skills/Explanation/` und erklärt danach jedes Thema als Seite, auf der man sich schnell einen Überblick verschafft: Diagramme, Bilder und ein kurzes Erklärvideo mit Stimme.

Der Kern ist nicht verhandelbar und gilt für jeden erzeugten Skill:
- **Grafisch zuerst.** Jede Erklärung hat mindestens ein Diagramm. Text erklärt, was das Diagramm zeigt, nicht umgekehrt.
- **Bilder**, wenn eine Bild-API vorhanden ist und ein Konzept ein Bild braucht.
- **Erklärvideo mit Sprecherstimme** als Motion Graphics im Browser. Stimme: ElevenLabs empfohlen, sonst OpenAI oder Gemini.
- **Nichts voraussetzen.** Jeder Fachbegriff wird beim ersten Auftreten erklärt.

Was sich ändert, ist alles andere: Themen, Leser, Anlässe, Abschnitte, Quellen, Stil. Das holst du im Interview.

## Ablauf

### Phase 0: Bestehenden Skill prüfen
Gibt es `~/.claude/skills/Explanation/SKILL.md` schon? Dann frag, ob du ihn **anpassen** (Interview nur zu den Punkten, die sich ändern sollen) oder **neu bauen** willst. Vor dem Überschreiben eine Kopie nach `~/.claude/skills/Explanation.backup-<datum>/` legen.

### Phase 1: Werkzeug-Check
Folge `References/CapabilityCheck.md`. Ergebnis als kurze Tabelle zeigen: was da ist, was fehlt, was das für den Skill bedeutet. Keys nie ausgeben, nur „gefunden / gültig / ungültig“.

### Phase 2: Interview
Folge `References/InterviewGuide.md`. Eine Frage nach der anderen, mit Antwortoptionen (AskUserQuestion, wo verfügbar). Höchstens 12 Fragen. Nach jedem Block in einem Satz zusammenfassen, was du verstanden hast.

### Phase 3: Fehlendes einrichten
Für alles, was in Phase 1 fehlt und laut Interview gebraucht wird:
- **Stimme:** `References/VoiceOver.md`, Abschnitt „Key einrichten“. ElevenLabs empfehlen, OpenAI und Gemini als Alternativen nennen. Ohne einen dieser drei Keys gibt es kein Voice-over; dann ehrlich sagen, dass Videos stumm mit Untertiteln laufen, bis ein Key da ist. Keine Systemstimme als Ersatz.
- **Bilder:** `References/ImageApi.md`, Abschnitt „Key einrichten“.
- Der Nutzer trägt Keys selbst in `~/.claude/.env` ein. Du öffnest die Datei für ihn, liest den Key aber nie aus und schreibst ihn nie in Skill-Dateien.

### Phase 4: Skill schreiben
Lege `~/.claude/skills/Explanation/` an und schreibe:

| Datei | Quelle | Was du anpasst |
|---|---|---|
| `SKILL.md` | `References/SkillBlueprint.md` | alle `{{…}}` aus den Interview-Antworten; Abschnitte, die nicht passen, streichen |
| `References/WritingRules.md` | `References/WritingRulesTemplate.md` | Beispiele aus der Welt des Nutzers statt der Platzhalter |
| `References/Visuals.md` | `References/VisualsTemplate.md` | erkannte Werkzeuge, Stimme, Bildstil, Befehle |
| `References/PageTemplate.html` | `References/PageTemplate.html` | Farben/Schrift laut Interview, Abschnitte laut Interview |
| `References/VideoTemplate.html` | `References/VideoTemplate.html` | Farben laut Interview; sonst unverändert kopieren |
| `References/VideoGuide.md` | `References/VideoGuide.md` | unverändert kopieren |
| `References/VoiceOver.md` | `References/VoiceOver.md` | nur den Abschnitt des gewählten Anbieters behalten, Stimme eintragen |
| `References/ImageApi.md` | `References/ImageApi.md` | nur den gewählten Anbieter behalten; ohne Bild-API weglassen |
| `References/Links.md` | aus dem Interview | URL-Muster der Systeme, die verlinkt werden sollen; ohne Systeme weglassen |

Danach zeigst du die Dateiliste und die wichtigsten Entscheidungen in fünf Zeilen.

### Phase 5: Testlauf
Bitte den Nutzer um ein echtes Thema aus seinem Alltag (keine Kundendaten nötig). Führe den neuen Skill einmal komplett aus: Seite mit Diagramm, ggf. Bild, Erklärvideo mit Stimme. Frag danach gezielt:
1. Hat die Seite das Thema schneller verständlich gemacht als Text?
2. Was war zu viel, was hat gefehlt?
3. Passt die Stimme, passt das Tempo des Videos?

Passe den Skill anhand der Antworten an. Höchstens zwei Runden, dann ist er fertig; weitere Anpassungen über „aktualisiere meinen Explanation-Skill“.

## Regeln

- Bun oder Node sind **keine** Voraussetzung. Alles läuft mit `curl`, dem Browser und, falls vorhanden, dem Artifact-Tool.
- Nie etwas installieren, ohne zu fragen.
- Keys bleiben in `~/.claude/.env`. Keine Keys in Skill-Dateien, Seiten, Logs oder Antworten.
- Der erzeugte Skill gehört dem Nutzer. Schreibe ihn so, dass er ihn selbst lesen und ändern kann: kurze Sätze, keine Tricks.
- Schreibe Deutsch, wenn der Nutzer Deutsch spricht. Keine geschwollene Sprache.

## Referenzen

- `References/CapabilityCheck.md` — Werkzeuge prüfen, Keys testen ohne sie anzuzeigen
- `References/InterviewGuide.md` — die Fragen und was aus den Antworten folgt
- `References/SkillBlueprint.md` — Vorlage für die erzeugte `SKILL.md`
- `References/WritingRulesTemplate.md`, `References/VisualsTemplate.md` — Vorlagen für die Referenzen des erzeugten Skills
- `References/PageTemplate.html` — Seitengerüst mit Rückkanal an Claude
- `References/VideoTemplate.html`, `References/VideoGuide.md` — Motion-Graphics-Video mit Stimme, Szenen-Muster und Beispiel
- `References/VoiceOver.md` — Sprecherstimme mit ElevenLabs, OpenAI oder Gemini
- `References/ImageApi.md` — Bilder mit Gemini oder OpenAI
