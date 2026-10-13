import { forwardRef, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react';
import { menuItems, eventInfo, contacts } from './data.js';
import BlurText from './components/react-bits/BlurText.jsx';
import Magnet from './components/react-bits/Magnet.jsx';
import SpotlightCard from './components/react-bits/SpotlightCard.jsx';
import TiltedCard from './components/react-bits/TiltedCard.jsx';
import CommunitySection from './components/CommunitySection.jsx';
import FaqSection from './components/FaqSection.jsx';

const email = contacts.find((contact) => contact.id === 'email');
const instagram = contacts.find((contact) => contact.id === 'instagram');
const navItems = [
  { id: 'menu', label: 'Il menu' },
  { id: 'insieme', label: 'Chi siamo' },
  { id: 'domande', label: 'Da sapere' },
];

const PresenceElement = forwardRef(function PresenceElement({ as = 'article', ...props }, ref) {
  const present = useIsPresent();
  const Element = as === 'nav' ? motion.nav : motion.article;
  return <Element ref={ref} {...props} inert={!present} aria-hidden={present ? undefined : true} />;
});

function Brand({ footer = false, onClick }) {
  return <a href="#inizio" onClick={onClick} className={`brand ${footer ? 'footer-brand' : ''}`} aria-label="GMI Torino, torna all'inizio">
    <img src="/assets/logo-gmi.png" alt="" width="42" height="48" />
    <span>GMI <small>TORINO</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); }
    };
    const handleOutside = (event) => { if (!headerRef.current?.contains(event.target)) setOpen(false); };
    const desktop = window.matchMedia('(min-width: 601px)');
    const handleResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', handleOutside);
    desktop.addEventListener('change', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleOutside);
      desktop.removeEventListener('change', handleResize);
    };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px' });
    navItems.forEach(({ id }) => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);

  return <header className="site-header" ref={headerRef}>
    <div className="header-inner wrap">
      <Brand onClick={() => setOpen(false)} />
      <nav className="desktop-nav" aria-label="Navigazione principale">
        {navItems.map(({ id, label }) => <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
      <Magnet padding={18} maxOffset={5} wrapperClassName="header-magnet"><a className="header-contact" href={email.href}>Parliamone <span aria-hidden="true">↗</span></a></Magnet>
      <button ref={toggleRef} className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? 'Chiudi la navigazione' : 'Apri la navigazione'}><span /><span /></button>
    </div>
    <AnimatePresence>
      {open && <PresenceElement as="nav" id="mobile-navigation" className="mobile-nav" aria-label="Navigazione su telefono" initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .18 }}>
        {navItems.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}
        <a href={email.href} onClick={() => setOpen(false)}>Contattaci <span aria-hidden="true">↗</span></a>
      </PresenceElement>}
    </AnimatePresence>
  </header>;
}

function Hero() {
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="tiny-star" aria-hidden="true">✳</span> GIOVANI MUSULMANI D’ITALIA · TORINO</p>
      <h1 id="hero-title"><BlurText tag="span" text="Il gusto di" className="hero-title-line" delay={75} animateBy="words" direction="bottom" /><span className="hero-title-line">stare <em><BlurText tag="span" text="insieme." className="hero-title-word" delay={110} direction="bottom" /></em></span></h1>
      <p className="hero-description">Una tavola, tante storie.<br />Il nostro modo di condividere sapori,<br className="desktop-break" /> incontri e un po’ di noi.</p>
      <Magnet padding={24} maxOffset={7} wrapperClassName="button-magnet"><a className="button button-dark" href="#menu">Scopri il menu <span aria-hidden="true">↓</span></a></Magnet>
      <div className="hero-footnote"><span className="line-mark" aria-hidden="true" />Fatto per condividere. Pensato per te.</div>
    </div>
    <div className="hero-visual">
      <div className="hero-photo"><TiltedCard className="hero-tilted-card" imageSrc="/assets/hero-menu.webp" altText="Illustrazione fotografica di schiacciate con verdure su una tavola apparecchiata" containerHeight="100%" containerWidth="100%" imageHeight="100%" imageWidth="100%" rotateAmplitude={7} scaleOnHover={1.025} showTooltip={false} showMobileWarning={false} fetchPriority="high" /></div>
      <div className="hero-stamp" aria-label="Sapori che ci uniscono"><span>SAPORI CHE</span><span className="stamp-star" aria-hidden="true">✳</span><span>CI UNISCONO</span></div>
      <div className="photo-caption"><span>LA CONVIVIALITÀ È IL NOSTRO INGREDIENTE PREFERITO.</span><span aria-hidden="true">01 / GMI</span></div>
    </div>
  </section>;
}

