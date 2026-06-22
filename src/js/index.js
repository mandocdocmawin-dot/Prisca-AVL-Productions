const videoTrigger = document.getElementById('videoTrigger');
const previewVideo = document.getElementById('previewVideo');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalHeader = document.getElementById('modalHeader');
const modalBody = document.getElementById('modalBody');
const modalPlayPause = document.getElementById('modalPlayPause');
const playPauseIcon = document.getElementById('playPauseIcon');
const videoProgressBar = document.getElementById('videoProgressBar');
const modalVideoWrapper = document.getElementById('modalVideoWrapper');
const centralStateIndicator = document.getElementById('centralStateIndicator');
const centralIcon = document.getElementById('centralIcon');

if (previewVideo) {
    previewVideo.currentTime = 0;
}

if (videoTrigger && videoModal && modalVideo) {
    videoTrigger.addEventListener('click', function() {
        videoModal.classList.remove('opacity-0', 'pointer-events-none');
        videoModal.classList.add('opacity-100');
        
        modalHeader.classList.remove('opacity-0', 'scale-95');
        modalHeader.classList.add('opacity-100', 'scale-100');
        
        modalBody.classList.remove('opacity-0', 'scale-95');
        modalBody.classList.add('opacity-100', 'scale-100');
        
        modalVideo.play();
        if (playPauseIcon) playPauseIcon.textContent = 'pause';
    });

    const closeModalFunction = function() {
        videoModal.classList.remove('opacity-100');
        videoModal.classList.add('opacity-0', 'pointer-events-none');
        
        modalHeader.classList.remove('opacity-100', 'scale-100');
        modalHeader.classList.add('opacity-0', 'scale-95');
        
        modalBody.classList.remove('opacity-100', 'scale-100');
        modalBody.classList.add('opacity-0', 'scale-95');
        
        modalVideo.pause();
    };

    document.getElementById('closeModal').addEventListener('click', closeModalFunction);
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModalFunction();
        }
    });

    const triggerPlayPause = function() {
        if (modalVideo.paused) {
            modalVideo.play();
            if (playPauseIcon) playPauseIcon.textContent = 'pause';
            showCentralIndicator('play_arrow');
        } else {
            modalVideo.pause();
            if (playPauseIcon) playPauseIcon.textContent = 'play_arrow';
            showCentralIndicator('pause');
        }
    };

    if (modalPlayPause) {
        modalPlayPause.addEventListener('click', function(e) {
            e.stopPropagation();
            triggerPlayPause();
        });
    }

    if (modalVideoWrapper) {
        modalVideoWrapper.addEventListener('click', function() {
            triggerPlayPause();
        });
    }

    function showCentralIndicator(iconName) {
        if (centralStateIndicator && centralIcon) {
            centralIcon.textContent = iconName;
            centralStateIndicator.classList.remove('opacity-0', 'scale-50', 'pointer-events-none');
            centralStateIndicator.classList.add('opacity-100', 'scale-100');

            setTimeout(() => {
                centralStateIndicator.classList.remove('opacity-100', 'scale-100');
                centralStateIndicator.classList.add('opacity-0', 'scale-50', 'pointer-events-none');
            }, 500);
        }
    }

    if (videoProgressBar) {
        modalVideo.addEventListener('timeupdate', function() {
            if (!isNaN(modalVideo.duration)) {
                const percentage = (modalVideo.currentTime / modalVideo.duration) * 100;
                videoProgressBar.value = percentage;
            }
        });

        videoProgressBar.addEventListener('input', function() {
            if (!isNaN(modalVideo.duration)) {
                const time = (videoProgressBar.value / 100) * modalVideo.duration;
                modalVideo.currentTime = time;
            }
        });
    }
}