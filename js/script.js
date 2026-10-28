const body = document.body;
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const certModal = document.getElementById('certModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

function applyTheme(theme) {
  const darkMode = theme === 'dark';
  body.classList.toggle('dark', !darkMode);
  if (themeIcon) {
    themeIcon.textContent = darkMode ? '🌙' : '☀️';
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', nextTheme);
  applyTheme(nextTheme);
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.cert-card').forEach((card) => {
  const openCertificate = () => {
    const img = card.querySelector('img');
    if (!img) return;
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    closeModal.focus();
  };

  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('click', openCertificate);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCertificate();
    }
  });
});

closeModal.addEventListener('click', () => {
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
});

certModal.addEventListener('click', (event) => {
  if (event.target === certModal) {
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && certModal.classList.contains('open')) {
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
  }
});
