// --- GALLERY MODAL LOGIC PARA SA REELS ---
document.addEventListener('DOMContentLoaded', () => {
    const reelsTrigger = document.getElementById('reelsTrigger');
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalHeader = document.getElementById('galleryModalHeader');
    const galleryModalBody = document.getElementById('galleryModalBody');
    const closeGalleryModal = document.getElementById('closeGalleryModal');
    
    const galleryIframe = document.getElementById('galleryIframe');
    const prevGalleryBtn = document.getElementById('prevGalleryBtn');
    const nextGalleryBtn = document.getElementById('nextGalleryBtn');
    const galleryCounter = document.getElementById('galleryCounter');

    // Mga placeholder videos na ibinigay mo
    const playlist = [
        "https://drive.google.com/file/d/1RYJIHmx958ezsb9ugz77njTW1cmwZEti/preview",
        "https://drive.google.com/file/d/1yhIrovDimJ3iMtzyopm6IwDfwZU1T9s9/preview",
        "https://drive.google.com/file/d/1vp-mLwMT8L0WuS5_ojgT2oRn5zeMmF4a/preview",
        "https://drive.google.com/file/d/1Y41Yu79y6n49cSKLZgOP3F52LpMez1tr/preview",
        "https://drive.google.com/file/d/10QuNyjEmPvt18_lXFoF87nzMH9qZKPlj/preview",
        "https://drive.google.com/file/d/1JA3neQkGu2-ylXiaCgHbcnU0OynNXTiL/preview",
        "https://drive.google.com/file/d/1hVTWqJVkZO82V2-_9e1qWNdaLrrUaV6O/preview"
    ];
    
    let currentIndex = 0;

    // Update function para sa Video at Text Counter
    const updateGallery = () => {
        galleryIframe.src = playlist[currentIndex];
        galleryCounter.innerText = `[ ${currentIndex + 1} / ${playlist.length} ]`;
    };

    if (reelsTrigger && galleryModal) {
        // 1. Pagbukas ng Gallery Modal
        reelsTrigger.addEventListener('click', function() {
            currentIndex = 0; // I-reset sa unang video kapag binuksan
            updateGallery();
            
            galleryModal.classList.remove('opacity-0', 'pointer-events-none');
            galleryModal.classList.add('opacity-100', 'pointer-events-auto');
            
            if (galleryModalHeader) {
                galleryModalHeader.classList.remove('opacity-0', 'scale-95');
                galleryModalHeader.classList.add('opacity-100', 'scale-100');
            }
            if (galleryModalBody) {
                galleryModalBody.classList.remove('opacity-0', 'scale-95');
                galleryModalBody.classList.add('opacity-100', 'scale-100');
            }
        });

        // 2. Pagsasara ng Gallery Modal
        const closeGallery = function() {
            galleryModal.classList.remove('opacity-100', 'pointer-events-auto');
            galleryModal.classList.add('opacity-0', 'pointer-events-none');
            
            if (galleryModalHeader) {
                galleryModalHeader.classList.remove('opacity-100', 'scale-100');
                galleryModalHeader.classList.add('opacity-0', 'scale-95');
            }
            if (galleryModalBody) {
                galleryModalBody.classList.remove('opacity-100', 'scale-100');
                galleryModalBody.classList.add('opacity-0', 'scale-95');
            }
            
            // Tanggalin ang src para huminto ang sound/video
            galleryIframe.src = '';
        };

        closeGalleryModal.addEventListener('click', closeGallery);
        galleryModal.addEventListener('click', function(e) {
            // Isara ang modal kapag pinindot ang background na madilim
            if (e.target === galleryModal) {
                closeGallery();
            }
        });

        // 3. Navigation Logic (Next at Prev)
        nextGalleryBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= playlist.length) {
                currentIndex = 0; // Babalik sa una kapag lumagpas
            }
            updateGallery();
        });

        prevGalleryBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = playlist.length - 1; // Pupunta sa dulo kapag bumaba sa zero
            }
            updateGallery();
        });

        // 4. Escape key para isara ang modal
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Escape') return;
            if (galleryModal.classList.contains('pointer-events-none')) return;
            closeGallery();
        });
    }
});