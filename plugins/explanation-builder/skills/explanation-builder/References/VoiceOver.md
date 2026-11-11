# Sprecherstimme

Jede Szene des Erklärvideos hat einen Sprechertext (`data-caption`). Daraus wird pro Szene eine MP3-Datei. Alle Dateien werden in eine kleine Datei `vo.js` gepackt, die neben der Seite liegt. Das Video misst die Länge der Clips selbst und richtet die Szenen danach aus. Du musst keine Dauer berechnen.

**Empfehlung: ElevenLabs.** Klingt am natürlichsten, viele deutsche Stimmen. Alternativen: OpenAI oder Gemini, beide klingen ebenfalls gut. Ohne einen dieser Keys gibt es kein Voice-over; das Video läuft dann mit Untertiteln. Keine Systemstimme verwenden, sie klingt zu schlecht.

## Key einrichten

Alle Keys liegen in `~/.claude/.env`, eine Zeile pro Key:

```
ELEVENLABS_API_KEY=...
OPENAI_API_KEY=...
GEMINI_API_KEY=...
```

Datei anlegen, falls sie fehlt, und nur für den Nutzer lesbar machen:

```bash
touch ~/.claude/.env && chmod 600 ~/.claude/.env && open -t ~/.claude/.env
```

(Windows/Linux: Datei im Editor öffnen statt `open -t`.) Der Nutzer fügt den Key selbst ein. Du liest ihn nie aus und gibst ihn nie aus.

Wo es den Key gibt:
- **ElevenLabs:** elevenlabs.io → Profil → API Keys. Kostenloser Plan reicht zum Testen; für regelmäßige Videos lohnt der Starter-Plan.
- **OpenAI:** platform.openai.com → API keys. Abrechnung nach Verbrauch, ein 30-Sekunden-Video kostet unter 1 Cent.
- **Gemini:** aistudio.google.com → Get API key. Mit Google-Konto, kostenloses Kontingent.

Key prüfen (zeigt nur den HTTP-Status, nie den Key):

```bash
set -a; . ~/.claude/.env; set +a
curl -s -o /dev/null -w "elevenlabs %{http_code}\n" https://api.elevenlabs.io/v1/voices -H "xi-api-key: $ELEVENLABS_API_KEY"
curl -s -o /dev/null -w "openai %{http_code}\n" https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"
curl -s -o /dev/null -w "gemini %{http_code}\n" "https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY:-$GOOGLE_API_KEY}"
```

`200` = gültig. `401`/`403` = ungültig oder abgelaufen: dem Nutzer sagen, welcher Key, und um einen neuen bitten.

## Clips erzeugen

Arbeitsordner pro Erklärung, z. B. `~/Explanations/<thema>/`. Clips heißen `vo/s01.mp3`, `vo/s02.mp3` … in Szenen-Reihenfolge. Sprechertext = `data-caption` der Szene, wörtlich.

### ElevenLabs (empfohlen)

Stimme wählen (deutsche Stimmen im Konto auflisten):

```bash
curl -s https://api.elevenlabs.io/v1/voices -H "xi-api-key: $ELEVENLABS_API_KEY" | jq -r '.voices[] | select((.labels.language // "") | test("de|german";"i")) | [.voice_id, .name] | @tsv'
```

Clip erzeugen (für jede Szene `N` und ihren Text):

```bash
jq -n --arg t "TEXT DER SZENE" '{text:$t, model_id:"eleven_multilingual_v2", voice_settings:{stability:0.5, similarity_boost:0.75}}' \
 | curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID?output_format=mp3_44100_64" \
   -H "xi-api-key: $ELEVENLABS_API_KEY" -H "content-type: application/json" -d @- -o vo/sNN.mp3
```

### OpenAI

Stimmen: `alloy`, `nova`, `onyx`, `shimmer`, `ash`, `coral`. Ton per `instructions` steuern.

```bash
jq -n --arg t "TEXT DER SZENE" '{model:"gpt-4o-mini-tts", voice:"nova", input:$t, instructions:"Ruhig und klar, wie eine gute Erklärerin. Deutsch.", response_format:"mp3"}' \
 | curl -s https://api.openai.com/v1/audio/speech -H "Authorization: Bearer $OPENAI_API_KEY" -H "content-type: application/json" -d @- -o vo/sNN.mp3
```

