document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.article-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const href = card.dataset.href;
      const target = card.dataset.target;
      if (href) {
        if (target === '_blank') {
          window.open(href, '_blank', 'noopener noreferrer');
        } else {
          window.location.href = href;
        }
      }
    });
  });
});
