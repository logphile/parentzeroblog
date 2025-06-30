document.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.animated-statements .home-statement-line');

    // Initial animation
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('fade-in');
        }, 500 + index * 200); // Staggered delay
    });

    // Re-trigger animation on hover
    lines.forEach(line => {
        line.addEventListener('mouseover', () => {
            line.classList.remove('fade-in');
            // This timeout is a trick to allow the browser to remove the class before re-adding it
            setTimeout(() => {
                line.classList.add('fade-in');
            }, 10);
        });
    });
});
