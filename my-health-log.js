// Reveal the evidence section only when a case or direct evidence link is selected.
const evidenceSection = document.getElementById('mhl-evidence-section');
const evidenceButtons = document.querySelectorAll('.mhl-evidence-link');
for (const button of evidenceButtons) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) continue;
  const summary = panel.querySelector('summary');
  const syncExpanded = () => button.setAttribute('aria-expanded', String(panel.open));
  panel.addEventListener('toggle', syncExpanded);
  button.addEventListener('click', () => {
    panel.open = !panel.open;
    syncExpanded();
    if (panel.open) {
      evidenceSection.hidden = false;
      summary.focus({ preventScroll: true });
      panel.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
}
// Keep existing case links useful when a URL points directly to collapsed evidence.
function revealLinkedEvidence() {
  const panel = document.getElementById(location.hash.slice(1));
  if (panel?.matches('.mhl-evidence')) {
    evidenceSection.hidden = false;
    panel.open = true;
    panel.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}
window.addEventListener('hashchange', revealLinkedEvidence);
revealLinkedEvidence();