### Gemini

Der Key heißt `GEMINI_API_KEY` (manche haben ihn als `GOOGLE_API_KEY`; der Befehl nimmt beide). Stimmen: `Kore`, `Puck`, `Charon`, `Aoede`. Aktuelles TTS-Modell nachsehen:

```bash
G=${GEMINI_API_KEY:-$GOOGLE_API_KEY}; curl -s "https://generativelanguage.googleapis.com/v1beta/models?key=$G&pageSize=200" | jq -r '.models[].name' | grep -i tts
```

Clip erzeugen (Modellname aus der Liste, ohne `models/`):

```bash
G=${GEMINI_API_KEY:-$GOOGLE_API_KEY}
jq -n --arg t "Sprich ruhig und klar: TEXT DER SZENE" '{contents:[{parts:[{text:$t}]}], generationConfig:{responseModalities:["AUDIO"], speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:"Kore"}}}}}' \
 | curl -s "https://generativelanguage.googleapis.com/v1beta/models/MODELL:generateContent?key=$G" -H "content-type: application/json" -d @- > vo/sNN.json
jq -r '.candidates[0].content.parts[0].inlineData.mimeType' vo/sNN.json
jq -r '.candidates[0].content.parts[0].inlineData.data' vo/sNN.json | base64 -d > vo/sNN.wav && rm vo/sNN.json
```

Ist der ausgegebene Typ `audio/wav`, bist du fertig. Ist es rohes PCM (`audio/L16` oder `audio/pcm`), die Datei in `vo/sNN.pcm` umbenennen und so in WAV verpacken (44-Byte-Header, 24 kHz, 16 bit, mono):

```bash
f=vo/sNN.pcm; n=$(wc -c < "$f" | tr -d ' ')
le32() { printf "\\x$(printf %02x $(($1&255)))\\x$(printf %02x $((($1>>8)&255)))\\x$(printf %02x $((($1>>16)&255)))\\x$(printf %02x $((($1>>24)&255)))"; }
{ printf 'RIFF'; le32 $((n+36)); printf 'WAVEfmt '; le32 16; printf '\x01\x00\x01\x00'; le32 24000; le32 48000; printf '\x02\x00\x10\x00data'; le32 $n; cat "$f"; } > vo/sNN.wav && rm "$f"
```

## vo.js bauen

Packt alle Clips in eine Datei, die das Video lädt:

```bash
{ printf 'window.VO=['; sep=''; for f in $(ls vo | grep -E '^s[0-9]+\.(mp3|wav)$' | sort); do f="vo/$f"; case "$f" in *.wav) m=audio/wav;; *) m=audio/mpeg;; esac; printf '%s"data:%s;base64,' "$sep" "$m"; base64 < "$f" | tr -d '\n'; printf '"'; sep=','; done; printf '];\n'; } > vo.js
```

Alle Clips einer Erklärung kommen vom selben Anbieter, also entweder nur `.mp3` oder nur `.wav`. Sonst stimmt die Reihenfolge nicht.

`vo.js` liegt neben der HTML-Seite. Beim Veröffentlichen als Artifact wird sie über `files` mitgeschickt (`{"vo.js": "<pfad>/vo.js"}`). Als lokale Datei reicht es, dass sie im selben Ordner liegt.

## Regeln

- Anzahl Clips = Anzahl Szenen. Fehlt ein Clip, läuft die Szene ohne Stimme mit ihrer Mindestlänge.
- Sprechertext kurz halten: 1–2 Sätze pro Szene, 8–12 Sekunden höchstens.
- Zahlen und Abkürzungen so schreiben, wie sie gesprochen werden („zwei Tage“, „K-P-I“), in der Untertitel-Variante darf es kürzer sein; dann `data-caption` für die Untertitel und den gesprochenen Text getrennt halten.
- Schlägt ein Aufruf fehl (leere oder sehr kleine Datei): Status zeigen, nicht stillschweigend ohne Stimme weitermachen.
