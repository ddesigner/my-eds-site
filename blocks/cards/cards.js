import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));


  // Apply placeholder CTA text to CTA elements inside each card body
  ul.querySelectorAll(
    // Add/adjust selectors to match your DOM
    '.cards-card-body .card-cta a, ' +
    '.cards-card-body a.cta, ' +
    '.cards-card-body button.cta, ' +
    '.cards-card-body .cta a'
  ).forEach((ctaEl) => {
    // Visible text
    ctaEl.textContent = CTA_TEXT;

    // Accessible label: pair with card title if present
    const li = ctaEl.closest('li');
    const titleEl = li?.querySelector('.cards-card-body h2, .cards-card-body h3, .cards-card-body .card-title');
    const titleText = titleEl?.textContent?.trim();
    const aria = titleText ? `${CTA_TEXT} — ${titleText}` : CTA_TEXT;
    ctaEl.setAttribute('aria-label', aria);

    // Optional: data attribute for testing/analytics
    ctaEl.closest('li')?.setAttribute('data-cta-text', CTA_TEXT);
  });


  block.replaceChildren(ul);
}

