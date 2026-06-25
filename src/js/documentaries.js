// --- GALLERY MODAL LOGIC PARA SA DOCUMENTARIES ---
document.addEventListener('DOMContentLoaded', () => {
    const docsTrigger = document.getElementById('documentariesTrigger');
    const docsModal = document.getElementById('documentariesModal');
    const docsModalHeader = document.getElementById('docsModalHeader');
    const docsModalBody = document.getElementById('docsModalBody');
    const closeDocsModal = document.getElementById('closeDocsModal');
    
    const docsIframe = document.getElementById('docsIframe');
    const prevDocsBtn = document.getElementById('prevDocsBtn');
    const nextDocsBtn = document.getElementById('nextDocsBtn');
    const docsCounter = document.getElementById('docsCounter');

    // Mga placeholder videos para sa Documentaries (Palitan mo na lang ng active links mamaya)
    const playlist = [
        "https://drive.google.com/file/d/16CNaqYELREcvq4mGV5gbnkZWK3qzztl_/preview",
        "https://drive.google.com/file/d/1AZGxHc1LwC8Hp1IzhJT8HvlMXgQcubse/preview",
    ];
    
    let currentIndex = 0;

    // Update function para sa Video Player at Text Counter
    const updateGallery = () => {
        docsIframe.src = playlist[currentIndex];
        docsCounter.innerText = `[ ${currentIndex + 1} / ${playlist.length} ]`;
    };

    if (docsTrigger && docsModal) {
        // 1. Pagbukas ng Documentaries Modal
        docsTrigger.addEventListener('click', function() {
            currentIndex = 0; // I-reset sa unang video kapag binuksan
            updateGallery();
            
            docsModal.classList.remove('opacity-0', 'pointer-events-none');
            docsModal.classList.add('opacity-100', 'pointer-events-auto');
            
            if (docsModalHeader) {
                docsModalHeader.classList.remove('opacity-0', 'scale-95');
                docsModalHeader.classList.add('opacity-100', 'scale-100');
            }
            if (docsModalBody) {
                docsModalBody.classList.remove('opacity-0', 'scale-95');
                docsModalBody.classList.add('opacity-100', 'scale-100');
            }
        });

        // 2. Pagsasara ng Documentaries Modal
        const closeGallery = function() {
            docsModal.classList.remove('opacity-100', 'pointer-events-auto');
            docsModal.classList.add('opacity-0', 'pointer-events-none');
            
            if (docsModalHeader) {
                docsModalHeader.classList.remove('opacity-100', 'scale-100');
                docsModalHeader.classList.add('opacity-0', 'scale-95');
            }
            if (docsModalBody) {
                docsModalBody.classList.remove('opacity-100', 'scale-100');
                docsModalBody.classList.add('opacity-0', 'scale-95');
            }
            
            // Tanggalin ang src para huminto kaagad ang sound/video playback
            docsIframe.src = '';
        };

        closeDocsModal.addEventListener('click', closeGallery);
        docsModal.addEventListener('click', function(e) {
            // Isara ang modal kapag pinindot ang background overlay
            if (e.target === docsModal) {
                closeGallery();
            }
        });

        // 3. Navigation Controls (Next at Prev)
        nextDocsBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= playlist.length) {
                currentIndex = 0; // Balik sa una kapag dulo na
            }
            updateGallery();
        });

        prevDocsBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = playlist.length - 1; // Ikot sa huli kung bababa sa zero
            }
            updateGallery();
        });

        // 4. Escape key para isara ang modal
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Escape') return;
            if (docsModal.classList.contains('pointer-events-none')) return;
            closeGallery();
        });
    }
});