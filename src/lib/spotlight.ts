/**
 * Sets --mx / --my on every .spot element as the mouse moves over it,
 * so the CSS radial-gradient spotlight follows the cursor.
 * Re-binds after Astro page transitions.
 */
function bind() {
  document.querySelectorAll<HTMLElement>('.spot').forEach((el) => {
    if (el.dataset.spot) return;
    el.dataset.spot = '1';
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}
bind();
document.addEventListener('astro:page-load', bind);
