// ---------- Table of contents scrollspy (guide.html only) ----------
const tocLinks = document.querySelectorAll('[data-toc]');
const guideSections = document.querySelectorAll('.guide-section[id]');

if (tocLinks.length && guideSections.length) {
  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  guideSections.forEach(section => tocObserver.observe(section));
}
