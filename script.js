/**
 * TR3S VISUALS PORTFOLIO - SCRIPT.JS
 * Handles navigation, galleries, and interactions
 * Mobile-Optimized Version
 */






















































































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
// Image Protection Script
document.addEventListener('DOMContentLoaded', function() {
    // Prevent right-click on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevent image dragging
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable keyboard shortcuts for screenshots
    document.addEventListener('keydown', function(e) {
        // Disable Print Screen key
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }
        
        // Disable Alt+Print Screen
        if (e.altKey && e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Print Screen (some systems)
        if (e.ctrlKey && e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }
        
        // Disable Windows+Print Screen (Windows)
        if (e.key === 'PrintScreen' && e.getModifierState('Meta')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Apply protections to dynamically added images
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'IMG') {
                    node.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        return false;
                    });
                    node.setAttribute('draggable', 'false');
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});








































    
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


