/* one_page_website.js
   Lightweight, dependency-free lightbox for the thumbnail grid above.
*/

document.addEventListener('DOMContentLoaded', function () {
  const thumbImgs = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  if (!thumbImgs.length) return; // nothing to do

  let currentIndex = 0;
  let isOpen = false;

  // Build a simple data array from thumbnails
  const gallery = thumbImgs.map((img) => {
    return {
      thumbSrc: img.getAttribute('src'),
      largeSrc: img.dataset.large || img.src,
      alt: img.getAttribute('alt') || '',
      caption:
        (img.nextElementSibling && img.nextElementSibling.textContent) ||
        img.getAttribute('alt') ||
        '',
    };
  });

  function openLightbox(index) {
    currentIndex = index;
    showCurrent();
    lightbox.setAttribute('aria-hidden', 'false');
    isOpen = true;
    // trap focus if desired (simple)
    btnClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    isOpen = false;
    document.body.style.overflow = '';
  }

  function showCurrent() {
    const item = gallery[currentIndex];
    lightboxImg.src = item.largeSrc;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % gallery.length;
    showCurrent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    showCurrent();
  }

  // Click thumbnails to open
  thumbImgs.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
      openLightbox(idx);
    });

    // keyboard accessibility for thumbnails
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  // Buttons
  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  // Click outside the figure to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Optional: pre-load large images (small number only)
  gallery.forEach((item) => {
    const img = new Image();
    img.src = item.largeSrc;
  });
});
