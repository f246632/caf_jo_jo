// ============================================
// CAFÉ JO|JO - Gallery Lightbox
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;
    const totalImages = galleryItems.length;

    // Image sources array
    const imageSources = Array.from(galleryItems).map(item =>
        item.querySelector('img').src
    );

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling

        // Remove keyboard navigation
        document.removeEventListener('keydown', handleKeyboardNav);
    }

    function updateLightboxImage() {
        // Add fade effect
        lightboxImg.style.opacity = '0';

        setTimeout(() => {
            lightboxImg.src = imageSources[currentImageIndex];
            lightboxImg.alt = `Gallery image ${currentImageIndex + 1}`;
            lightboxImg.style.opacity = '1';
        }, 150);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
    }

    function handleKeyboardNav(e) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    // Close lightbox when clicking on the dark background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Prevent image click from closing lightbox
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Touch support for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - show next
                showNextImage();
            } else {
                // Swipe right - show previous
                showPrevImage();
            }
        }
    }

    // Preload adjacent images for smoother experience
    function preloadAdjacentImages() {
        const nextIndex = (currentImageIndex + 1) % totalImages;
        const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;

        const nextImg = new Image();
        nextImg.src = imageSources[nextIndex];

        const prevImg = new Image();
        prevImg.src = imageSources[prevIndex];
    }

    // Call preload when lightbox opens or image changes
    lightbox.addEventListener('transitionend', preloadAdjacentImages);

    // ============================================
    // GALLERY FILTERING (Optional Enhancement)
    // ============================================

    // Add stagger animation to gallery items
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });

    // Observe gallery items for animation
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });

    // ============================================
    // IMAGE LOADING ERROR HANDLING
    // ============================================

    lightboxImg.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        this.alt = 'Failed to load image';
    });

    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================

    // Add ARIA labels
    galleryItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View gallery image ${index + 1}`);
        item.setAttribute('tabindex', '0');

        // Allow keyboard navigation to open gallery
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox();
            }
        });
    });

    // Update lightbox ARIA attributes
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image gallery lightbox');

});
