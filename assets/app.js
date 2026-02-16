document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.querySelector('[data-lang-switcher]');
  const langButton = document.querySelector('[data-lang-button]');

  if (switcher && langButton) {
    langButton.addEventListener('click', () => {
      switcher.classList.toggle('open');
    });
    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) {
        switcher.classList.remove('open');
      }
    });
  }

  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-button');
    button.addEventListener('click', () => {
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const modal = document.querySelector('[data-modal]');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  const closeModalButton = document.querySelector('[data-close-modal]');
  let lastFocus = null;

  const focusableSelectors = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  };

  if (modal) {
    openModalButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        lastFocus = document.activeElement;
        modal.classList.add('open');
        document.body.classList.add('modal-open');
        const focusables = modal.querySelectorAll(focusableSelectors);
        if (focusables.length) focusables[0].focus();
      });
    });

    closeModalButton?.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      if (!modal.classList.contains('open')) return;
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      if (event.key === 'Tab') {
        const focusables = Array.from(modal.querySelectorAll(focusableSelectors));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));
});
