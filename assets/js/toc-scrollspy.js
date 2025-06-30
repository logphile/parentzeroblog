document.addEventListener('DOMContentLoaded', () => {
    const toc = document.querySelector('.sticky-toc #TableOfContents');
    if (!toc) {
        return;
    }

    const tocLinks = toc.querySelectorAll('a');
    const headings = Array.from(tocLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(heading => heading !== null);

    if (headings.length === 0) {
        return;
    }

    const setActiveLink = () => {
        let activeHeading = null;

        // Find the heading that is currently in view or the last one scrolled past
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            const rect = heading.getBoundingClientRect();
            // Using a top offset of 150px to account for sticky header and give some buffer
            if (rect.top <= 150) {
                activeHeading = heading;
                break;
            }
        }

        // If we are at the very top, no heading should be active.
        if (window.scrollY < 200 && !activeHeading) {
             tocLinks.forEach(link => link.classList.remove('active'));
             return;
        }

        // If we scrolled to the bottom, the last heading should be active.
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
            activeHeading = headings[headings.length - 1];
        }

        // First, remove 'active' from all links and their parent list items
        tocLinks.forEach(link => {
            link.classList.remove('active');
            const listItem = link.parentElement;
            if (listItem) {
                listItem.classList.remove('active');
            }
        });

        // Then, add 'active' to the current link and its parent list item
        if (activeHeading) {
            const activeLink = toc.querySelector(`a[href="#${activeHeading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                const activeListItem = activeLink.parentElement;
                if (activeListItem) {
                    activeListItem.classList.add('active');
                }

                // Scroll the ToC container to keep the active link in view
                const tocContainer = document.querySelector('.sticky-toc');
                const activeLinkRect = activeLink.getBoundingClientRect();
                const tocContainerRect = tocContainer.getBoundingClientRect();
                if (activeLinkRect.bottom > tocContainerRect.bottom || activeLinkRect.top < tocContainerRect.top) {
                    activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }
    };

    // Use a throttled version of setActiveLink to improve performance
    let timeout;
    const throttledSetActiveLink = () => {
        if (!timeout) {
            timeout = setTimeout(() => {
                setActiveLink();
                timeout = null;
            }, 100); // Throttle to run at most every 100ms
        }
    };

    // Run on load and on scroll
    throttledSetActiveLink();
    window.addEventListener('scroll', throttledSetActiveLink, { passive: true });
});
