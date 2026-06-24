// --- GALLERY MODAL LOGIC PARA SA PERSONAL VIDEOS ---
document.addEventListener('DOMContentLoaded', () => {
    const personalTrigger = document.getElementById('personalTrigger');
    const personalModal = document.getElementById('personalModal');
    const personalModalHeader = document.getElementById('personalModalHeader');
    const personalModalBody = document.getElementById('personalModalBody');
    const closePersonalModal = document.getElementById('closePersonalModal');
    
    const personalIframe = document.getElementById('personalIframe');
    const prevPersonalBtn = document.getElementById('prevPersonalBtn');
    const nextPersonalBtn = document.getElementById('nextPersonalBtn');
    const personalCounter = document.getElementById('personalCounter');

    // Mga placeholder links para sa iyong Personal Videos gallery
    const playlist = [
        "https://drive.google.com/file/d/1hVTWqJVkZO82V2-_9e1qWNdaLrrUaV6O/preview",
        "https://drive.google.com/file/d/1JA3neQkGu2-ylXiaCgHbcnU0OynNXTiL/preview",
        "https://drive.google.com/file/d/1TZ0Y5iBFvJ7n8zn6Av9bCJnzsZK8nx4w/preview",
        "https://drive.google.com/file/d/1EQscCzkE1THLhxBXZWp3ijiMb-i_M539/preview",
        "https://drive.google.com/file/d/1bhISMeBsbSXpleYopqD10MYfsvNT93Us/preview",
    ];
    
    let currentIndex = 0;

    // Interface controller para sa iframe content at header counter text
    const updateGallery = () => {
        personalIframe.src = playlist[currentIndex];
        personalCounter.innerText = `[ ${currentIndex + 1} / ${playlist.length} ]`;
    };

    if (personalTrigger && personalModal) {
        // 1. Pagbukas ng Personal Videos Modal Window
        personalTrigger.addEventListener('click', function() {
            currentIndex = 0; // Palaging ibalik sa simula tuwing bubuksan
            updateGallery();
            
            personalModal.classList.remove('opacity-0', 'pointer-events-none');
            personalModal.classList.add('opacity-100', 'pointer-events-auto');
            
            if (personalModalHeader) {
                personalModalHeader.classList.remove('opacity-0', 'scale-95');
                personalModalHeader.classList.add('opacity-100', 'scale-100');
            }
            if (personalModalBody) {
                personalModalBody.classList.remove('opacity-0', 'scale-95');
                personalModalBody.classList.add('opacity-100', 'scale-100');
            }
        });

        // 2. Pagsasara ng Personal Videos Modal Window
        const closeGallery = function() {
            personalModal.classList.remove('opacity-100', 'pointer-events-auto');
            personalModal.classList.add('opacity-0', 'pointer-events-none');
            
            if (personalModalHeader) {
                personalModalHeader.classList.remove('opacity-100', 'scale-100');
                personalPersonalHeader.classList.add('opacity-0', 'scale-95');
            }
            if (personalModalBody) {
                personalModalBody.classList.remove('opacity-100', 'scale-100');
                personalModalBody.classList.add('opacity-0', 'scale-95');
            }
            
            // Agad na pinuputol ang video loading/playback
            personalIframe.src = '';
        };

        closePersonalModal.addEventListener('click', closeGallery);
        personalModal.addEventListener('click', function(e) {
            // Gumagana lamang kapag ang mismong translucent overlay background ang pinindot
            if (e.target === personalModal) {
                closeGallery();
            }
        });

        // 3. Slider Controls Logic (Next at Previous)
        nextPersonalBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= playlist.length) {
                currentIndex = 0; // Balik sa una
            }
            updateGallery();
        });

        prevPersonalBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = playlist.length - 1; // Pumunta sa dulo
            }
            updateGallery();
        });
    }
});