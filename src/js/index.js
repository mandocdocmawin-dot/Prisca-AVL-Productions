const videoTrigger = document.getElementById('videoTrigger');
const videoModal = document.getElementById('videoModal');
const modalHeader = document.getElementById('modalHeader');
const modalBody = document.getElementById('modalBody');

if (videoTrigger && videoModal) {
    // Guards against the spam-click race condition:
    // - isModalOpen: once the modal is open, ignore further clicks on the
    //   trigger so the open animation/play() doesn't keep re-firing.
    // - modalCloseRequested: if close() is called while a play() Promise is
    //   still pending, we remember that and pause again once play() resolves,
    //   instead of letting a "late" play() silently resume the video after close.
    let isModalOpen = false;
    let modalCloseRequested = false;

    videoTrigger.addEventListener('click', function() {
        if (isModalOpen) return; // already open — ignore repeat/spam clicks
        isModalOpen = true;
        modalCloseRequested = false;

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

        const modalVideo = videoModal.querySelector('video');
        if (modalVideo) {
            const playPromise = modalVideo.play();
            // play() is async; if close() ran before it resolved, undo it.
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.then(() => {
                    if (modalCloseRequested) {
                        modalVideo.pause();
                        modalVideo.currentTime = 0;
                    }
                }).catch(() => {});
            }
        }

        const modalControls = document.getElementById('modalVideoControls');
        if (modalControls) {
            modalControls.classList.remove('opacity-0', 'pointer-events-none');
            modalControls.classList.add('opacity-100');
        }
    });

    const closeModalFunction = function() {
        if (!isModalOpen) return; // already closed — ignore repeat/spam clicks
        isModalOpen = false;
        modalCloseRequested = true;

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
        
        const modalVideo = videoModal.querySelector('video');
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
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

    // Escape key: if in fullscreen, let the browser exit fullscreen first;
    // otherwise close the modal.
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape') return;
        if (videoModal.classList.contains('pointer-events-none')) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
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

    function setActiveLink(targetLink) {
        navLinks.forEach(item => {
            item.classList.remove(...activeClasses);
            item.classList.add(...inactiveClasses);
        });

        if (targetLink) {
            targetLink.classList.remove(...inactiveClasses);
            targetLink.classList.add(...activeClasses);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setActiveLink(this);
        });
    });

    // ---- Scroll-spy: auto-update active nav link based on section in view ----
    const sectionMap = []; // { id, section, link }
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const section = document.getElementById(href.slice(1));
        if (section) sectionMap.push({ section, link });
    });

    if (sectionMap.length && 'IntersectionObserver' in window) {
        let scrollSpyEnabled = true;

        const observer = new IntersectionObserver((entries) => {
            if (!scrollSpyEnabled) return;

            // Pick the entry that is most visible in the viewport right now
            let mostVisible = null;
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
                    mostVisible = entry;
                }
            });

            if (mostVisible) {
                const match = sectionMap.find(item => item.section === mostVisible.target);
                if (match) setActiveLink(match.link);
            }
        }, {
            // Treat the section as "active" once it crosses the middle band of the viewport
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        });

        sectionMap.forEach(item => observer.observe(item.section));

        // Briefly disable scroll-spy right after a manual click so the clicked
        // link stays highlighted during the smooth-scroll animation, instead of
        // flickering to whatever section happens to be passing by.
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                scrollSpyEnabled = false;
                clearTimeout(window.__scrollSpyResumeTimer);
                window.__scrollSpyResumeTimer = setTimeout(() => {
                    scrollSpyEnabled = true;
                }, 800);
            });
        });
    }
});

// Custom Modal Video Controls (play/pause, progress bar, fullscreen only)
(function () {
    const video = document.getElementById('modalVideo');
    const playPauseBtn = document.getElementById('modalPlayPause');
    const playPauseIcon = document.getElementById('modalPlayPauseIcon');
    const progress = document.getElementById('modalVideoProgress');
    const fullscreenBtn = document.getElementById('modalFullscreen');
    const videoWrapper = document.getElementById('modalVideoWrapper');
    const videoModalEl = document.getElementById('videoModal');

    if (!video) return;

    function setPlayIcon(isPlaying) {
        if (playPauseIcon) playPauseIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
    }

    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            togglePlay();
        });
    }

    // Click directly on the video to toggle play/pause
    video.addEventListener('click', function (e) {
        e.stopPropagation();
        togglePlay();
    });

    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (videoWrapper && videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
            // iOS Safari fallback
            video.webkitEnterFullscreen();
        }
    }

    // Spacebar toggles play/pause, "F" toggles fullscreen, when the modal is open
    document.addEventListener('keydown', function (e) {
        if (!videoModalEl || videoModalEl.classList.contains('pointer-events-none')) return;
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            togglePlay();
        } else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }
    });

    video.addEventListener('play', function () { setPlayIcon(true); });
    video.addEventListener('pause', function () { setPlayIcon(false); });

    if (progress) {
        video.addEventListener('timeupdate', function () {
            if (!video.duration) return;
            const pct = (video.currentTime / video.duration) * 100;
            progress.value = pct;
            progress.style.background = `linear-gradient(to right, var(--color-primary, #fff) ${pct}%, rgba(255,255,255,0.3) ${pct}%)`;
        });

        progress.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        progress.addEventListener('input', function () {
            if (!video.duration) return;
            video.currentTime = (progress.value / 100) * video.duration;
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleFullscreen();
        });
    }

    // Ensure controls remain clickable/interactive after exiting fullscreen.
    // Some browsers leave stale pointer-events/z-index state on the wrapper
    // after the fullscreen element is removed from the top layer.
    document.addEventListener('fullscreenchange', function () {
        if (!document.fullscreenElement && videoWrapper) {
            videoWrapper.style.pointerEvents = 'auto';
            // Force a reflow so the browser re-evaluates hit-testing on the wrapper
            void videoWrapper.offsetHeight;
        }
    });

    // ---- Auto-hide controls + cursor on inactivity (like YouTube/Netflix) ----
    const controlsBar = document.getElementById('modalVideoControls');
    const HIDE_DELAY = 2500; // ms of inactivity before hiding
    let idleTimer = null;

    function showControls() {
        if (controlsBar) {
            controlsBar.classList.remove('opacity-0', 'pointer-events-none');
            controlsBar.classList.add('opacity-100');
        }
        if (videoWrapper) videoWrapper.style.cursor = 'auto';
    }

    function hideControls() {
        // Don't hide while paused — only auto-hide during active playback
        if (video.paused) return;
        if (controlsBar) {
            controlsBar.classList.remove('opacity-100');
            controlsBar.classList.add('opacity-0', 'pointer-events-none');
        }
        if (videoWrapper) videoWrapper.style.cursor = 'none';
    }

    function resetIdleTimer() {
        showControls();
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(hideControls, HIDE_DELAY);
    }

    if (videoWrapper) {
        videoWrapper.addEventListener('mousemove', resetIdleTimer);
        videoWrapper.addEventListener('mouseenter', resetIdleTimer);
        videoWrapper.addEventListener('mouseleave', function () {
            if (idleTimer) clearTimeout(idleTimer);
            hideControls();
        });
    }

    // When playback starts, kick off the idle timer; when paused, always show controls
    video.addEventListener('play', resetIdleTimer);
    video.addEventListener('pause', function () {
        if (idleTimer) clearTimeout(idleTimer);
        showControls();
    });
})();