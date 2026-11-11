# Interview

Eine Frage nach der anderen. Biete Optionen an, der Nutzer kann immer frei antworten. Wenn eine Antwort eine spätere Frage schon beantwortet, überspring sie. Ziel: in 5–10 Minuten genug wissen, um den Skill zu schreiben.

## Block A: Arbeit

**A1. Was ist deine Rolle, und welche Themen landen bei dir?**
Optionen: Geschäftsführung / Strategie · Vertrieb · Marketing · Finanzen · Personal · Operations / Prozesse · Technik / Produkt
→ bestimmt die Beispiele in `WritingRules.md` und die Diagramm-Vorschläge.

**A2. Wofür brauchst du Erklärungen am häufigsten?** (mehrere möglich)
Optionen: Entscheidung vorbereiten · Meeting vorbereiten · Team etwas erklären · Kunden/Partnern etwas erklären · ein neues Thema selbst verstehen · Dokument, Call oder Zahlen auswerten
→ bestimmt die Pflichtabschnitte (siehe Tabelle unten) und die `description` des Skills.

**A3. Nenn zwei, drei konkrete Themen, die du zuletzt erklärt bekommen wolltest oder erklären musstest.**
→ Daraus werden die Beispiele im Skill und das Testthema in Phase 5.

## Block B: Leser

**B1. Wer liest die Seiten?**
Optionen: nur ich · mein Team · Kunden/Partner · Investoren/Beirat
→ Tonfall, Vertraulichkeit, ob Entscheidungskarten und Rückkanal sinnvoll sind.

**B2. Was darf nie vorausgesetzt werden?**
Beispiele vorschlagen, passend zu A1: Fachbegriffe, Abkürzungen, interne Systemnamen, Zahlen ohne Bezug.
→ Liste in `WritingRules.md`.

## Block C: Quellen und Links

**C1. Woher kommen die Infos meistens?**
Optionen: aus dem Chat · Dateien auf dem Rechner · E-Mail · CRM · Notion/Docs · Tabellen
→ Abschnitt „Sammeln“ im Skill; welche Konnektoren er nutzen soll.

**C2. Gibt es Systeme, auf die die Seite verlinken soll?** (CRM-Datensätze, Projekt-Tool, Wiki)
Wenn ja: je ein Beispiel-Link geben lassen und daraus das URL-Muster ableiten → `Links.md`. Keine Muster raten.

## Block D: Visuals

**D1. Welche Diagrammformen passen zu deinen Themen?** (mehrere möglich)
Optionen: Ablauf/Prozess · Zeitstrahl · Vorher/Nachher · Vergleich/Matrix · Organigramm/Beteiligte · Zahlen als Chart · Mindmap
→ `Visuals.md`, Reihenfolge = Priorität.

**D2. Bilder: welcher Stil?** (nur wenn Bild-API vorhanden oder gewünscht)
Optionen: sachlich-flach (Icons, Flächen) · illustriert · fotorealistisch · keine Bilder
→ Stil-Prompt in `Visuals.md`.

**D3. Erklärvideo: wann?**
Optionen: bei jedem Thema (empfohlen) · nur bei Abläufen und Prozessen · nur auf Nachfrage
Länge: 20–40 s (empfohlen) · bis 60 s
→ Regel in `SKILL.md`.

**D4. Stimme**
Zeig, welcher Anbieter verfügbar ist. Mit ElevenLabs: 3 passende Stimmen aus dem Konto vorschlagen (Sprache des Nutzers, Kategorie egal) und je einen Probesatz erzeugen, damit er hört und wählt. Mit OpenAI: Stimmen `alloy`, `nova`, `onyx` anbieten. Mit Gemini: `Kore`, `Puck`, `Charon` anbieten.
→ Stimme und Anbieter in `VoiceOver.md`.

## Block E: Form

**E1. Welche Abschnitte soll eine Seite haben?** Schlage aus A2 vor und lass streichen/ergänzen:

| Anlass (A2) | Vorgeschlagene Abschnitte |
|---|---|
| Entscheidung vorbereiten | Kurz gesagt · Worum geht's · Wie es funktioniert · Optionen mit Empfehlung · Risiken · Begriffe |
| Meeting vorbereiten | Kurz gesagt · Hintergrund · Beteiligte · Offene Punkte · Fragen fürs Meeting |
| Team/Kunden erklären | Kurz gesagt · Das Bild im Kopf · Schritt für Schritt · Häufige Missverständnisse · Begriffe |
| Selbst verstehen | Kurz gesagt · Das Grundprinzip · Wie es zusammenhängt · Beispiel · Weiterlesen |
| Auswerten | Kurz gesagt · Die wichtigsten Zahlen · Was auffällt · Was daraus folgt |

„Kurz gesagt“ (3 Sätze) und mindestens ein Diagramm sind immer dabei.

**E2. Farben und Schrift?**
Optionen: neutral (Vorlage) · meine Firmenfarben (Hex-Werte oder Website nennen lassen) · überrasch mich
→ Tokens in `PageTemplate.html` und `VideoTemplate.html`.

**E3. Sprache und Länge?** Deutsch/Englisch; kurz (eine Bildschirmseite plus Video) oder ausführlich.

## Nach dem Interview

Fasse in höchstens 8 Zeilen zusammen: Rolle, Anlässe, Leser, Abschnitte, Diagramme, Bildstil, Video-Regel, Stimme. Frag „Passt das so?“, bevor du schreibst.
