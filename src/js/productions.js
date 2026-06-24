// --- GALLERY MODAL LOGIC PARA SA PRODUCTIONS (AVP) ---
document.addEventListener('DOMContentLoaded', () => {
    const prodTrigger = document.getElementById('productionsTrigger');
    const prodModal = document.getElementById('productionsModal');
    const prodModalHeader = document.getElementById('prodModalHeader');
    const prodModalBody = document.getElementById('prodModalBody');
    const closeProdModal = document.getElementById('closeProdModal');
    
    const prodIframe = document.getElementById('prodIframe');
    const prevProdBtn = document.getElementById('prevProdBtn');
    const nextProdBtn = document.getElementById('nextProdBtn');
    const prodCounter = document.getElementById('prodCounter');

    // Playlist array placeholder para sa Productions gallery
    const playlist = [
        "https://drive.google.com/file/d/1HZg69JW6p0XVvvY3kj5lry0nwie7a0u3/preview",
        "https://drive.google.com/file/d/1m9hebGPUcTl9iNqx4Yn-Iu1LxZvbMoMU/preview",
        "https://drive.google.com/file/d/1gHNo9UrqZD7M3IhQYT0MkQ-EP1JZsjqe/preview",
        "https://drive.google.com/file/d/13W6evBQVbqdbMfyIbvFTDMs1sMgux8kE/preview",
        "https://drive.google.com/file/d/1XKzGWZDFfoRjq4Gfhmi3EkHWtrvI15xw/preview",
        "https://drive.google.com/file/d/1NQ_KdXDSmjxaS9P5KIoq1xAkCFr6AaS3/preview",
        "https://drive.google.com/file/d/1chRbTtBYUzJQbvxTEE-xW7mUO4KOlDRo/preview"
    ];
    
    let currentIndex = 0;

    // Interface update controller para sa video source at index counters
    const updateGallery = () => {
        prodIframe.src = playlist[currentIndex];
        prodCounter.innerText = `[ ${currentIndex + 1} / ${playlist.length} ]`;
    };

    if (prodTrigger && prodModal) {
        // 1. Pagbukas ng Productions Modal Window
        prodTrigger.addEventListener('click', function() {
            currentIndex = 0; // Palaging magsimula sa index 0 tuwing bubuksan
            updateGallery();
            
            prodModal.classList.remove('opacity-0', 'pointer-events-none');
            prodModal.classList.add('opacity-100', 'pointer-events-auto');
            
            if (prodModalHeader) {
                prodModalHeader.classList.remove('opacity-0', 'scale-95');
                prodModalHeader.classList.add('opacity-100', 'scale-100');
            }
            if (prodModalBody) {
                prodModalBody.classList.remove('opacity-0', 'scale-95');
                prodModalBody.classList.add('opacity-100', 'scale-100');
            }
        });

        // 2. Pagsasara ng Productions Modal Window
        const closeGallery = function() {
            prodModal.classList.remove('opacity-100', 'pointer-events-auto');
            prodModal.classList.add('opacity-0', 'pointer-events-none');
            
            if (prodModalHeader) {
                prodModalHeader.classList.remove('opacity-100', 'scale-100');
                prodModalHeader.classList.add('opacity-0', 'scale-95');
            }
            if (prodModalBody) {
                prodModalBody.classList.remove('opacity-100', 'scale-100');
                prodModalBody.classList.add('opacity-0', 'scale-95');
            }
            
            // Tintigilan ang rendering at playback ng audio/video engine
            prodIframe.src = '';
        };

        closeProdModal.addEventListener('click', closeGallery);
        prodModal.addEventListener('click', function(e) {
            // Gumagana lang kapag labas ng video screen pinindot ng pointer
            if (e.target === prodModal) {
                closeGallery();
            }
        });

        // 3. Carousel Logic Controls (Next & Previous)
        nextProdBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= playlist.length) {
                currentIndex = 0; // Seamless rewind pabalik sa una
            }
            updateGallery();
        });

        prevProdBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = playlist.length - 1; // Seamless skip papunta sa dulo
            }
            updateGallery();
        });
    }
});