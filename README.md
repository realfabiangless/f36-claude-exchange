# F36 Claude Exchange

Ein Ort, an dem wir in F36 teilen, was wir mit Claude bauen. Zwei Teile:

| Ordner | Was drin ist |
|---|---|
| [`plugins/`](plugins/) | **Skills-Marketplace.** Jeder Skill ist ein eigenes Plugin. Du installierst nur, was du willst. |
| [`eo-coaching/`](eo-coaching/) | **EO Coaching Wiki.** Wissensbasis zur Vorbereitung von Forum-Coachings (Open Coaching, Deep Dive, Fragenbanken). Einstieg: [`eo-coaching/index.md`](eo-coaching/index.md) |

## Marketplace einbinden

Einmalig in Claude Code:

```
/plugin marketplace add realfabiangless/f36-claude-exchange
```

Danach siehst du unter `/plugin` alle verfügbaren Skills. Installiert wird **nichts automatisch**, jeden Skill wählst du selbst:

```
/plugin install <skill-name>@f36-claude-exchange
```

### Aktuell halten

In `/plugin` → Tab **Marketplaces** → `f36-claude-exchange` → **Update marketplace**. Das holt neue Skills in die Liste und aktualisiert die, die du schon installiert hast. Neue Skills werden dabei **nicht** installiert. Danach `/reload-plugins` oder neue Session starten.

Einzelnen Skill im Terminal aktualisieren:

```
claude plugin update <skill-name>@f36-claude-exchange
```

Wer es automatisch will: in derselben Marketplace-Ansicht Auto-Update einschalten (bei Marketplaces von Dritten standardmäßig aus). Auch Auto-Update aktualisiert nur installierte Skills und installiert nie neue.

## Verfügbare Skills

| Skill | Was er tut |
|---|---|
| `skill-einreichen` | Verpackt einen deiner Skills als Plugin für diesen Exchange und bereitet den Pull Request vor. |
| `explanation-builder` | Baut dir per Interview deinen eigenen Explanation-Skill: Themen aus deinem Alltag als Seite mit Diagrammen, Bildern und Erklärvideo mit Sprecherstimme (ElevenLabs empfohlen, sonst OpenAI oder Gemini). |

## Einen Skill teilen

Siehe [CONTRIBUTING.md](CONTRIBUTING.md). Am einfachsten: `skill-einreichen` installieren und Claude sagen „Ich will meinen Skill X in den F36 Exchange einreichen“.

## Wichtig

Dieses Repo ist **öffentlich**. Keine API-Keys, keine Kundendaten, keine internen Firmenzahlen und nichts, was Forum-Vertraulichkeit berührt.
