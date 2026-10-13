// Le proposte provengono dal menu precedente: confermare le ricette per il nuovo evento.
export const menuItems = [
  {
    id: 'contadina',
    name: 'Contadina',
    description: 'Il carattere della rucola, la dolcezza dei datterini e una morbida crema di funghi al formaggio Kinara.',
    ingredients: [
      'Rucola',
      'Pomodorini datterini',
      'Crema di funghi',
      'Formaggio Kinara stagionato con caglio vegetale',
    ],
    note: 'Alternativa disponibile su richiesta: disponibilità e ingredienti da confermare con lo staff.',
    tags: ['Caglio vegetale'],
    image: '/assets/contadina-v2.webp',
  },
  {
    id: 'mediterranea',
    name: 'Mediterranea',
    description: 'Melanzane alla griglia e pomodorini datterini incontrano la ricotta vegana e il formaggio Kinara stagionato.',
    ingredients: [
      'Ricotta vegana',
      'Pomodorini datterini',
      'Melanzane alla griglia',
      'Formaggio Kinara stagionato con caglio vegetale',
    ],
    note: 'Alternativa disponibile su richiesta: disponibilità e ingredienti da confermare con lo staff.',
    tags: ['Caglio vegetale'],
    image: '/assets/mediterranea.webp',
  },
];

export const eventInfo = {
  name: 'Il gusto di stare insieme',
  date: null,
  location: null,
  status: 'Dettagli in arrivo',
};

export const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: 'gmitorino@gmail.com',
    href: 'mailto:gmitorino@gmail.com',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@gmi.torino',
    href: 'https://instagram.com/gmi.torino',
  },
  {
    id: 'website',
    label: 'Sito GMI',
    value: 'gmitalia.org',
    href: 'https://gmitalia.org/',
  },
];
