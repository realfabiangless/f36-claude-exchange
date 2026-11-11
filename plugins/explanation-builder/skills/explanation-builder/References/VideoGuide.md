# Erklärvideo bauen

Das Video ist Motion Graphics im Browser: HTML und SVG, bewegt von GSAP (eine Animations-Bibliothek, geladen aus dem CDN). Keine Installation. Basis ist `VideoTemplate.html`; es enthält Motor, Steuerung, Ton und vier Beispielszenen.

## So denkst du ein Video

1. **Eine Kernaussage.** Was soll man nach 30 Sekunden wissen? Ein Satz.
2. **3–6 Szenen.** Typisch: Thema → Wie es funktioniert → Zahl oder Vergleich → Fazit.
3. **Pro Szene ein Sprechertext** (1–2 Sätze) und **ein Bild im Kopf**, das sich bewegt. Die Bewegung zeigt, was der Satz sagt: ein Schritt führt zum nächsten, ein Balken wächst, ein Punkt wandert.
4. **Timing.** Bewegung kommt kurz *bevor* das Wort fällt, nicht danach. Die Szene ist mindestens so lang wie ihr Sprecher-Clip; das rechnet der Motor selbst aus.

## Aufbau einer Szene

Im HTML:

```html
<section class="xv-sc" data-name="Ablauf" data-min="6" data-caption="Sprechertext dieser Szene.">
  … absolut positionierte Elemente auf der 1280×720-Bühne …
</section>
```

Im Script, an derselben Stelle im Array `SCENES`:

```js
{ sfx: [[0.6, "pop"], [2.0, "chime"]],         // Sekunde in der Szene, Effekt
  build: function (tl, T, sc) {                // T = Startzeit der Szene
    tl.from(sc.querySelector(".x"), { y: 40, opacity: 0, duration: 0.7 }, T + 0.2);
  } }
```

`data-caption` ist zugleich Untertitel und der Text, aus dem der Sprecher-Clip entsteht.

## Bewegungs-Bausteine

| Effekt | Code | Wofür |
|---|---|---|
| Buchstaben steigen aus einer Kante | `<div class="xv-mask"><div class="xv-split">…</div></div>` + `tl.from(chars(sc), {yPercent:115, stagger:0.03, ease:"power4.out"}, T)` | Titel, Schlagworte |
| Aufploppen | `tl.from(el, {scale:0.5, opacity:0, ease:"back.out(2.2)"}, T)` | Knoten, Karten, Chips |
| Linie zeichnet sich | `draw(path); tl.to(path, {strokeDashoffset:0, duration:0.6}, T)` | Pfeile, Verbindungen, Unterstreichung |
| Punkt wandert über einen Pfad | Proxy `{p:0}` tweenen, in `binds` mit `getPointAtLength` setzen (siehe Szene „Ablauf“) | Fluss von Geld, Daten, Aufgaben |
| Zahl zählt hoch | Proxy `{n:0}` tweenen, in `binds` Text setzen (siehe Szene „Zahlen“) | Kennzahlen |
| Balken wächst | `tl.from(bar, {scaleY:0, ease:"expo.out"}, T)` mit `transform-origin: bottom` | Vergleiche |
| Aufdecken | `tl.from(el, {clipPath:"inset(0% 100% 0% 0%)"}, T)` | Bilder, Bereiche |
| Kippen in den Raum | `tl.from(el, {rotationX:16, y:90, transformPerspective:1400, opacity:0, ease:"expo.out"}, T)` | Fenster, Dokumente |

Effekte (`sfx`): `pop` (optional Tonhöhe als dritter Wert), `tick`, `thump`, `chime`, `whoosh`. Szenenwechsel bekommen automatisch ein `whoosh`. Sparsam einsetzen: ein Ton pro sichtbarem Ereignis.

## Bilder im Video

Ein erzeugtes Bild kann eine Szene tragen: `<img src="img/NAME.png" class="xv-abs" style="left:…;top:…;width:…">` und mit Aufdecken oder langsamem Zoom (`tl.to(img, {scale:1.08, duration:Szenenlänge, ease:"none"}, T)`) bewegen.

## Regeln

- Bühne ist immer 1280×720. Schrift mindestens 20 px, Überschriften 48–100 px.
- Nichts Wichtiges nur im Video: Die Untertitel stehen unter dem Bild, und die Seite erklärt alles auch ohne Video.
- Gleiche Farben wie die Seite, wenn der Nutzer keine eigenen will (Tokens `--xv-…` oben im Template).
- Element wird mehrfach animiert? Erst `from`, dann später `to`. Nie zwei Tweens gleichzeitig auf dieselbe Eigenschaft.
- Prüfen vor dem Veröffentlichen: einmal an 3–4 Stellen spulen (Regler) und schauen, ob jede Szene vollständig aussieht.

## Mehrere Videos auf einer Seite

Jeder Baustein findet sein eigenes `.xv`-Element (das direkt vor seinen Script-Tags). Für ein zweites Video: Block erneut einfügen, am `.xv`-Element `data-vo="VO2"` setzen und `vo.js` im Script-Tag durch `vo2.js` ersetzen (gebaut mit `window.VO2=[…]`). Keine `id`-Attribute in Szenen verwenden; Elemente mit `data-k="name"` markieren und mit `sc.querySelector("[data-k=name]")` holen.
