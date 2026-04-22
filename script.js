/**
 * TR3S VISUALS PORTFOLIO - SCRIPT.JS
 * Handles navigation, galleries, and interactions
 * Mobile-Optimized Version — includes Short Packages section support
 */

/* ===== MOBILE SCROLL HINT ===== */
setTimeout(() => {
    if (window.innerWidth <= 768 && 'ontouchstart' in window) {
        let h = document.createElement('div');
        h.innerHTML = '← SCROLL ONLY →';
        h.style.cssText = 'position:fixed;top:30px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:30px 60px;border-radius:600px;font-family:Arial,sans-serif;font-size:14px;z-index:9999;opacity:1;transition:opacity 0.5s ease 2.5s';
        document.body.appendChild(h);
        setTimeout(() => h.style.opacity = 0, 2500);
        setTimeout(() => h.remove(), 3000);
    }
}, 500);

/* ===== IMAGE PROTECTION MODULE ===== */
(function () {
    'use strict';

    const config = {
        enableRightClickProtection: true,
        enableDragProtection: true,
        enableKeyboardProtection: true,
        enableTouchProtection: true,
        enableDynamicContentProtection: true,
        showWarningMessages: false,
        warningMessage: 'Image protection is active on this website',
        excludeImageClasses: ['allow-download', 'no-protection']
    };

    let isInitialized = false;
    let longPressTimer = null;
    let observer = null;

    function initializeImageProtection() {
        if (isInitialized) return;
        protectExistingImages();
        setupEventListeners();
        if (config.enableDynamicContentProtection) setupDynamicProtection();
        isInitialized = true;
        console.log('🛡️ Image Protection: Active');
    }

    function shouldProtectElement(element) {
        if (!element || element.tagName !== 'IMG') return false;
        for (const cls of config.excludeImageClasses) {
            if (element.classList.contains(cls)) return false;
        }
        return true;
    }

    function protectExistingImages() {
        document.querySelectorAll('img').forEach(img => {
            if (shouldProtectElement(img)) applyImageProtections(img);
        });
    }

    function applyImageProtections(imgElement) {
        if (config.enableDragProtection) {
            imgElement.setAttribute('draggable', 'false');
            imgElement.style.userDrag = 'none';
            imgElement.style.webkitUserDrag = 'none';
        }
        imgElement.classList.add('image-protected');
        if (config.enableTouchProtection) {
            imgElement.style.webkitTouchCallout = 'none';
        }
    }

    function setupEventListeners() {
        if (config.enableRightClickProtection) {
            document.addEventListener('contextmenu', handleContextMenu, { passive: false });
        }
        if (config.enableDragProtection) {
            document.addEventListener('dragstart', handleDragStart, { passive: false });
        }
        if (config.enableKeyboardProtection) {
            document.addEventListener('keydown', handleKeyDown, { passive: false });
        }
        if (config.enableTouchProtection) {
            document.addEventListener('touchstart', handleTouchStart, { passive: false });
            document.addEventListener('touchend', handleTouchEnd, { passive: false });
            document.addEventListener('touchcancel', handleTouchEnd, { passive: false });
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
        }
        document.addEventListener('selectstart', handleSelectStart, { passive: false });
        document.addEventListener('copy', handleCopy, { passive: false });
    }

    function handleContextMenu(e) {
        if (shouldProtectElement(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    function handleDragStart(e) {
        if (shouldProtectElement(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    function handleKeyDown(e) {
        const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
        if (isPrintScreen) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        if (e.key === 'F12') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    function handleTouchStart(e) {
        if (e.touches.length === 1 && shouldProtectElement(e.target)) {
            longPressTimer = setTimeout(() => {
                // long press detected — block context menu
            }, 800);
        }
    }

    function handleTouchEnd() { clearLongPressTimer(); }
    function handleTouchMove() { clearLongPressTimer(); }

    function handleSelectStart(e) {
        if (shouldProtectElement(e.target)) {
            e.preventDefault();
            return false;
        }
    }

    function handleCopy(e) {
        if (shouldProtectElement(document.activeElement)) {
            e.preventDefault();
            return false;
        }
    }

    function clearLongPressTimer() {
        if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    }

    function setupDynamicProtection() {
        observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG' && shouldProtectElement(node)) {
                            applyImageProtections(node);
                        }
                        if (node.querySelectorAll) {
                            node.querySelectorAll('img').forEach(img => {
                                if (shouldProtectElement(img)) applyImageProtections(img);
                            });
                        }
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.ImageProtection = {
        enable: initializeImageProtection,
        disable: function () {
            if (observer) { observer.disconnect(); observer = null; }
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchcancel', handleTouchEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('selectstart', handleSelectStart);
            document.removeEventListener('copy', handleCopy);
            isInitialized = false;
        },
        configure: (cfg) => Object.assign(config, cfg),
        protectImage: (img) => { if (img && img.tagName === 'IMG') applyImageProtections(img); },
        unprotectImage: (img) => {
            if (img && img.tagName === 'IMG') {
                img.setAttribute('draggable', 'true');
                img.classList.remove('image-protected');
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeImageProtection);
    } else {
        initializeImageProtection();
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !isInitialized) initializeImageProtection();
    });
})();

/* ===== MOBILE GALLERY TOUCH FIX ===== */
(function () {
    'use strict';

    const config = {
        swipeThreshold: 30,
        tapThreshold: 200,
        preventClicksDuringScroll: true
    };

    let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
    let isScrolling = false, scrollTimeout = null;

    function initializeMobileGalleryFix() {
        document.querySelectorAll('.gallery-scroll').forEach(setupGalleryTouchHandlers);
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('gallery-scroll')) setupGalleryTouchHandlers(node);
                        if (node.querySelectorAll) node.querySelectorAll('.gallery-scroll').forEach(setupGalleryTouchHandlers);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function setupGalleryTouchHandlers(gallery) {
        gallery.removeEventListener('touchstart', handleTouchStart);
        gallery.removeEventListener('touchmove', handleTouchMove);
        gallery.removeEventListener('touchend', handleTouchEnd);
        gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
        gallery.addEventListener('touchmove', handleTouchMove, { passive: true });
        gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
        gallery.style.touchAction = 'pan-y';
        gallery.style.webkitOverflowScrolling = 'touch';
    }

    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isScrolling = false;
        if (scrollTimeout) { clearTimeout(scrollTimeout); scrollTimeout = null; }
    }

    function handleTouchMove(e) {
        if (e.touches.length !== 1 || !touchStartX) return;
        const dX = Math.abs(e.touches[0].clientX - touchStartX);
        const dY = Math.abs(e.touches[0].clientY - touchStartY);
        if (dX > config.swipeThreshold && dX > dY) {
            isScrolling = true;
            if (config.preventClicksDuringScroll) {
                const gallery = e.currentTarget;
                gallery.style.pointerEvents = 'none';
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => { gallery.style.pointerEvents = 'auto'; }, 300);
            }
        }
    }

    function handleTouchEnd(e) {
        if (!touchStartX) return;
        const duration = Date.now() - touchStartTime;
        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;
        const dX = Math.abs(touchX - touchStartX);
        const dY = Math.abs(touchY - touchStartY);
        touchStartX = 0; touchStartY = 0;
        if (isScrolling) { isScrolling = false; return; }
        if (duration < config.tapThreshold && dX < config.swipeThreshold && dY < config.swipeThreshold) {
            const tapped = document.elementFromPoint(touchX, touchY);
            const imageItem = tapped ? tapped.closest('.gallery-item') : null;
            if (imageItem) setTimeout(() => imageItem.click(), 50);
        }
        isScrolling = false;
    }

    function enhanceImageClicks() {
        document.addEventListener('click', function (e) {
            const imageItem = e.target.closest('.gallery-item');
            if (imageItem && window.innerWidth <= 768) {
                e.preventDefault(); e.stopPropagation();
                const img = imageItem.querySelector('img');
                if (img) {
                    if (typeof openZoomView === 'function') {
                        openZoomView(img.src, img.alt);
                    } else {
                        showMobileImagePreview(img);
                    }
                }
            }
        }, true);
    }

    function showMobileImagePreview(img) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;touch-action:none;';
        const previewImg = document.createElement('img');
        previewImg.src = img.src;
        previewImg.alt = img.alt;
        previewImg.style.cssText = 'max-width:95%;max-height:95%;object-fit:contain;border-radius:8px;pointer-events:none;';
        overlay.appendChild(previewImg);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => document.body.removeChild(overlay));
        const closeHandler = (e) => {
            if (e.key === 'Escape') { document.body.removeChild(overlay); document.removeEventListener('keydown', closeHandler); }
        };
        document.addEventListener('keydown', closeHandler);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { initializeMobileGalleryFix(); enhanceImageClicks(); });
    } else {
        initializeMobileGalleryFix(); enhanceImageClicks();
    }

    window.addEventListener('resize', () => setTimeout(initializeMobileGalleryFix, 100));
})();

/* ===== MAIN PORTFOLIO LOGIC ===== */
document.addEventListener('DOMContentLoaded', function () {

    // ===== DOM ELEMENT REFERENCES =====
    const navMenuItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const gallerySections = document.querySelectorAll('.gallery-section');
    const contentSections = document.querySelectorAll('.content-section');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const zoomOverlay = document.getElementById('zoomOverlay');
    const zoomedImage = document.querySelector('.zoomed-image');

    // ===== STATE =====
    let currentSection = 'portraits';
    let isMobileMenuOpen = false;
    let aboutGalleryInterval;

    // ===== PACKAGES CTA — navigate to contact using JS =====
    const packagesCta = document.querySelector('.packages-cta');
    if (packagesCta) {
        packagesCta.addEventListener('click', function () {
            const contactNavItem = document.querySelector('.nav-item[data-target="contact"]') ||
                                   document.querySelector('.mobile-nav-item[data-target="contact"]');
            switchSection('contact', contactNavItem);
        });
    }

    // ===== NAVIGATION =====
    function initializeNavigation() {
        navMenuItems.forEach(item => {
            item.addEventListener('click', function () {
                switchSection(this.getAttribute('data-target'), this);
            });
        });
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function () {
                switchSection(this.getAttribute('data-target'), this);
                closeMobileMenu();
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isMobileMenuOpen) closeMobileMenu();
        });
    }

    function switchSection(target, clickedElement) {
        updateActiveNavItems(target);
        hideAllSections();
        showSection(target);
        currentSection = target;
        if (target === 'about') initializeAboutGallery();
    }

    function updateActiveNavItems(target) {
        navMenuItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-target') === target));
        mobileNavItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-target') === target));
    }

    function hideAllSections() {
        gallerySections.forEach(s => { s.classList.remove('active'); s.style.opacity = '0'; });
        contentSections.forEach(s => { s.classList.remove('active'); s.style.opacity = '0'; });
    }

    function showSection(target) {
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
            setTimeout(() => { targetSection.style.opacity = '1'; }, 50);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            resetGalleryScrolls();
        }
    }

    function resetGalleryScrolls() {
        document.querySelectorAll('.gallery-scroll').forEach(s => { s.scrollLeft = 0; });
    }

    // ===== MOBILE MENU =====
    function initializeMobileMenu() {
        if (mobileToggle) mobileToggle.addEventListener('click', e => { e.stopPropagation(); toggleMobileMenu(); });
        if (mobileClose) mobileClose.addEventListener('click', e => { e.stopPropagation(); closeMobileMenu(); });

        document.addEventListener('click', function (e) {
            if (isMobileMenuOpen && !e.target.closest('.mobile-navigation') && !e.target.closest('.mobile-toggle')) {
                closeMobileMenu();
            }
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && isMobileMenuOpen) closeMobileMenu(); });

        let swipeStartX = 0, swipeStartY = 0;
        document.addEventListener('touchstart', e => {
            swipeStartX = e.changedTouches[0].screenX;
            swipeStartY = e.changedTouches[0].screenY;
        });
        document.addEventListener('touchend', e => {
            const dX = swipeStartX - e.changedTouches[0].screenX;
            const dY = swipeStartY - e.changedTouches[0].screenY;
            if (isMobileMenuOpen && dX > 50 && Math.abs(dY) < 50) closeMobileMenu();
        });
    }

    function toggleMobileMenu() { isMobileMenuOpen ? closeMobileMenu() : openMobileMenu(); }

    function openMobileMenu() {
        if (mobileOverlay) {
            mobileOverlay.classList.add('active');
            isMobileMenuOpen = true;
            preventBodyScroll(true);
            setTimeout(() => { mobileOverlay.style.opacity = '1'; }, 10);
        }
    }

    function closeMobileMenu() {
        if (mobileOverlay) {
            mobileOverlay.style.opacity = '0';
            setTimeout(() => {
                mobileOverlay.classList.remove('active');
                isMobileMenuOpen = false;
                preventBodyScroll(false);
            }, 300);
        }
    }

    function preventBodyScroll(prevent) {
        document.body.style.overflow = prevent ? 'hidden' : '';
        document.documentElement.style.overflow = prevent ? 'hidden' : '';
    }

    // ===== GALLERIES =====
    function initializeGalleries() {
        document.querySelectorAll('.gallery-arrow').forEach(arrow => {
            arrow.addEventListener('click', function () { scrollGallery(this); });
            arrow.addEventListener('touchstart', e => e.stopPropagation());
        });
        initializeGalleryTouchSupport();
        initializeAboutGallery();
    }

    function scrollGallery(arrow) {
        const galleryContainer = arrow.closest('.gallery-container');
        const galleryScroll = galleryContainer.querySelector('.gallery-scroll');
        const scrollAmount = window.innerWidth <= 768 ? 300 : 350;
        galleryScroll.scrollBy({
            left: arrow.classList.contains('gallery-arrow-left') ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    function initializeGalleryTouchSupport() {
        document.querySelectorAll('.gallery-scroll').forEach(scroll => {
            let startX, scrollLeft;
            scroll.addEventListener('touchstart', e => {
                startX = e.touches[0].pageX - scroll.offsetLeft;
                scrollLeft = scroll.scrollLeft;
            });
            scroll.addEventListener('touchmove', e => {
                if (!startX) return;
                const x = e.touches[0].pageX - scroll.offsetLeft;
                scroll.scrollLeft = scrollLeft - (x - startX) * 2;
            });
            scroll.addEventListener('touchend', () => { startX = null; });
        });
    }

    // ===== ABOUT GALLERY =====
    function initializeAboutGallery() {
        const aboutGallery = document.querySelector('.main-gallery');
        if (!aboutGallery) return;
        if (aboutGalleryInterval) clearInterval(aboutGalleryInterval);

        const slides = aboutGallery.querySelector('.gallery-slides');
        const slideItems = aboutGallery.querySelectorAll('.gallery-slide');
        const prevBtn = aboutGallery.querySelector('.gallery-prev');
        const nextBtn = aboutGallery.querySelector('.gallery-next');
        let currentSlide = 0;
        const total = slideItems.length;

        function updateGallery() {
            slides.style.transform = `translateX(${-currentSlide * 100}%)`;
            slideItems.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
        }

        function nextSlide() { currentSlide = (currentSlide + 1) % total; updateGallery(); }
        function prevSlide() { currentSlide = (currentSlide - 1 + total) % total; updateGallery(); }

        function resetAutoAdvance() {
            if (aboutGalleryInterval) clearInterval(aboutGalleryInterval);
            aboutGalleryInterval = setInterval(nextSlide, 5000);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', e => { e.stopPropagation(); prevSlide(); resetAutoAdvance(); });
            prevBtn.addEventListener('touchstart', e => e.stopPropagation());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', e => { e.stopPropagation(); nextSlide(); resetAutoAdvance(); });
            nextBtn.addEventListener('touchstart', e => e.stopPropagation());
        }

        let tStartX = 0;
        aboutGallery.addEventListener('touchstart', e => { tStartX = e.touches[0].clientX; });
        aboutGallery.addEventListener('touchend', e => {
            const diff = tStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); resetAutoAdvance(); }
        });

        aboutGallery.addEventListener('mouseenter', () => { if (window.innerWidth > 768) clearInterval(aboutGalleryInterval); });
        aboutGallery.addEventListener('mouseleave', () => { if (window.innerWidth > 768) aboutGalleryInterval = setInterval(nextSlide, 5000); });

        aboutGalleryInterval = setInterval(nextSlide, 5000);
        updateGallery();
    }

    // ===== IMAGE ZOOM =====
    function initializeImageZoom() {
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const img = this.querySelector('img');
                if (img) openZoomView(img.src, img.alt);
            });
            item.addEventListener('touchend', function (e) {
                if (!isMobileMenuOpen) {
                    const img = this.querySelector('img');
                    if (img) { e.preventDefault(); openZoomView(img.src, img.alt); }
                }
            });
        });

        if (zoomOverlay) {
            zoomOverlay.addEventListener('click', e => {
                if (e.target === zoomOverlay || e.target.classList.contains('zoomed-image')) closeZoomView();
            });
            zoomOverlay.addEventListener('touchend', e => {
                if (e.target === zoomOverlay || e.target.classList.contains('zoomed-image')) closeZoomView();
            });
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && zoomOverlay && zoomOverlay.classList.contains('active')) closeZoomView();
        });
    }

    function openZoomView(imageSrc, imageAlt) {
        if (zoomedImage && zoomOverlay) {
            const img = new Image();
            img.onload = function () {
                zoomedImage.src = imageSrc;
                zoomedImage.alt = imageAlt;
                zoomOverlay.classList.add('active');
                preventBodyScroll(true);
            };
            img.src = imageSrc;
        }
    }

    function closeZoomView() {
        if (zoomOverlay) {
            zoomOverlay.classList.remove('active');
            preventBodyScroll(false);
            setTimeout(() => {
                if (zoomedImage) { zoomedImage.src = ''; zoomedImage.alt = ''; }
            }, 300);
        }
    }

    // ===== PERFORMANCE =====
    function initializePerformance() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        obs.unobserve(img);
                    }
                });
            });
            document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initializeGalleries();
                if (window.innerWidth > 768 && isMobileMenuOpen) closeMobileMenu();
            }, 250);
        });
    }

    // ===== ACCESSIBILITY =====
    function initializeAccessibility() {
        document.addEventListener('keydown', e => {
            if (isMobileMenuOpen) return;
            const activeGallery = document.querySelector('.gallery-section.active');
            if (activeGallery) {
                if (e.key === 'ArrowLeft') {
                    const la = activeGallery.querySelector('.gallery-arrow-left');
                    if (la) la.click();
                } else if (e.key === 'ArrowRight') {
                    const ra = activeGallery.querySelector('.gallery-arrow-right');
                    if (ra) ra.click();
                }
            }
        });

        if (mobileToggle) {
            mobileToggle.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMobileMenu(); }
            });
        }
        if (mobileClose) {
            mobileClose.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeMobileMenu(); }
            });
        }
    }

    // ===== INITIALIZATION =====
    function initializePortfolio() {
        initializeNavigation();
        initializeMobileMenu();
        initializeGalleries();
        initializeImageZoom();
        initializePerformance();
        initializeAccessibility();
        showSection(currentSection);
        console.log('Tr3s Visuals Portfolio initialized successfully');
    }

    initializePortfolio();

    window.addEventListener('error', e => console.error('Portfolio error:', e.error));
});
