// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Resume Section ScrollSpy & Left Sidebar Auto-Scroll ---
    const resumeSections = document.querySelectorAll('#resume .resume-section, #pdf-viewer-section');
    const sidebarSubLinks = document.querySelectorAll('.sidebar-sub-link');

    if (resumeSections.length > 0 && sidebarSubLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-15% 0px -55% 0px',
            threshold: 0
        };

        const scrollSpyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    sidebarSubLinks.forEach(link => {
                        const href = link.getAttribute('href').replace('#', '');
                        if (href === sectionId) {
                            link.classList.add('active');
                            // Auto scroll sidebar up/down to keep active link in view!
                            link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        resumeSections.forEach(section => scrollSpyObserver.observe(section));
    }
});
