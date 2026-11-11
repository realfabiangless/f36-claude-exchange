# Werkzeug-Check

Prüfe, was auf diesem Rechner und in dieser Claude-Umgebung vorhanden ist. Zeig dem Nutzer das Ergebnis als Tabelle. Keys nie ausgeben.

## 1. Ausgabe: Artifact oder lokale Datei

Steht dir das Artifact-Tool zur Verfügung (Claude Desktop, Claude Code mit Artifacts)? Dann veröffentlicht der Skill Seiten als privates Artifact. Vorteil: Link zum Teilen, Kommentare gehen an Claude zurück.

Sonst: Seite als HTML-Datei unter `~/Explanations/<thema>/index.html` speichern und im Browser öffnen (`open` auf macOS, `start` auf Windows, `xdg-open` auf Linux). Der Rückkanal entfällt dann; das Template blendet die Kommentar-Knöpfe automatisch aus.

## 2. Hilfsprogramme

```bash
for c in curl jq base64; do printf "%s: " $c; command -v $c >/dev/null && echo ok || echo FEHLT; done
```

`curl` und `base64` sind fast überall da. Fehlt `jq`: fragen, ob du es installieren darfst (`brew install jq` auf macOS, `winget install jqlang.jq` auf Windows). Ohne `jq` funktionieren die Befehle in `VoiceOver.md` und `ImageApi.md` nicht.

## 3. Keys

```bash
f=~/.claude/.env; [ -f "$f" ] && echo "env-Datei: vorhanden" || echo "env-Datei: fehlt"
set -a; [ -f "$f" ] && . "$f"; set +a
for k in ELEVENLABS_API_KEY OPENAI_API_KEY GEMINI_API_KEY GOOGLE_API_KEY; do printf "%s: " $k; [ -n "$(printenv $k)" ] && echo gesetzt || echo -; done
```

Gesetzte Keys prüfen (nur HTTP-Status):

```bash
[ -n "$ELEVENLABS_API_KEY" ] && curl -s -o /dev/null -w "elevenlabs %{http_code}\n" https://api.elevenlabs.io/v1/voices -H "xi-api-key: $ELEVENLABS_API_KEY"
[ -n "$OPENAI_API_KEY" ] && curl -s -o /dev/null -w "openai %{http_code}\n" https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"
G=${GEMINI_API_KEY:-$GOOGLE_API_KEY}; [ -n "$G" ] && curl -s -o /dev/null -w "gemini %{http_code}\n" "https://generativelanguage.googleapis.com/v1beta/models?key=$G"
```

Liegen Keys woanders (z. B. `~/.env` oder als Umgebungsvariable aus der Shell), frag den Nutzer, ob der Skill sie von dort lesen soll, und trag den Pfad in `Visuals.md` ein.

## 4. Ergebnis zeigen

| Baustein | Status | Bedeutung |
|---|---|---|
| Diagramme | immer da | SVG direkt in der Seite |
| Ausgabe | Artifact / lokale Datei | … |
| Stimme | ElevenLabs ✓ / OpenAI ✓ / Gemini ✓ / fehlt | ElevenLabs empfohlen; ohne Key Video mit Untertiteln, ohne Stimme |
| Bilder | OpenAI ✓ / Gemini ✓ / fehlt | ohne Key keine Bilder, Diagramme übernehmen |
| Video | immer da | Motion Graphics im Browser, GSAP aus dem CDN |

Bei `401`/`403`: „Der Key für X wird abgelehnt (abgelaufen oder falsch). Willst du einen neuen eintragen?“ Nie still auf etwas Schlechteres ausweichen.
