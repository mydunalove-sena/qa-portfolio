// Each case reveals its own evidence directly below its overview.
const evidenceSection = document.getElementById('mhl-evidence-section');
const evidenceButtons = document.querySelectorAll('.mhl-evidence-link');
const caseControls = [...evidenceButtons].map(button => ({
  button,
  panel: document.getElementById(button.getAttribute('aria-controls')),
  closedLabel: button.getAttribute('aria-label'),
})).filter(control => control.panel);
let sectionLinked = false;

function syncEvidence() {
  for (const { button, panel, closedLabel } of caseControls) {
    if (!panel.open && panel.contains(document.activeElement)) {
      button.focus({ preventScroll: true });
    }
    panel.hidden = !panel.open;
    button.setAttribute('aria-expanded', String(panel.open));
    button.setAttribute('aria-label', panel.open ? closedLabel.replace('자세히 보기', '접기') : closedLabel);
    button.innerHTML = (panel.open ? '검증 내용 접기' : '검증 내용 자세히 보기') + ' <span aria-hidden="true">→</span>';
  }
  // Supplementary headings stay available independently of case toggles.
  evidenceSection.hidden = false;
  for (const panel of evidenceSection.querySelectorAll('.mhl-evidence')) {
    panel.querySelector('summary').setAttribute('aria-expanded', String(panel.open));
  }
}

for (const { button, panel } of caseControls) {
  button.addEventListener('click', () => {
    panel.open = !panel.open;
    syncEvidence();
    if (panel.open) {
      // Keep the selected case and its button together with the newly opened text.
      const card = button.closest('.mhl-case');
      if (card.getBoundingClientRect().top < 24 || panel.getBoundingClientRect().top > innerHeight - 80) {
        card.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
  });
}
// Keep existing case links useful when a URL points directly to collapsed evidence.
function revealLinkedEvidence() {
  const target = document.getElementById(location.hash.slice(1));
  const panel = target?.closest('.mhl-evidence');
  sectionLinked = target === evidenceSection || target?.id === 'evidence-title';
  if (panel) {
    panel.open = true;
    syncEvidence();
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  } else {
    syncEvidence();
    if (sectionLinked) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}
for (const panel of document.querySelectorAll('.mhl-evidence')) {
  panel.addEventListener('toggle', syncEvidence);
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
