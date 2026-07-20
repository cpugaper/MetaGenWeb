// ---------- Header background on scroll ----------
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => navObserver.observe(section));

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Copy email to clipboard ----------
const copyBtn = document.getElementById('copy-email');
const copyCta = document.getElementById('copy-cta');
const emailText = document.getElementById('email-text');

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyCta.textContent = 'Copied to clipboard ✓';
      setTimeout(() => { copyCta.textContent = 'Click to copy →'; }, 2000);
    } catch (err) {
      copyCta.textContent = 'Copy failed — select manually';
    }
  });
}

