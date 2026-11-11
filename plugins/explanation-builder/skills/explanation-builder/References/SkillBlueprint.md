# Vorlage für die erzeugte SKILL.md

Ersetze jedes `{{…}}` mit Antworten aus dem Interview. Die `description` steht als YAML-Block (`>-`), damit Anführungszeichen und Doppelpunkte aus den Antworten die Datei nicht kaputt machen; jede Zeile darunter mit zwei Leerzeichen einrücken. Streiche Zeilen, die für diesen Nutzer nicht gelten. Schreib in der Sprache des Nutzers, kurze Sätze. Alles zwischen den Linien `=====` wird die Datei.

=====
---
name: Explanation
description: >-
  Erklärt {{Name}} ein Thema als Seite mit Diagrammen, {{Bildern, }}und einem Erklärvideo mit Sprecherstimme. Typische Anlässe: {{Anlässe aus A2}}. Beispiele: {{2–3 Themen aus A3}}. USE WHEN /explanation, erklär mir das, mach mir eine Übersicht, visualisiere das, {{eigene Auslöser des Nutzers}}. NOT FOR Texte, die weiter bearbeitet werden sollen, oder reine Tabellen.
---

# Explanation

Der Leser ist {{Leser aus B1}}. Die Seite muss funktionieren, ohne dass er den Chat gelesen hat. Ziel: in zwei Minuten verstehen, worum es geht. Grafik zuerst, Text erklärt die Grafik.

## Ablauf

1. **Sammeln.** Thema, Ausgangslage, Fakten mit Quelle, offene Punkte. Quellen: {{aus C1, z. B. Chat, Dateien, CRM}}. Fehlende Fakten nachholen statt raten; Unsicheres als unsicher markieren.
2. **Begriffe.** Jeden Fachbegriff, jede Abkürzung, jede Zahl ohne Bezug sammeln und in Alltagssprache erklären (`References/WritingRules.md`).
3. **Visuals planen** (`References/Visuals.md`): mindestens ein Diagramm; Bild nur, wenn ein Konzept ein Bild braucht; Erklärvideo {{Regel aus D3}}.
4. **Video.** Szenen und Sprechertexte schreiben (`References/VideoGuide.md`), Stimme erzeugen (`References/VoiceOver.md`), Video in die Seite bauen (`References/VideoTemplate.html`). Stimme und Bilder im Hintergrund erzeugen, während du die Seite schreibst.
5. **Seite schreiben** auf Basis von `References/PageTemplate.html`.
6. **Ausgeben.** {{Artifact: veröffentlichen mit capabilities {comments: {}}, vo.js und Bilder über files mitschicken | Lokal: nach ~/Explanations/<thema>/ speichern und im Browser öffnen}}.
7. **Rückfragen** {{nur bei Artifact: Kommentare kommen in diese Session zurück; beantworten und Seite anpassen}}.

## Abschnitte der Seite

{{Liste aus E1, in Reihenfolge. „Kurz gesagt“ immer zuerst, mindestens ein Diagramm immer.}}

Abschnitte ohne Inhalt weglassen.

## Visuals

| Was | Wann |
|---|---|
| Diagramm (SVG) | immer, mindestens eins. Bevorzugte Formen: {{aus D1}} |
| Bild ({{Anbieter}}) | {{bei Konzepten, die ein Bild brauchen, 1–3 Stück | nie}} |
| Erklärvideo mit Stimme ({{Anbieter, Stimme}}) | {{Regel aus D3}}, {{Länge}} |

Scheitert Stimme oder Bild: ohne weitermachen und am Ende sagen, was fehlt.

## Regeln

- Sprache: {{Sprache}}, einfache Sätze, keine Floskeln.
- Nie voraussetzen: {{Liste aus B2}}.
- Zahlen immer mit Bezug und Quelle.
- {{Vertraulichkeit je nach B1, z. B. „Keine Kundennamen, wenn die Seite an Kunden geht.“}}
- Keys bleiben in `~/.claude/.env`, nie in Seiten oder Dateien.

## Referenzen

- `References/WritingRules.md` — so wird erklärt
- `References/Visuals.md` — Diagrammformen, Bildstil, Video-Regeln
- `References/VideoGuide.md`, `References/VideoTemplate.html` — Erklärvideo
- `References/VoiceOver.md` — Stimme
- `References/ImageApi.md` — Bilder {{weglassen ohne Bild-API}}
- `References/PageTemplate.html` — Seitengerüst
- `References/Links.md` — URL-Muster {{weglassen ohne Systeme}}
=====
