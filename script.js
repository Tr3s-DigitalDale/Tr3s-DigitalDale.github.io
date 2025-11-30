/**
 * TR3S VISUALS PORTFOLIO - SCRIPT.JS
 * Handles navigation, galleries, and interactions
 * Mobile-Optimized Version
 */















































setTimeout(()=>{if(window.innerWidth<=768&&'ontouchstart'in window){let h=document.createElement('div');h.innerHTML='← Scroll →';h.style.cssText='position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:30px 60px;border-radius:60px;font-family:Arial,sans-serif;font-size:14px;z-index:9999;opacity:1;transition:opacity 0.5s ease 2.5s';document.body.appendChild(h);setTimeout(()=>h.style.opacity=0,2500);setTimeout(()=>h.remove(),3000);}},500);




































document.addEventListener('click',e=>{if(e.target.tagName==='IMG'&&!e.target.closest('.branded')){let o=document.createElement('div');o.innerHTML='<img src="images/logo.png" style="position:absolute;bottom:20px;right:20px;width:80px;height:auto;opacity:0.8;transition:opacity 0.3s;">';o.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:10000;opacity:0;transition:opacity 0.3s;';o.classList.add('branded');let i=document.createElement('img');i.src=e.target.src;i.style.cssText='max-width:90%;max-height:90%;object-fit:contain;';o.appendChild(i);o.querySelector('img[src*="logo.png"]').onload=()=>{o.style.opacity=1;};document.body.appendChild(o);o.onclick=()=>{o.style.opacity=0;setTimeout(()=>o.remove(),300);};}});































document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // ===== STATE MANAGEMENT =====
    let currentSection = 'portraits';
    let isMobileMenuOpen = false;
    let aboutGalleryInterval;

    // ===== NAVIGATION FUNCTIONALITY =====









    /**
 * Universal Image Protection Script v2.0
 * Advanced protection against image downloading and right-click actions
 * Works across all devices and browsers without disrupting user experience
 * Plug & Play - Just include this script on any webpage
 */

(function() {
    'use strict';
    
    // Configuration
    const config = {
        enableRightClickProtection: true,
        enableDragProtection: true,
        enableKeyboardProtection: true,
        enableTouchProtection: true,
        enableDynamicContentProtection: true,
        showWarningMessages: false,
        warningMessage: 'Image protection is active on this website',
        protectedImageClasses: ['protected-image', 'no-download'],
        excludeImageClasses: ['allow-download', 'no-protection']
    };
    
    // State management
    let isInitialized = false;
    let longPressTimer = null;
    let observer = null;
    
    // Main initialization function
    function initializeImageProtection() {
        if (isInitialized) return;
        
        // Apply protections to existing images
        protectExistingImages();
        
        // Set up event listeners
        setupEventListeners();
        
        // Set up dynamic content protection
        if (config.enableDynamicContentProtection) {
            setupDynamicProtection();
        }
        
        isInitialized = true;
        console.log('🛡️ Image Protection: Active');
    }
    
    // Check if element should be protected
    function shouldProtectElement(element) {
        if (element.tagName !== 'IMG') return false;
        
        // Check if image has excluded class
        for (const className of config.excludeImageClasses) {
            if (element.classList.contains(className)) return false;
        }
        
        // Check if image has protected class (if any specified)
        if (config.protectedImageClasses.length > 0) {
            for (const className of config.protectedImageClasses) {
                if (element.classList.contains(className)) return true;
            }
        }
        
        // Default: protect all images
        return true;
    }
    
    // Apply protections to existing images
    function protectExistingImages() {
        const images = document.getElementsByTagName('img');
        for (let img of images) {
            if (shouldProtectElement(img)) {
                applyImageProtections(img);
            }
        }
    }
    
    // Apply all protections to a single image
    function applyImageProtections(imgElement) {
        // Prevent dragging
        if (config.enableDragProtection) {
            imgElement.setAttribute('draggable', 'false');
            imgElement.style.userDrag = 'none';
            imgElement.style.webkitUserDrag = 'none';
        }
        
        // Add protective class for CSS styling
        imgElement.classList.add('image-protected');
        
        // Add touch action styles for mobile
        if (config.enableTouchProtection) {
            imgElement.style.touchAction = 'none';
            imgElement.style.webkitTouchCallout = 'none';
        }
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Right-click protection
        if (config.enableRightClickProtection) {
            document.addEventListener('contextmenu', handleContextMenu, { passive: false });
        }
        
        // Drag protection
        if (config.enableDragProtection) {
            document.addEventListener('dragstart', handleDragStart, { passive: false });
        }
        
        // Keyboard protection (screenshot prevention)
        if (config.enableKeyboardProtection) {
            document.addEventListener('keydown', handleKeyDown, { passive: false });
        }
        
        // Touch protection for mobile devices
        if (config.enableTouchProtection) {
            document.addEventListener('touchstart', handleTouchStart, { passive: false });
            document.addEventListener('touchend', handleTouchEnd, { passive: false });
            document.addEventListener('touchcancel', handleTouchEnd, { passive: false });
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
        }
        
        // Additional mobile protections
        document.addEventListener('selectstart', handleSelectStart, { passive: false });
        document.addEventListener('copy', handleCopy, { passive: false });
    }
    
    // Event handlers
    function handleContextMenu(e) {
        if (shouldProtectElement(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            if (config.showWarningMessages) {
                showTemporaryMessage(config.warningMessage);
            }
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
        // Print Screen key
        if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Alt + Print Screen
        if (e.altKey && (e.key === 'PrintScreen' || e.code === 'PrintScreen')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl/Cmd + Print Screen
        if ((e.ctrlKey || e.metaKey) && (e.key === 'PrintScreen' || e.code === 'PrintScreen')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Windows Key + Print Screen
        if (e.getModifierState('Meta') && (e.key === 'PrintScreen' || e.code === 'PrintScreen')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // F12 (Developer Tools) - Additional protection
        if (e.key === 'F12') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
    
    function handleTouchStart(e) {
        if (e.touches.length === 1 && shouldProtectElement(e.target)) {
            // Start long press detection
            longPressTimer = setTimeout(() => {
                if (config.showWarningMessages) {
                    showTemporaryMessage(config.warningMessage);
                }
            }, 800); // 800ms for long press
        }
    }
    
    function handleTouchEnd(e) {
        clearLongPressTimer();
    }
    
    function handleTouchMove(e) {
        // Clear long press timer if user moves finger
        if (e.touches.length === 1) {
            clearLongPressTimer();
        }
    }
    
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
    
    // Utility functions
    function clearLongPressTimer() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    }
    
    function showTemporaryMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            pointer-events: none;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 2000);
    }
    
    // Dynamic content protection using MutationObserver
    function setupDynamicProtection() {
        observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    // Check if the added node is an image
                    if (node.nodeType === 1 && node.tagName === 'IMG') {
                        if (shouldProtectElement(node)) {
                            applyImageProtections(node);
                        }
                    }
                    
                    // Check for images within added nodes
                    if (node.nodeType === 1 && node.querySelectorAll) {
                        const images = node.querySelectorAll('img');
                        images.forEach(img => {
                            if (shouldProtectElement(img)) {
                                applyImageProtections(img);
                            }
                        });
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Public API for manual control
    window.ImageProtection = {
        enable: function() {
            initializeImageProtection();
        },
        
        disable: function() {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            
            // Remove event listeners
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
            console.log('🛡️ Image Protection: Disabled');
        },
        
        configure: function(newConfig) {
            Object.assign(config, newConfig);
        },
        
        protectImage: function(imgElement) {
            if (imgElement && imgElement.tagName === 'IMG') {
                applyImageProtections(imgElement);
            }
        },
        
        unprotectImage: function(imgElement) {
            if (imgElement && imgElement.tagName === 'IMG') {
                imgElement.setAttribute('draggable', 'true');
                imgElement.classList.remove('image-protected');
            }
        }
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeImageProtection);
    } else {
        initializeImageProtection();
    }
    
    // Re-initialize when page becomes visible again (for SPA navigation)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && !isInitialized) {
            initializeImageProtection();
        }
    });
    
})();
document.addEventListener('touchstart', e=>e.target.closest('.gallery-item')&&(e.currentTarget.style.overflowX='hidden'),{passive:true});





















    /**
 * Mobile Gallery Touch Fix
 * Solves touch conflicts between horizontal scrolling and image clicks
 * Plug & Play - Just add this script to fix mobile gallery interactions
 */

(function() {
    'use strict';
    
    // Configuration
    const config = {
        swipeThreshold: 30,    // Minimum horizontal movement to count as swipe
        tapThreshold: 200,     // Maximum time for tap
        preventClicksDuringScroll: true
    };
    
    // State variables
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    let scrollTimeout = null;
    
    function initializeMobileGalleryFix() {
        console.log('📱 Mobile Gallery Touch Fix: Active');
        
        // Get all gallery scroll containers
        const galleryScrolls = document.querySelectorAll('.gallery-scroll');
        
        galleryScrolls.forEach(gallery => {
            setupGalleryTouchHandlers(gallery);
        });
        
        // Also handle dynamically added galleries
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('gallery-scroll')) {
                            setupGalleryTouchHandlers(node);
                        }
                        // Check for galleries within added nodes
                        const galleries = node.querySelectorAll ? node.querySelectorAll('.gallery-scroll') : [];
                        galleries.forEach(setupGalleryTouchHandlers);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function setupGalleryTouchHandlers(gallery) {
        // Remove any existing listeners to avoid duplicates
        gallery.removeEventListener('touchstart', handleTouchStart);
        gallery.removeEventListener('touchmove', handleTouchMove);
        gallery.removeEventListener('touchend', handleTouchEnd);
        
        // Add new listeners
        gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
        gallery.addEventListener('touchmove', handleTouchMove, { passive: true });
        gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Add CSS for better touch handling
        gallery.style.touchAction = 'pan-y';
        gallery.style.webkitOverflowScrolling = 'touch';
    }
    
    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isScrolling = false;
        
        // Clear any existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
    }
    
    function handleTouchMove(e) {
        if (e.touches.length !== 1 || !touchStartX) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = Math.abs(touchX - touchStartX);
        const deltaY = Math.abs(touchY - touchStartY);
        
        // If horizontal movement is significant, it's a scroll
        if (deltaX > config.swipeThreshold && deltaX > deltaY) {
            isScrolling = true;
            
            if (config.preventClicksDuringScroll) {
                // Temporarily disable clicks during scroll
                const gallery = e.currentTarget;
                gallery.style.pointerEvents = 'none';
                
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    gallery.style.pointerEvents = 'auto';
                }, 300);
            }
        }
    }
    
    function handleTouchEnd(e) {
        if (!touchStartX) return;
        
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;
        
        const deltaX = Math.abs(touchX - touchStartX);
        const deltaY = Math.abs(touchY - touchStartY);
        
        // Reset touch start
        touchStartX = 0;
        touchStartY = 0;
        
        // If it was a scroll, don't trigger click
        if (isScrolling) {
            isScrolling = false;
            return;
        }
        
        // Check if it's a valid tap (short duration, small movement)
        if (touchDuration < config.tapThreshold && deltaX < config.swipeThreshold && deltaY < config.swipeThreshold) {
            // Find the tapped image
            const tappedElement = document.elementFromPoint(touchX, touchY);
            const imageItem = tappedElement ? tappedElement.closest('.gallery-item') : null;
            
            if (imageItem) {
                // Trigger the image click after a small delay for better UX
                setTimeout(() => {
                    imageItem.click();
                }, 50);
            }
        }
        
        isScrolling = false;
    }
    
    // Enhanced image click handler for mobile
    function enhanceImageClicks() {
        document.addEventListener('click', function(e) {
            const imageItem = e.target.closest('.gallery-item');
            if (imageItem && window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const img = imageItem.querySelector('img');
                if (img) {
                    // Use existing zoom functionality or create mobile-friendly viewer
                    if (typeof openZoomView === 'function') {
                        openZoomView(img.src, img.alt);
                    } else {
                        // Fallback: simple image expansion
                        showMobileImagePreview(img);
                    }
                }
            }
        }, true);
    }
    
    function showMobileImagePreview(img) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: none;
        `;
        
        const previewImg = document.createElement('img');
        previewImg.src = img.src;
        previewImg.alt = img.alt;
        previewImg.style.cssText = `
            max-width: 95%;
            max-height: 95%;
            object-fit: contain;
            border-radius: 8px;
        `;
        
        overlay.appendChild(previewImg);
        document.body.appendChild(overlay);
        
        // Close on tap
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Close on escape key
        const closeHandler = function(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
                document.removeEventListener('keydown', closeHandler);
            }
        };
        document.addEventListener('keydown', closeHandler);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeMobileGalleryFix();
            enhanceImageClicks();
        });
    } else {
        initializeMobileGalleryFix();
        enhanceImageClicks();
    }
    
    // Re-initialize on resize (for orientation changes)
    window.addEventListener('resize', function() {
        setTimeout(initializeMobileGalleryFix, 100);
    });

})();
























    
    function initializeNavigation() {
        // Desktop navigation
        navMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                switchSection(target, this);
            });
        });

        // Mobile navigation
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                switchSection(target, this);
                closeMobileMenu();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    function switchSection(target, clickedElement) {
        // Update active states for both desktop and mobile
        updateActiveNavItems(target);
        
        // Hide all sections
        hideAllSections();
        
        // Show target section
        showSection(target);
        
        // Update current section
        currentSection = target;
        
        // Reset about gallery if switching to about section
        if (target === 'about') {
            initializeAboutGallery();
        }
    }

    function updateActiveNavItems(target) {
        // Update desktop nav items
        navMenuItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-target') === target);
        });

        // Update mobile nav items
        mobileNavItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-target') === target);
        });
    }

    function hideAllSections() {
        gallerySections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
        });
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
        });
    }

    function showSection(target) {
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Smooth fade in
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
            
            // Scroll to top with smooth behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Reset gallery scroll positions
            resetGalleryScrolls();
        }
    }

    function resetGalleryScrolls() {
        const galleryScrolls = document.querySelectorAll('.gallery-scroll');
        galleryScrolls.forEach(scroll => {
            scroll.scrollLeft = 0;
        });
    }

    // ===== MOBILE MENU FUNCTIONALITY =====
    function initializeMobileMenu() {
        // Mobile toggle button
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        // Mobile close button
        if (mobileClose) {
            mobileClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (isMobileMenuOpen && 
                !event.target.closest('.mobile-navigation') && 
                !event.target.closest('.mobile-toggle')) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });

        // Prevent body scroll when mobile menu is open
        function preventBodyScroll(prevent) {
            if (prevent) {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        }

        // Touch gesture support for mobile menu
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            // Swipe right to close mobile menu
            if (isMobileMenuOpen && diffX > 50 && Math.abs(diffY) < 50) {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        if (mobileOverlay) {
            mobileOverlay.classList.add('active');
            isMobileMenuOpen = true;
            preventBodyScroll(true);
            
            // Add animation class for entrance
            setTimeout(() => {
                mobileOverlay.style.opacity = '1';
            }, 10);
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
        if (prevent) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }

    // ===== GALLERY FUNCTIONALITY =====
    function initializeGalleries() {
        // Horizontal gallery arrows
        const galleryArrows = document.querySelectorAll('.gallery-arrow');
        galleryArrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                scrollGallery(this);
            });

            // Touch device optimizations
            arrow.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
        });

        // Touch swipe support for galleries
        initializeGalleryTouchSupport();

        // About page gallery
        initializeAboutGallery();
    }

    function scrollGallery(arrow) {
        const galleryContainer = arrow.closest('.gallery-container');
        const galleryScroll = galleryContainer.querySelector('.gallery-scroll');
        const scrollAmount = window.innerWidth <= 768 ? 300 : 350; // Responsive scroll amount
        
        if (arrow.classList.contains('gallery-arrow-left')) {
            galleryScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            galleryScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    function initializeGalleryTouchSupport() {
        const galleryScrolls = document.querySelectorAll('.gallery-scroll');
        
        galleryScrolls.forEach(scroll => {
            let startX;
            let scrollLeft;

            scroll.addEventListener('touchstart', function(e) {
                startX = e.touches[0].pageX - scroll.offsetLeft;
                scrollLeft = scroll.scrollLeft;
            });

            scroll.addEventListener('touchmove', function(e) {
                if (!startX) return;
                const x = e.touches[0].pageX - scroll.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed multiplier
                scroll.scrollLeft = scrollLeft - walk;
            });

            scroll.addEventListener('touchend', function() {
                startX = null;
            });
        });
    }

    // ===== ABOUT PAGE GALLERY =====
    function initializeAboutGallery() {
        const aboutGallery = document.querySelector('.main-gallery');
        if (!aboutGallery) return;

        // Clear existing interval
        if (aboutGalleryInterval) {
            clearInterval(aboutGalleryInterval);
        }

        const viewport = aboutGallery.querySelector('.gallery-viewport');
        const slides = aboutGallery.querySelector('.gallery-slides');
        const slideItems = aboutGallery.querySelectorAll('.gallery-slide');
        const prevBtn = aboutGallery.querySelector('.gallery-prev');
        const nextBtn = aboutGallery.querySelector('.gallery-next');
        
        let currentSlide = 0;
        const totalSlides = slideItems.length;

        function updateGallery() {
            const translateX = -currentSlide * 100;
            slides.style.transform = `translateX(${translateX}%)`;
            
            // Update active states
            slideItems.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateGallery();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateGallery();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                prevSlide();
                resetAutoAdvance();
            });

            // Touch support
            prevBtn.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nextSlide();
                resetAutoAdvance();
            });

            // Touch support
            nextBtn.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });
        }

        // Touch swipe support for about gallery
        let touchStartX = 0;
        aboutGallery.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        });

        aboutGallery.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].clientX;
            const diffX = touchStartX - touchEndX;

            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoAdvance();
            }
        });

        function resetAutoAdvance() {
            if (aboutGalleryInterval) {
                clearInterval(aboutGalleryInterval);
            }
            aboutGalleryInterval = setInterval(nextSlide, 5000);
        }

        // Auto-advance slides every 5 seconds
        aboutGalleryInterval = setInterval(nextSlide, 5000);

        // Pause auto-advance on hover (desktop only)
        aboutGallery.addEventListener('mouseenter', function() {
            if (aboutGalleryInterval && window.innerWidth > 768) {
                clearInterval(aboutGalleryInterval);
            }
        });

        aboutGallery.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                aboutGalleryInterval = setInterval(nextSlide, 5000);
            }
        });

        // Initialize
        updateGallery();
    }

    // ===== IMAGE ZOOM FUNCTIONALITY =====
    function initializeImageZoom() {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    openZoomView(img.src, img.alt);
                }
            });

            // Touch support for mobile
            item.addEventListener('touchend', function(e) {
                if (!isMobileMenuOpen) { // Don't zoom if menu is open
                    const img = this.querySelector('img');
                    if (img) {
                        e.preventDefault();
                        openZoomView(img.src, img.alt);
                    }
                }
            });
        });

        // Close zoom when clicking overlay
        if (zoomOverlay) {
            zoomOverlay.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('zoomed-image')) {
                    closeZoomView();
                }
            });

            // Touch support
            zoomOverlay.addEventListener('touchend', function(e) {
                if (e.target === this || e.target.classList.contains('zoomed-image')) {
                    closeZoomView();
                }
            });
        }

        // Close zoom with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
                closeZoomView();
            }
        });
    }

    function openZoomView(imageSrc, imageAlt) {
        if (zoomedImage && zoomOverlay) {
            // Preload image for smooth zoom
            const img = new Image();
            img.onload = function() {
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
                if (zoomedImage) {
                    zoomedImage.src = '';
                    zoomedImage.alt = '';
                }
            }, 300);
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initializePerformance() {
        // Lazy load images that are not in viewport
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Reinitialize galleries on resize
                initializeGalleries();
                
                // Close mobile menu on resize to desktop
                if (window.innerWidth > 768 && isMobileMenuOpen) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initializeAccessibility() {
        // Add keyboard navigation for galleries
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && !isMobileMenuOpen) {
                // Scroll gallery left
                const activeGallery = document.querySelector('.gallery-section.active');
                if (activeGallery) {
                    const leftArrow = activeGallery.querySelector('.gallery-arrow-left');
                    if (leftArrow) leftArrow.click();
                }
            } else if (e.key === 'ArrowRight' && !isMobileMenuOpen) {
                // Scroll gallery right
                const activeGallery = document.querySelector('.gallery-section.active');
                if (activeGallery) {
                    const rightArrow = activeGallery.querySelector('.gallery-arrow-right');
                    if (rightArrow) rightArrow.click();
                }
            }
        });

        // Focus management for mobile menu
        if (mobileToggle) {
            mobileToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMobileMenu();
                }
            });
        }

        if (mobileClose) {
            mobileClose.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeMobileMenu();
                }
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
        
        // Set initial section as active
        showSection(currentSection);
        
        console.log('Tr3s Visuals Portfolio initialized successfully');
    }

    // Start the portfolio
    initializePortfolio();

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('Portfolio error:', e.error);
    });

    // Service Worker registration for future PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // navigator.serviceWorker.register('/sw.js');
        });
    }

});









