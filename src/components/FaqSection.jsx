import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const questions = [
  {
    question: 'Come posso conoscere gli ingredienti?',
    answer: <p>Apri «Ingredienti e dettagli» nella scheda di ciascun piatto. Per allergie o intolleranze, contatta gli organizzatori: l’elenco sul sito non sostituisce le informazioni complete su allergeni e preparazione.</p>,
  },
  {
    question: 'Ci sono alternative per esigenze alimentari?',
    answer: <p>Nel menu precedente era disponibile, su richiesta e con posti limitati, un’alternativa senza lattosio con mozzarella a caglio microbico. Le opzioni per il nuovo evento sono da confermare: scrivici prima di partecipare.</p>,
  },
  {
    question: 'Il menu è incluso nella partecipazione?',
    answer: <p>Per il nuovo evento, quota di partecipazione e modalità del pranzo saranno comunicate insieme ai dettagli dell’incontro.</p>,
  },
  {
    question: 'Come contatto GMI Torino?',
    answer: <p>Scrivici a <a href="mailto:gmitorino@gmail.com">gmitorino@gmail.com</a> oppure visita il profilo Instagram <a href="https://instagram.com/gmi.torino" target="_blank" rel="noopener noreferrer">@gmi.torino<span className="sr-only"> (nuova scheda)</span></a>.</p>,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="domande" className="faq-section wrap" aria-labelledby="faq-title">
      <div className="faq-heading reveal">
        <p className="eyebrow">03 — QUALCHE RISPOSTA</p>
        <h2 id="faq-title">Buono a <em>sapersi.</em></h2>
        <p>Per scegliere con tranquillità.</p>
      </div>
      <div className="faq-list reveal">
        {questions.map(({ question, answer }, index) => {
          const open = openIndex === index;
          const buttonId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;

          return (
            <div className={`faq-item${open ? ' is-open' : ''}`} key={question}>
              <h3>
                <button
                  className="faq-question"
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {question}
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  >+</motion.span>
                </button>
              </h3>
              <div id={answerId} role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open}>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="faq-answer"
                      key={answerId}
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-answer-inner">{answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
