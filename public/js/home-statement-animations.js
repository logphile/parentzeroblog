document.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.animated-statements .home-statement-line');
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('fade-in');
        }, 500 + index * 200); // Staggered delay starting from 500ms
    });
});
