'use strict';

let language = 'pt';
try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; } catch (_) {}
const themeToggle = document.querySelector('.theme-toggle');
const languageToggle = document.querySelector('.language-toggle');
const translate = text => language === 'en' ? (englishCopy[text] || text) : text;
function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch (_) { /* Preferences still work without storage. */ }
}

// Keep original text nodes, so switching languages preserves icons, links and state.
const translatedNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  if (node.parentElement.closest('script, style, noscript')) continue;
  const original = node.textContent;
  if (englishCopy[original.trim()]) translatedNodes.push({ node, original });
}
const translatedAttributes = [];
document.querySelectorAll('[aria-label], [alt], [data-title]').forEach(element => {
  for (const attribute of ['aria-label', 'alt', 'data-title']) {
    const original = element.getAttribute(attribute);
    if (original && (englishCopy[original] || original.startsWith('Ampliar imagem: '))) {
      translatedAttributes.push({ element, attribute, original });
    }
  }
});

function updateProjectCount() {
  const count = [...document.querySelectorAll('.project-card')].filter(card => !card.hidden).length;
  document.querySelector('.project-count').textContent = `${count} ${language === 'en' ? (count === 1 ? 'project' : 'projects') : (count === 1 ? 'projeto' : 'projetos')}`;
}
function updatePreferenceLabels() {
  const light = document.documentElement.dataset.theme === 'light';
  const label = language === 'en' ? (light ? 'Switch to dark mode' : 'Switch to light mode') : (light ? 'Ativar modo escuro' : 'Ativar modo claro');
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeToggle.querySelector('.theme-glyph').setAttribute('href', light ? '#ph-moon' : '#ph-sun');
  const languageLabel = language === 'pt' ? 'Switch to English' : 'Mudar para português';
  languageToggle.setAttribute('aria-label', languageLabel);
  languageToggle.title = languageLabel;
  languageToggle.querySelector('img').src = `assets/images/flag-${language === 'pt' ? 'br' : 'gb'}.svg`;
  languageToggle.querySelector('.language-code').textContent = language.toUpperCase();
  document.querySelector('meta[name="theme-color"]').content = light ? '#f7f6f3' : '#111214';
}
function applyLanguage() {
  document.documentElement.lang = language === 'en' ? 'en-GB' : 'pt-BR';
  translatedNodes.forEach(({node, original}) => {
    node.textContent = original.replace(original.trim(), translate(original.trim()));
  });
  translatedAttributes.forEach(({element, attribute, original}) => {
    const value = language === 'en' && original.startsWith('Ampliar imagem: ')
      ? `Enlarge image: ${translate(original.slice('Ampliar imagem: '.length))}` : translate(original);
    element.setAttribute(attribute, value);
  });
  const title = `Felipe Feitosa | ${translate('Engenheiro de Dados')}`;
  document.title = title;
  document.querySelector('[property="og:title"]').content = title;
  document.querySelector('[property="og:locale"]').content = language === 'en' ? 'en_GB' : 'pt_BR';
  document.querySelector('meta[name="description"]').content = language === 'en'
    ? 'Felipe Feitosa, data engineer with a Computer Engineering degree from UFC. Projects with SQL, Python, ETL, data warehousing and data analysis.'
    : 'Portfólio de Felipe Feitosa, engenheiro de dados formado em Engenharia de Computação pela UFC. Projetos com SQL, Python, ETL, data warehouse e análise de dados.';
  document.querySelector('[property="og:description"]').content = language === 'en'
    ? 'Data engineering and analytics projects with Python and SQL. Education, experience and repositories.'
    : 'Projetos de engenharia e análise de dados com Python e SQL. Formação, experiência e repositórios.';
  const menu = document.querySelector('.menu-toggle');
  menu.setAttribute('aria-label', translate(menu.getAttribute('aria-expanded') === 'true' ? 'Fechar menu' : 'Abrir menu'));
  const countries = document.querySelector('[data-image*="countries"]');
  countries.dataset.image = `assets/covers/countries${language === 'en' ? '-en' : ''}.svg`;
  countries.querySelector('img').src = countries.dataset.image;
  updateProjectCount();
  updatePreferenceLabels();
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  savePreference('portfolio-theme', theme);
  updatePreferenceLabels();
});
languageToggle.addEventListener('click', () => {
  language = language === 'pt' ? 'en' : 'pt';
  savePreference('portfolio-language', language);
  applyLanguage();
});
applyLanguage();