function TasteStrip() {
  const [paused, setPaused] = useState(false);
  return <div className={`taste-strip ${paused ? 'is-paused' : ''}`}><div className="taste-track" aria-hidden="true">{[0, 1].map((copy) => <div className="taste-copy" key={copy}>SAPORI AUTENTICI <span>✳</span> STORIE CONDIVISE <span>✳</span> UNA TAVOLA PER INCONTRARSI <span>✳</span> GMI TORINO <span>✳</span></div>)}</div><button className="marquee-pause" aria-label="Pausa del testo scorrevole" aria-pressed={paused} onClick={() => setPaused((value) => !value)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button></div>;
}

function MenuSection({ onOpenDish }) {
  const [filter, setFilter] = useState('all');
  const reduced = useReducedMotion();
  const shown = menuItems.filter((item) => filter === 'all' || filter === item.id);
  const filters = [{ id: 'all', label: 'Tutto il menu' }, { id: 'mediterranea', label: 'Mediterranea' }, { id: 'contadina', label: 'Contadina' }];
  return <section id="menu" className="menu-section wrap" aria-labelledby="menu-title">
    <div className="section-heading"><div><p className="eyebrow">01 — A TAVOLA</p><h2 id="menu-title">Due sapori.<br /><em>Una bella scelta.</em></h2></div><p>Ingredienti semplici, abbinamenti pieni di carattere.<br />Scopri cosa rende speciale ogni schiacciata.</p></div>
    <div className="menu-toolbar" aria-label="Visualizzazione del menu"><div className="segmented-control" role="group" aria-label="Scegli cosa vedere">
      {filters.map(({ id, label }) => <button className={`filter-button ${id === filter ? 'is-selected' : ''}`} key={id} data-filter={id} aria-label={id === 'all' ? 'Tutto il menu, 2 piatti' : label} aria-pressed={id === filter} onClick={() => setFilter(id)}>
        {id === filter && <motion.span className="filter-highlight" layoutId="menu-filter" transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 32 }} />}
        <span className="filter-label">{label}{id === 'all' && <span className="filter-count">02</span>}</span>
      </button>)}
    </div><span className="toolbar-note"><span aria-hidden="true">✳</span> Il piacere delle cose buone</span></div>
    <motion.div layout={!reduced} id="dish-list" className="dish-grid">
      <AnimatePresence mode="popLayout" initial={false}>
        {shown.map((item) => <PresenceElement layout={!reduced} key={item.id} className="dish-motion" id={`piatto-${item.id}`} initial={reduced ? false : { opacity: .4, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: reduced ? 0 : .25 }}>
          <SpotlightCard className="dish-card" spotlightColor="rgba(181, 139, 80, 0.18)">
            <div className="dish-image-wrap"><img className="dish-image" src={item.image} alt={`Ingredienti della schiacciata ${item.name} illustrati in pixel art`} width="2400" height="1792" loading="lazy" decoding="async" /><span className="dish-image-label">LA SCHIACCIATA · {String(menuItems.indexOf(item) + 1).padStart(2, '0')}</span></div>
            <div className="dish-body"><div className="dish-title-row"><h3 className="dish-title">{item.name}</h3><span className="dish-number">/ {String(menuItems.indexOf(item) + 1).padStart(2, '0')}</span></div><p className="dish-description">{item.description}</p><div className="dish-bottom"><span className="dish-tag">{item.tags[0]}</span><button className="dish-detail-button" data-dish={item.id} aria-haspopup="dialog" aria-label={`Ingredienti e dettagli di ${item.name}`} onClick={(event) => onOpenDish(item, event.currentTarget)}>Ingredienti e dettagli <span aria-hidden="true">↗</span></button></div></div>
          </SpotlightCard>
        </PresenceElement>)}
      </AnimatePresence>
    </motion.div>
    <p id="menu-announcement" className="sr-only" aria-live="polite">{filter === 'all' ? `Tutto il menu: ${shown.length} piatti.` : `Visualizzata ${shown[0].name}.`}</p>
    <p className="menu-confirmation">Proposte del menu GMI: la selezione per il prossimo evento è in attesa di conferma. Immagini illustrative.</p>
    <div className="menu-information"><span className="info-icon" aria-hidden="true">i</span><div><strong>Un’esigenza alimentare? Parliamone.</strong><p>Per allergie, intolleranze o alternative, scrivici prima dell’evento. Ti aiuteremo a conoscere gli ingredienti e le opzioni disponibili.</p></div><a href={`${email.href}?subject=Informazioni%20sul%20menu`}>Chiedi informazioni <span aria-hidden="true">↗</span></a></div>
  </section>;
}

