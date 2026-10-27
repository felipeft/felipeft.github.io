'use strict';

// The portfolio is static. JavaScript only controls navigation, filters and image viewing.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', translate('Abrir menu'));
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', translate(open ? 'Fechar menu' : 'Abrir menu'));
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('.filter')];
// A link to the highlighted project must also work after filtering it out.
document.querySelector('.preview-link').addEventListener('click', () => {
  if (document.querySelector('.featured').hidden) {
    document.querySelector('[data-filter="all"]').click();
  }
});
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  });
  updateProjectCount();
}));

const imageDialog = document.querySelector('.image-dialog');
const fullImage = document.querySelector('.full-image');
let imageTrigger;

document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    document.querySelector('#image-title').textContent = button.dataset.title;
    fullImage.src = button.dataset.image;
    fullImage.alt = button.querySelector('img').alt;
    imageDialog.showModal();
    imageDialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.close-dialog').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target !== imageDialog) return;
  const rect = imageDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    imageDialog.close();
  }
});
imageDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  imageTrigger?.focus({ preventScroll: true });
});

const navLinks = [...navigation.querySelectorAll('a')];
const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
let scheduled = false;

function updateActiveSection() {
  scheduled = false;
  // Pick the last section that has reached the top of the viewport. Nested sections
  // are ordered by their actual position, not by navigation or DOM ordering.
  const active = sections
    .filter(section => section.getBoundingClientRect().top <= 150)
    .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
  navLinks.forEach(link => {
    if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();
document.querySelector('#year').textContent = new Date().getFullYear();
