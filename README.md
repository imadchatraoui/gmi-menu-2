# GMI Torino · Il gusto di stare insieme

Nuovo sito del menu GMI Torino, con grafica crema e bordeaux, immagini illustrative, filtri dei piatti e dettagli degli ingredienti. Applicazione React/Vite con componenti React Bits adattati al marchio GMI e animazioni Motion.

## Anteprima e build

Richiede Node.js 22.12 o superiore.

```sh
npm install
npm run dev
npm run build
npm run preview
```

L’anteprima è disponibile su `http://localhost:4173`. Il risultato della build è in `dist/`.

## Aggiornare i contenuti

- `src/data.js`: piatti, ingredienti e informazioni dell’evento. `eventInfo.date` accetta una data ISO, per esempio `2026-11-15T12:30:00+01:00`; `eventInfo.location` accetta un indirizzo o una descrizione del luogo. Lasciando i valori a `null`, il sito mostra «Dettagli in arrivo».
- `src/App.jsx`: sezioni del sito, navigazione, filtri, dialogo ingredienti e contatti.
- `src/components/CommunitySection.jsx` e `FaqSection.jsx`: presentazione GMI e FAQ.
- `src/components/react-bits`: componenti importati dalle fonti ufficiali e adattati.
- `src/styles.css`: colori, tipografia, layout e adattamento ai dispositivi.
- `src/react-enhancements.css`: integrazione dei componenti React Bits e animazioni.
- `public/assets`: logo e immagini.

Le due proposte sono riprese dal vecchio menu e devono essere confermate per il nuovo evento. Non sono stati riutilizzati data, luogo, prezzi o programma del vecchio evento. Le immagini sono illustrative.

Accessibilità: navigazione da tastiera, link per saltare al menu, dialogo nativo con chiusura tramite Escape e ripristino del focus, annunci dei filtri, rispetto delle preferenze di movimento ridotto. Nessun splash screen o canvas WebGL.

## Componenti online

Fonti ufficiali [React Bits](https://reactbits.dev/) e [Motion](https://motion.dev/docs/react): BlurText per l’ingresso del titolo, TiltedCard per la fotografia, Magnet per i pulsanti e SpotlightCard per le schede del menu. Filtri e FAQ usano animazioni React Motion. Gli effetti al puntatore sono disabilitati sui dispositivi touch e con movimento ridotto. I sorgenti sono inclusi nel progetto, quindi non dipendono da un CDN a runtime.

Attribuzione, licenza MIT + Commons Clause e modifiche sono documentate in `THIRD_PARTY_NOTICES.md`.

## Immagini generate

`public/assets/hero-menu.webp` è stata generata con ImageGen integrato. Prompt: fotografia editoriale realistica di due schiacciate — rucola, datterini e crema di funghi; melanzane grigliate, datterini e ricotta vegana — su lino crema e carta forno, telo bordeaux, luce calda naturale, senza testi, loghi, mani, carne o alcol.

Gli asset del marchio GMI e le illustrazioni del menu provengono dal progetto precedente.

`public/assets/contadina-v2.webp` è una revisione ImageGen dell’illustrazione precedente. Prompt di modifica: rimuovere scritta, freccia, ingrediente separato e strato di bresaola vegana, conservando stile pixel art, rucola, pomodorini, crema di funghi, pane e tutte le altre scritte. L’originale è conservato in `contadina.webp`.
