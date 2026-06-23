const videoTrigger = document.getElementById('videoTrigger');
const videoModal = document.getElementById('videoModal');
const modalHeader = document.getElementById('modalHeader');
const modalBody = document.getElementById('modalBody');

if (videoTrigger && videoModal) {
    videoTrigger.addEventListener('click', function() {
        videoModal.classList.remove('opacity-0', 'pointer-events-none');
        videoModal.classList.add('opacity-100', 'pointer-events-auto');
        
        if (modalHeader) {
            modalHeader.classList.remove('opacity-0', 'scale-95');
            modalHeader.classList.add('opacity-100', 'scale-100');
        }
        
        if (modalBody) {
            modalBody.classList.remove('opacity-0', 'scale-95');
            modalBody.classList.add('opacity-100', 'scale-100');
        }
    });

    const closeModalFunction = function() {
        videoModal.classList.remove('opacity-100', 'pointer-events-auto');
        videoModal.classList.add('opacity-0', 'pointer-events-none');
        
        if (modalHeader) {
            modalHeader.classList.remove('opacity-100', 'scale-100');
            modalHeader.classList.add('opacity-0', 'scale-95');
        }
        
        if (modalBody) {
            modalBody.classList.remove('opacity-100', 'scale-100');
            modalBody.classList.add('opacity-0', 'scale-95');
        }
        
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            const currentSrc = iframe.src;
            iframe.src = '';
            iframe.src = currentSrc;
        }
    };

    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalFunction);
    }
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModalFunction();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    const navLinks = navContainer.querySelectorAll('a');
    const activeClasses = ['text-primary', 'dark:text-primary', 'border-b', 'border-primary', 'pb-1'];
    const inactiveClasses = ['text-on-surface-variant', 'dark:text-on-surface-variant'];

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => {
                item.classList.remove(...activeClasses);
                item.classList.add(...inactiveClasses);
            });

            this.classList.remove(...inactiveClasses);
            this.classList.add(...activeClasses);
        });
    });
});