function DishDialog({ item, onClose, triggerRef }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const element = dialogRef.current;
    if (item) {
      if (!element.open) element.showModal();
      document.body.classList.add('dialog-open');
    } else {
      if (element.open) element.close();
      document.body.classList.remove('dialog-open');
    }
    return () => document.body.classList.remove('dialog-open');
  }, [item]);
  function close() { dialogRef.current.close(); }
  function handleClose() {
    document.body.classList.remove('dialog-open');
    onClose();
    if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
  }
  return <dialog id="dish-dialog" className="dish-dialog" ref={dialogRef} aria-labelledby={item ? 'dialog-title' : undefined} onClose={handleClose} onClick={(event) => {
    if (event.target !== dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  }}>
    <button className="dialog-close" aria-label="Chiudi dettagli" onClick={close}>×</button>
    {item && <div id="dialog-content"><img className="dialog-image" src={item.image} alt={`Illustrazione della schiacciata ${item.name}`} width="2400" height="1792" /><div className="dialog-body"><p className="eyebrow">DENTRO OGNI MORSO</p><h2 id="dialog-title">{item.name}</h2><p>{item.description}</p><ul className="ingredient-list" aria-label="Ingredienti">{item.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul><p className="dialog-note">{item.note}</p><Magnet padding={15} maxOffset={4}><a className="button button-dark" href={`${email.href}?subject=${encodeURIComponent(`Informazioni menu: ${item.name}`)}`}>Chiedi al nostro staff <span aria-hidden="true">↗</span></a></Magnet></div></div>}
  </dialog>;
}

function EventSection() {
  const confirmed = eventInfo.date || eventInfo.location;
  const date = eventInfo.date ? new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(new Date(eventInfo.date)) : 'Data in arrivo';
  return <section id="evento" className="event-section wrap" aria-labelledby="event-title"><div><p className="eyebrow">IL PROSSIMO INCONTRO</p><h2 id="event-title">{confirmed ? eventInfo.name : <>Ci ritroviamo<br /><em>presto, a tavola.</em></>}</h2></div><div className="event-details"><span className="status-pill"><span />{confirmed ? 'IL PROSSIMO INCONTRO' : 'DETTAGLI IN ARRIVO'}</span>{confirmed ? <p><span className="confirmed-date">{date}</span><span className="event-location">{eventInfo.location || 'Luogo in arrivo'}</span></p> : <p>Nome, data e luogo del nuovo evento saranno pubblicati qui.</p>}<a className="text-link" href={instagram.href} target="_blank" rel="noopener noreferrer">Segui gli aggiornamenti <span aria-hidden="true">↗</span><span className="sr-only"> su Instagram (nuova scheda)</span></a></div></section>;
}

function ClosingSection() {
  const reduced = useReducedMotion();
  return <section className="closing-section"><div className="wrap closing-inner"><p className="eyebrow">LE COSE BELLE SI CONDIVIDONO</p><p className="closing-title">Ti aspettiamo.<br /><em>Porta la tua storia.</em></p><Magnet padding={26} maxOffset={6} wrapperClassName="button-magnet"><a className="button button-cream" href={email.href}>Ci sentiamo? <span aria-hidden="true">↗</span></a></Magnet><motion.span className="closing-star" aria-hidden="true" initial={false} whileInView={reduced ? undefined : { rotate: 28 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: 'easeOut' }}>✳</motion.span></div></section>;
}

function Footer() {
  return <footer className="site-footer wrap"><Brand footer /><p>Giovani Musulmani d’Italia · Sezione Torino</p><div><a href={instagram.href} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span><span className="sr-only"> (nuova scheda)</span></a><a href={email.href}>Email <span aria-hidden="true">↗</span></a></div><span className="copyright">© {new Date().getFullYear()} GMI Torino</span></footer>;
}

function MobileBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let frame;
    function update() {
      if (frame) return;
      frame = requestAnimationFrame(() => { setVisible(window.scrollY > 450); frame = null; });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return <div className={`mobile-menu-bar ${visible ? 'is-visible' : ''}`} inert={!visible} aria-hidden={!visible}><a href="#menu">Il menu <span aria-hidden="true">↑</span></a><a href={email.href} aria-label="Scrivi a GMI Torino">Contattaci <span aria-hidden="true">↗</span></a></div>;
}

export default function App() {
  const [selectedDish, setSelectedDish] = useState(null);
  const triggerRef = useRef(null);
  return <><a className="skip-link" href="#menu">Vai al menu</a><Header /><main id="inizio"><Hero /><TasteStrip /><MenuSection onOpenDish={(item, trigger) => { triggerRef.current = trigger; setSelectedDish(item); }} /><CommunitySection /><EventSection /><FaqSection /><ClosingSection /></main><Footer /><MobileBar /><DishDialog item={selectedDish} onClose={() => setSelectedDish(null)} triggerRef={triggerRef} /></>;
}
