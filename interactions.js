/* Progressive enhancement: all content and native details work without JavaScript. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = document.querySelectorAll('.section-heading, .project, .about-lead, .journey-item, .contact');
  let observer;
  function setMotion() {
    observer?.disconnect();
    if (reduced.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach(el => el.classList.remove('reveal', 'is-visible'));
      document.querySelectorAll('details').forEach(el => el.getAnimations().forEach(a => a.finish()));
      return;
    }
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    revealTargets.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
  setMotion();
  reduced.addEventListener('change', setMotion);
  document.addEventListener('focusin', e => {
    const parent = e.target.closest('.reveal');
    parent?.classList.add('is-visible');
  });

  // Keep native summary keyboard behavior; animate the containing panel height.
  document.querySelectorAll('details').forEach(panel => {
    const summary = panel.querySelector('summary');
    let animation;
    let intendedOpen = panel.open;
    summary.addEventListener('click', event => {
      if (reduced.matches || !panel.animate) return;
      event.preventDefault();
      const start = panel.getBoundingClientRect().height;
      animation?.cancel();
      intendedOpen = !intendedOpen;
      panel.open = true;
      panel.style.height = '';
      const styles = getComputedStyle(panel);
      const closedHeight = summary.getBoundingClientRect().height + parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom) + parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
      const end = intendedOpen ? panel.getBoundingClientRect().height : closedHeight;
      panel.style.overflow = 'hidden';
      animation = panel.animate([{height: `${start}px`}, {height: `${end}px`}], {duration: 300, easing: 'cubic-bezier(.22,1,.36,1)'});
      animation.onfinish = () => {
        panel.open = intendedOpen;
        panel.style.height = '';
        panel.style.overflow = '';
        animation = null;
      };
    });
  });

  // A subtle, bounded tilt only for a precise pointer; scrolling is never captured.
  const art = document.querySelector('.hero-art');
  const windowCard = document.querySelector('.profile-window');
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    art.addEventListener('pointermove', event => {
      if (reduced.matches) return;
      const box = art.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      windowCard.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) rotate(5deg) translate(${x * 5}px, ${y * 5}px)`;
    });
    art.addEventListener('pointerleave', () => windowCard.style.transform = '');
  }
})();
