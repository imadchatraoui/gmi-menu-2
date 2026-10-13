import { menuItems, eventInfo } from './data.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const dishList = document.querySelector('#dish-list');
const dialog = document.querySelector('#dish-dialog');
const dialogContent = document.querySelector('#dialog-content');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastTrigger = null;

const revealObserver = 'IntersectionObserver' in window && !reducedMotion
  ? new IntersectionObserver((entries, observer) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 })
  : null;

function revealElements() {
  if (!revealObserver) return;
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => revealObserver.observe(element));
}

function renderMenu(filter = 'all') {
  const items = menuItems.filter((item) => filter === 'all' || item.id === filter);
  dishList.innerHTML = items.map((item) => {
    const number = String(menuItems.indexOf(item) + 1).padStart(2, '0');
    return `<article class="dish-card reveal" id="piatto-${escapeHtml(item.id)}">
      <div class="dish-image-wrap"><img class="dish-image" src="${escapeHtml(item.image)}" alt="Ingredienti della schiacciata ${escapeHtml(item.name)} illustrati in pixel art" width="2400" height="1792" loading="lazy" decoding="async"/><span class="dish-image-label">LA SCHIACCIATA · ${number}</span></div>
      <div class="dish-body"><div class="dish-title-row"><h3 class="dish-title">${escapeHtml(item.name)}</h3><span class="dish-number">/ ${number}</span></div><p class="dish-description">${escapeHtml(item.description)}</p><div class="dish-bottom"><span class="dish-tag">${escapeHtml(item.tags[0])}</span><button class="dish-detail-button" data-dish="${escapeHtml(item.id)}" aria-haspopup="dialog" aria-label="Ingredienti e dettagli di ${escapeHtml(item.name)}">Ingredienti e dettagli <span aria-hidden="true">↗</span></button></div></div>
    </article>`;
  }).join('');
  document.querySelector('#menu-announcement').textContent = filter === 'all' ? `Tutto il menu: ${items.length} piatti.` : `Visualizzata ${items[0]?.name ?? 'nessuna proposta'}.`;
  revealElements();
}

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((other) => {
      const selected = button === other;
      other.classList.toggle('is-selected', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    renderMenu(button.dataset.filter);
  });
});

function openDish(id, trigger) {
  const item = menuItems.find((dish) => dish.id === id);
  if (!item) return;
  lastTrigger = trigger;
  dialogContent.innerHTML = `<img class="dialog-image" src="${escapeHtml(item.image)}" alt="Illustrazione della schiacciata ${escapeHtml(item.name)}" width="2400" height="1792"/><div class="dialog-body"><p class="eyebrow">DENTRO OGNI MORSO</p><h2 id="dialog-title">${escapeHtml(item.name)}</h2><p>${escapeHtml(item.description)}</p><ul class="ingredient-list" aria-label="Ingredienti">${item.ingredients.map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join('')}</ul><p class="dialog-note">${escapeHtml(item.note)}</p><a class="button button-dark" href="mailto:gmitorino@gmail.com?subject=${encodeURIComponent(`Informazioni menu: ${item.name}`)}">Chiedi al nostro staff <span aria-hidden="true">↗</span></a></div>`;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

dishList.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-dish]');
  if (trigger) openDish(trigger.dataset.dish, trigger);
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
});

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('#mobile-navigation');
function closeNavigation() {
  mobileNav.hidden = true;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Apri la navigazione');
}
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Chiudi la navigazione' : 'Apri la navigazione');
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeNavigation(); navToggle.focus(); }
});
document.addEventListener('click', (event) => {
  if (!mobileNav.hidden && !event.target.closest('.site-header')) closeNavigation();
});
window.matchMedia('(min-width: 601px)').addEventListener('change', (event) => { if (event.matches) closeNavigation(); });

const mobileBar = document.querySelector('.mobile-menu-bar');
let ticking = false;
function syncMobileBar() {
  const visible = window.scrollY > 450;
  mobileBar.classList.toggle('is-visible', visible);
  mobileBar.inert = !visible;
  mobileBar.setAttribute('aria-hidden', String(!visible));
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(syncMobileBar); }
}, { passive: true });
syncMobileBar();

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) {
      document.querySelectorAll('.desktop-nav a').forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
    }
  }, { rootMargin: '-15% 0px -60% 0px' });
  ['menu', 'insieme', 'domande'].forEach((id) => navObserver.observe(document.getElementById(id)));
}

if (eventInfo.date || eventInfo.location) {
  document.querySelector('#event-title').textContent = eventInfo.name;
  document.querySelector('.status-pill').innerHTML = '<span></span> IL PROSSIMO INCONTRO';
  const date = eventInfo.date ? new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(new Date(eventInfo.date)) : 'Data in arrivo';
  document.querySelector('.event-details>p').innerHTML = `<span class="confirmed-date">${escapeHtml(date)}</span><span class="event-location">${escapeHtml(eventInfo.location || 'Luogo in arrivo')}</span>`;
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
renderMenu();
if (revealObserver) document.documentElement.classList.add('js');
revealElements();
