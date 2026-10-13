import { motion, useReducedMotion } from 'motion/react';

export default function CommunitySection() {
  const reducedMotion = useReducedMotion();
  const entrance = {
    initial: { y: reducedMotion ? 0 : 18 },
    whileInView: { y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section id="insieme" className="together-section" aria-labelledby="together-title">
      <div className="together-inner wrap">
        <motion.div className="community-art reveal" aria-hidden="true" {...entrance}>
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-label label-top">FEDE · CULTURA · COMUNITÀ</div>
          <svg className="table-art" viewBox="0 0 480 380" fill="none">
            <ellipse cx="240" cy="206" rx="164" ry="106" fill="#E9D2A7" />
            <ellipse cx="240" cy="189" rx="164" ry="106" fill="#F8EED7" stroke="#C69660" strokeWidth="2" />
            <ellipse cx="240" cy="189" rx="134" ry="82" stroke="#CEAB77" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="160" cy="164" r="29" stroke="#722F35" strokeWidth="2" />
            <circle cx="160" cy="164" r="21" stroke="#722F35" />
            <circle cx="316" cy="209" r="29" stroke="#722F35" strokeWidth="2" />
            <circle cx="316" cy="209" r="21" stroke="#722F35" />
            <path d="M232 146c-18-22-34-6-24 11l27 28 27-28c10-17-6-33-24-11l-3 4-3-4Z" fill="#722F35" />
            <path d="M124 143v40m-5-40v13q5 8 10 0v-13m215 44v42m-6-42v15q6 7 12 0v-15" stroke="#722F35" strokeWidth="2" strokeLinecap="round" />
            <path d="M183 94c3-16 7-35 22-33 14 2 7 20 2 35m62 199c-5 16-9 33-24 29-14-3-4-21 0-33M76 201c-17-4-34-5-33-20 1-14 22-8 37-5m322 24c17 2 34 6 31 21-2 14-22 5-35 3" fill="#C69660" stroke="#722F35" strokeWidth="2" />
            <path d="M169 71c-9-20-23-37-11-46 12-9 27 14 38 28m81 262c10 20 26 36 13 46-11 9-28-13-40-25M57 154c-20-9-40-7-40-23s25-11 47-8m351 113c21 10 40 8 39 24-1 16-26 10-47 7" fill="#F8EED7" stroke="#722F35" strokeWidth="2" />
            <path d="m355 89 6-12 5 12 13 5-13 5-5 12-6-12-12-5 12-5ZM83 285l6-12 5 12 13 5-13 5-5 12-6-12-12-5 12-5Z" fill="#C69660" />
          </svg>
          <div className="art-label label-bottom">C’È SEMPRE POSTO PER UNA STORIA IN PIÙ.</div>
        </motion.div>
        <motion.div className="together-copy reveal" {...entrance}>
          <p className="eyebrow">02 — IL SENSO DI INCONTRARSI</p>
          <h2 id="together-title">Più di un menu.<br /><em>Un momento nostro.</em></h2>
          <p>Siamo la sezione torinese dei Giovani Musulmani d’Italia. Generazioni, culture e percorsi diversi, uniti dalla fede e dal desiderio di costruire comunità.</p>
          <p>Crediamo negli incontri che diventano dialogo e nelle esperienze che ci fanno crescere insieme. Anche attorno a una tavola.</p>
          <a className="text-link" href="https://gmitalia.org/" target="_blank" rel="noopener noreferrer">
            Conosci GMI <span aria-hidden="true">↗</span>
            <span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
