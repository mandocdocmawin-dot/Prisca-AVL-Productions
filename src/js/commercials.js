// --- GALLERY MODAL LOGIC PARA SA COMMERCIALS ---
document.addEventListener('DOMContentLoaded', () => {
    const commTrigger = document.getElementById('commercialsTrigger');
    const commModal = document.getElementById('commercialsModal');
    const commModalHeader = document.getElementById('commModalHeader');
    const commModalBody = document.getElementById('commModalBody');
    const closeCommModal = document.getElementById('closeCommModal');
    
    const commIframe = document.getElementById('commIframe');
    const prevCommBtn = document.getElementById('prevCommBtn');
    const nextCommBtn = document.getElementById('nextCommBtn');
    const commCounter = document.getElementById('commCounter');

    // Mga placeholder links para sa Commercials (Palitan mo na lang ng Google Drive embedded preview link mamaya)
    const playlist = [
        "https://drive.google.com/file/d/1MW-p9TBUrbg2LOYRDudGWbrNEwzchG15/preview",
        "https://drive.google.com/file/d/1RYJIHmx958ezsb9ugz77njTW1cmwZEti/preview",
        "https://drive.google.com/file/d/1Y41Yu79y6n49cSKLZgOP3F52LpMez1tr/preview",
        "https://drive.google.com/file/d/1R0SxT1dhrQd8d-t-Jo1rqb4dhgipMU5Z/preview",
        "https://drive.google.com/file/d/1KCW1ZvI-Fnz4r-LQ7uEVlv0TIriiXY9A/preview",
        "https://drive.google.com/file/d/1nhrVW-t5qCyF91G5HCYb9D0MUFqNwwkF/preview"
    ];
    
    let currentIndex = 0;

    // Update function para sa Video Source at Text Counter
    const updateGallery = () => {
        commIframe.src = playlist[currentIndex];
        commCounter.innerText = `[ ${currentIndex + 1} / ${playlist.length} ]`;
    };

    if (commTrigger && commModal) {
        // 1. Pagbukas ng Commercials Modal
        commTrigger.addEventListener('click', function() {
            currentIndex = 0; // Balik palagi sa unang video tuwing binubuksan
            updateGallery();
            
            commModal.classList.remove('opacity-0', 'pointer-events-none');
            commModal.classList.add('opacity-100', 'pointer-events-auto');
            
            if (commModalHeader) {
                commModalHeader.classList.remove('opacity-0', 'scale-95');
                commModalHeader.classList.add('opacity-100', 'scale-100');
            }
            if (commModalBody) {
                commModalBody.classList.remove('opacity-0', 'scale-95');
                commModalBody.classList.add('opacity-100', 'scale-100');
            }
        });

        // 2. Pagsasara ng Commercials Modal
        const closeGallery = function() {
            commModal.classList.remove('opacity-100', 'pointer-events-auto');
            commModal.classList.add('opacity-0', 'pointer-events-none');
            
            if (commModalHeader) {
                commModalHeader.classList.remove('opacity-100', 'scale-100');
                commModalHeader.classList.add('opacity-0', 'scale-95');
            }
            if (commModalBody) {
                commModalBody.classList.remove('opacity-100', 'scale-100');
                commModalBody.classList.add('opacity-0', 'scale-95');
            }
            
            // Tinatanggal ang src para ma-cut kaagad ang loading at audio playback ng video
            commIframe.src = '';
        };

        closeCommModal.addEventListener('click', closeGallery);
        commModal.addEventListener('click', function(e) {
            // Isasara lang kapag labas ng video pane (yung background overlay) ang na-click
            if (e.target === commModal) {
                closeGallery();
            }
        });

        // 3. Navigation Buttons Control (Next & Previous)
        nextCommBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= playlist.length) {
                currentIndex = 0; // Ikot pabalik sa una kapag dulo na
            }
            updateGallery();
        });

        prevCommBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = playlist.length - 1; // Ikot sa dulo kapag bumaba sa zero
            }
            updateGallery();
        });
    }
});