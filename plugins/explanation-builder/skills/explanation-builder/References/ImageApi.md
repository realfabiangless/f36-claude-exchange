# Bilder

Bilder sind für Konzepte, die ein Bild im Kopf brauchen: eine Metapher, eine Szene, eine Stimmung. Für Abläufe, Zahlen und Zusammenhänge ist ein Diagramm (SVG) fast immer besser. Höchstens 1–3 Bilder pro Erklärung, jedes mit Bildunterschrift, die sagt, was man sehen soll.

Kein Text in Bildern: Bildmodelle schreiben Wörter oft falsch. Beschriftung gehört ins HTML.

## Key einrichten

Gleiche Datei wie für die Stimme: `~/.claude/.env` (siehe `VoiceOver.md`, „Key einrichten“).
- **Gemini** (`GEMINI_API_KEY` oder `GOOGLE_API_KEY`): aistudio.google.com → Get API key. Kostenloses Kontingent, gut für den Start.
- **OpenAI** (`OPENAI_API_KEY`): platform.openai.com → API keys.

Ein Key reicht. Wer schon OpenAI für die Stimme nutzt, nimmt OpenAI auch für Bilder.

## Aktuelles Modell nachsehen

Modellnamen ändern sich. Vor dem ersten Bild einmal prüfen:

```bash
set -a; . ~/.claude/.env; set +a
curl -s https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY" | jq -r '.data[].id' | grep -i image | sort
G=${GEMINI_API_KEY:-$GOOGLE_API_KEY}; curl -s "https://generativelanguage.googleapis.com/v1beta/models?key=$G&pageSize=200" | jq -r '.models[].name' | grep -i image
```

Nimm das neueste Modell ohne `preview` im Namen.

## Bild erzeugen

### OpenAI

```bash
jq -n --arg p "PROMPT" '{model:"MODELL", prompt:$p, size:"1536x1024", quality:"medium", n:1}' \
 | curl -s https://api.openai.com/v1/images/generations -H "Authorization: Bearer $OPENAI_API_KEY" -H "content-type: application/json" -d @- \
 | jq -r '.data[0].b64_json // ("FEHLER " + .error.message)' > img/NAME.b64
head -c 7 img/NAME.b64   # "FEHLER" → Meldung lesen; sonst:
base64 -d < img/NAME.b64 > img/NAME.png && rm img/NAME.b64
```

### Gemini

```bash
G=${GEMINI_API_KEY:-$GOOGLE_API_KEY}
jq -n --arg p "PROMPT" '{contents:[{parts:[{text:$p}]}], generationConfig:{responseModalities:["IMAGE"]}}' \
 | curl -s "https://generativelanguage.googleapis.com/v1beta/models/MODELL:generateContent?key=$G" -H "content-type: application/json" -d @- \
 | jq -r '[.candidates[0].content.parts[]? | select(.inlineData) | .inlineData.data][0] // ("FEHLER " + (.error.message // "kein Bild"))' > img/NAME.b64
head -c 7 img/NAME.b64
base64 -d < img/NAME.b64 > img/NAME.jpg && rm img/NAME.b64
```

Gemini liefert meist JPEG, OpenAI PNG. `file img/NAME.*` zeigt das Format.

## Prompt-Aufbau

`<Stil aus Visuals.md>. <Was zu sehen ist, konkret>. <Stimmung>. Kein Text, keine Buchstaben.`

Beispiel: „Flache Illustration mit klaren Flächen und wenigen Farben. Ein Staffelstab wird zwischen drei Händen weitergegeben, die mittlere Hand greift daneben. Ruhig, leicht humorvoll. Kein Text, keine Buchstaben.“

## In die Seite bringen

- **Artifact:** Bild über `files` mitschicken (`{"img/NAME.png": "<pfad>"}`) und in der Seite als `<img src="img/NAME.png" alt="…">` einbinden.
- **Lokale Datei:** Bild im Ordner `img/` neben der HTML-Seite lassen, gleicher `src`.

Scheitert ein Bild oder dauert es länger als 2 Minuten: ohne Bild weitermachen und am Ende sagen, welches fehlt und warum.
