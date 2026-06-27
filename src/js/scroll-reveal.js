document.addEventListener('DOMContentLoaded', () => {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal, .reveal-lg, .reveal-sm').forEach(el => {
            el.classList.add('is-visible');
        });
        return;
    }

    const STAGGER_STEP_MS = 120;
    document.querySelectorAll('[data-stagger]').forEach(group => {
        const items = group.querySelectorAll('.reveal, .reveal-lg, .reveal-sm');
        items.forEach((el, index) => {
            el.style.setProperty('--reveal-delay', `${index * STAGGER_STEP_MS}ms`);
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -4% 0px',
        threshold: 0.01
    });

    const allRevealElements = document.querySelectorAll('.reveal, .reveal-lg, .reveal-sm');
    
    requestAnimationFrame(() => {
        setTimeout(() => {
            allRevealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isAboveFold || window.scrollY > 0) {
                    el.classList.add('is-visible');
                } else {
                    revealObserver.observe(el);
                }
            });
        }, 100);
    });
});