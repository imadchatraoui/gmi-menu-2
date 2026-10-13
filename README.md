# GMI Torino · Il gusto di stare insieme

Nuovo sito del menu GMI Torino, con grafica crema e bordeaux, immagini illustrative, filtri dei piatti e dettagli degli ingredienti. Progetto statico in HTML, CSS e JavaScript, senza dipendenze da installare.

## Anteprima e build

Richiede Node.js 20 o superiore.

```sh
npm run dev
npm run build
npm run preview
```

L’anteprima è disponibile su `http://localhost:4173`. Il risultato della build è in `dist/`.

## Aggiornare i contenuti

- `src/data.js`: piatti, ingredienti e informazioni dell’evento. `eventInfo.date` accetta una data ISO, per esempio `2026-11-15T12:30:00+01:00`; `eventInfo.location` accetta un indirizzo o una descrizione del luogo. Lasciando i valori a `null`, il sito mostra «Dettagli in arrivo».
- `index.html`: testi delle sezioni, FAQ e contatti.
- `src/styles.css`: colori, tipografia, layout e adattamento ai dispositivi.
- `public/assets`: logo e immagini.

Le due proposte sono riprese dal vecchio menu e devono essere confermate per il nuovo evento. Non sono stati riutilizzati data, luogo, prezzi o programma del vecchio evento. Le immagini sono illustrative.

Accessibilità: navigazione da tastiera, link per saltare al menu, dialogo nativo con chiusura tramite Escape e ripristino del focus, annunci dei filtri, rispetto delle preferenze di movimento ridotto. Nessun splash screen o canvas WebGL.

## Immagini generate

`public/assets/hero-menu.webp` è stata generata con ImageGen integrato. Prompt: fotografia editoriale realistica di due schiacciate — rucola, datterini e crema di funghi; melanzane grigliate, datterini e ricotta vegana — su lino crema e carta forno, telo bordeaux, luce calda naturale, senza testi, loghi, mani, carne o alcol.

Gli asset del marchio GMI e le illustrazioni del menu provengono dal progetto precedente.

`public/assets/contadina-v2.webp` è una revisione ImageGen dell’illustrazione precedente. Prompt di modifica: rimuovere scritta, freccia, ingrediente separato e strato di bresaola vegana, conservando stile pixel art, rucola, pomodorini, crema di funghi, pane e tutte le altre scritte. L’originale è conservato in `contadina.webp`.
