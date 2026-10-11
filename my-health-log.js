// Reveal the evidence section only when a case or direct evidence link is selected.
const evidenceSection = document.getElementById('mhl-evidence-section');
const evidenceButtons = document.querySelectorAll('.mhl-evidence-link');
function scrollToEvidence(target) {
  const firstCase = document.getElementById('case-input');
  if (!evidenceSection.hidden) {
    firstCase.style.scrollMarginTop = `${firstCase.getBoundingClientRect().top - evidenceSection.getBoundingClientRect().top + 24}px`;
  }
  // Keep the section title and introduction visible for the first case.
  const destination = target.id === 'case-input' ? evidenceSection : target;
  destination.scrollIntoView({ behavior: 'instant', block: 'start' });
}
for (const button of evidenceButtons) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) continue;
  const summary = panel.querySelector('summary');
  const originalLabel = button.getAttribute('aria-label').replace('자세히 보기', '접기');
  const closedLabel = button.getAttribute('aria-label');
  const syncExpanded = () => {
    button.setAttribute('aria-expanded', String(panel.open));
    button.setAttribute('aria-label', panel.open ? originalLabel : closedLabel);
    button.innerHTML = (panel.open ? '검증 내용 접기' : '검증 내용 자세히 보기') + ' <span aria-hidden="true">→</span>';
    evidenceSection.hidden = !document.querySelector('.mhl-evidence[open]');
  };
  panel.addEventListener('toggle', syncExpanded);
  button.addEventListener('click', () => {
    panel.open = !panel.open;
    syncExpanded();
    if (panel.open) {
      evidenceSection.hidden = false;
      summary.focus({ preventScroll: true });
      scrollToEvidence(panel);
    }
  });
}
// Keep existing case links useful when a URL points directly to collapsed evidence.
function revealLinkedEvidence() {
  const target = document.getElementById(location.hash.slice(1));
  const panel = target?.closest('.mhl-evidence');
  if (panel) {
    evidenceSection.hidden = false;
    panel.open = true;
    scrollToEvidence(target);
  } else if (target === evidenceSection) {
    evidenceSection.hidden = false;
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}
for (const panel of document.querySelectorAll('.mhl-evidence')) {
  panel.addEventListener('toggle', () => {
    if (!panel.open && !document.querySelector('.mhl-evidence[open]')) {
      evidenceSection.hidden = true;
      const button = [...evidenceButtons].find(button => button.getAttribute('aria-controls') === panel.id) || evidenceButtons[0];
      if (evidenceSection.contains(document.activeElement)) button?.focus({ preventScroll: true });
    }
  });
}
// Preserve old home-section addresses while moving profile information to the main site.
const oldProfileSections = { about: 'about', skills: 'about', career: 'experience', contact: 'contact' };
function preserveOldSectionLinks() {
  const section = location.hash.slice(1);
  if (oldProfileSections[section]) location.replace('/#' + oldProfileSections[section]);
  if (section === 'projects') document.getElementById('cases').scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', preserveOldSectionLinks);
preserveOldSectionLinks();
window.addEventListener('hashchange', revealLinkedEvidence);
// Reapply after the browser's initial fragment scroll and stylesheet layout.
window.addEventListener('load', () => requestAnimationFrame(revealLinkedEvidence), { once: true });
revealLinkedEvidence();
