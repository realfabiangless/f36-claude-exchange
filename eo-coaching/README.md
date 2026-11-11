# EO Coaching Wiki

Ein LLM-Wiki: eine Wissensbasis, die Claude aufbaut und pflegt — und die du liest. Zweck: Coachings im EO-Forum vorbereiten, egal ob du coachst oder selbst gecoacht wirst. Thema rein → gute Fragen, passende Struktur, worauf achten.

## Wie es funktioniert

Drei Ebenen:

- **`raw/`** — deine Quellen, von Claude nie verändert. Text liegt direkt hier — Clips, eingefügte Artikel, eigene Notizen — damit die ganze Ebene durchsuchbar bleibt. Alles, was kein Text ist (PDFs, Folien, Bilder, Audio), liegt in **`raw/assets/`**, mit einer kurzen Herkunftsnotiz in `raw/`. Neue Quellen kommen in `raw/inbox/`.
- **`wiki/`** — Claudes Seiten: Quellen-Zusammenfassungen, Formate und Methoden (`concepts/`), Coaching-Themen mit Fragenbank (`themes/`), Organisationen und Autoren (`entities/`), abgelegte Antworten (`notes/`). Alles verlinkt, alles bis `raw/` zurückverfolgbar.
- **`_meta/schema.md`** — die Regeln, denen Claude folgt. Diskutier mit ihnen; sie sollen sich weiterentwickeln.

Zwei Eingänge: **[[index]]** (alles, katalogisiert) und **[[overview]]** (was wir bisher wissen).

**Vertraulichkeit:** Session-Notizen und Transkripte kommen nur anonymisiert ins Wiki — keine Namen oder erkennbaren Details anderer Forum-Mitglieder.

## Der Ablauf

| Du sagst | Was passiert |
|---|---|
| „Nimm diesen Artikel auf“ — oder schick einfach einen Link (mit den Projekt-Anweisungen) | wird erfasst, eine Quellenseite geschrieben und jede betroffene Seite im Wiki aktualisiert, in einem Durchgang |
| „Heb das für später auf“ | wird bereinigt und in `raw/inbox/` abgelegt — wartet auf Verarbeitung |
| „Verarbeite, was wartet“ | alles in `raw/inbox/` wird eingearbeitet |
| „Thema: Nachfolge — welche Fragen, worauf achten?“ | Antwort aus den Wiki-Seiten, mit Belegen — gute Antworten werden zurück abgelegt |
| „Mach mir ein Handout zu X“ | die Antwort wird erst als Notiz abgelegt, dann das Dokument daraus in `outputs/` |
| „Lint das Wiki“ | Widersprüche, veraltete Aussagen, verwaiste Seiten und Lücken werden gefunden — und nach deiner Freigabe behoben |
| „Bring das Wiki auf Stand“ — oder der geplante Lauf | alles Wartende wird eingearbeitet, das Wiki geprüft, und du bekommst eine Zusammenfassung der Änderungen |
| „Importier diesen Ordner“ | Claude sagt, wie groß er ist und was ausgelassen würde, kopiert ihn mit Herkunftsnachweis und arbeitet den gewählten Teil zuerst ein |
| „Was ergibt das alles zusammen?“ | Verbindungen, die deine Seiten schon nahelegen, werden vorgeschlagen — du entscheidest |
| „Geh den Dream-Report durch“ — nach einem geplanten Dream-Lauf | die wartenden Vorschläge, einer nach dem anderen; nur was du annimmst, wird abgelegt |
| „Wie mache ich …?“ | Antwort aus dem Plugin selbst; im Wiki ändert sich nichts |
| Ein Link, während der Ordner nicht erreichbar ist (Rechner zu) | landet im Backlog des Projekts und wird erfasst, sobald der Ordner wieder erreichbar ist |

## Immer nur ein Schreiber

`_meta/wiki-lock.md` zeigt, ob Claude gerade ins Wiki schreibt — was es tut, mit einer Zeile pro Schritt — oder ob es frei ist. Zwei Sessions schreiben nie gleichzeitig: die zweite wartet, und eine abgestürzte Session wird nach wenigen Minuten abgelöst. Das gilt auf einem Rechner; ein Sync-Dienst zwischen Geräten ist langsamer als die Sperre, also lass ein Gerät die Schreib-Routinen machen.

## Jeder Editor geht

Obsidian macht es angenehm, aber nichts hängt davon ab: Es sind Ordner mit Markdown. Um einem `[[Link]]` in einem anderen Editor zu folgen, such die Datei mit diesem Namen — jeder Name ist eindeutig. Organisier innerhalb von `wiki/` um, wie du willst — Claude folgt deinen Ordnern. Wenn du selbst verlinkst, schreib `[[name]]`, keinen Pfad.

## Wer macht was

Du kuratierst Quellen, stellst die Fragen und entscheidest, was zählt. Claude fasst zusammen, verlinkt, legt ab und führt Buch — die Arbeit, an der Wikis normalerweise sterben.

## Gestartet

2026-11-03
