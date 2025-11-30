/**
 * TR3S VISUALS PORTFOLIO - SCRIPT.JS
 * Handles navigation, galleries, and interactions
 */











document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DOM ELEMENT REFERENCES =====
    const navMenuItems = document.querySelectorAll('.nav-menu li');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const gallerySections = document.querySelectorAll('.gallery-section');
    const contentSections = document.querySelectorAll('.content-section');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const zoomOverlay = document.getElementById('zoomOverlay');
    const zoomedImage = document.querySelector('.zoomed-image');
    
    // ===== NAVIGATION FUNCTIONALITY =====











































    
    function initializeNavigation() {
        navMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Update active nav item
                navMenuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Get target section
                const target = this.getAttribute('data-target');
                
                // Hide all sections
                hideAllSections();
                
                // Show target section
                showSection(target);
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
    
    function hideAllSections() {
        gallerySections.forEach(section => section.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
    }
    
    function showSection(target) {
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll to top when switching sections
            window.scrollTo(0, 0);
        }
    }
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    function initializeMobileMenu() {
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && 
                !event.target.closest('.sidebar') && 
                !event.target.closest('.mobile-toggle') &&
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ===== GALLERY FUNCTIONALITY =====
    function initializeGalleries() {
        // Horizontal gallery arrows
        const galleryArrows = document.querySelectorAll('.gallery-arrow');
        galleryArrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const galleryContainer = this.closest('.gallery-container');
                const galleryScroll = galleryContainer.querySelector('.gallery-scroll');
                const scrollAmount = 350; // Match gallery item width + gap
                
                if (this.classList.contains('gallery-arrow-left')) {
                    galleryScroll.scrollLeft -= scrollAmount;
                } else {
                    galleryScroll.scrollLeft += scrollAmount;
                }
            });
        });
        
        // About page gallery
        initializeAboutGallery();
    }
    
    // ===== ABOUT PAGE GALLERY =====
    function initializeAboutGallery() {
        const aboutGallery = document.querySelector('.main-gallery');
        if (!aboutGallery) return;
        
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
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateGallery();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateGallery();
            });
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateGallery();
        }, 5000);
        
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
        });
        
        // Close zoom when clicking overlay
        if (zoomOverlay) {
            zoomOverlay.addEventListener('click', function(e) {
                if (e.target === this) {
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
            zoomedImage.src = imageSrc;
            zoomedImage.alt = imageAlt;
            zoomOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeZoomView() {
        if (zoomOverlay) {
            zoomOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                if (zoomedImage) {
                    zoomedImage.src = '';
                    zoomedImage.alt = '';
                }
            }, 300);
        }
    }
    
    // ===== INITIALIZATION =====
    function initializePortfolio() {
        initializeNavigation();
        initializeMobileMenu();
        initializeGalleries();
        initializeImageZoom();
        
        console.log('Tr3s Visuals Portfolio initialized successfully');
    }
    
    // Start the portfolio
    initializePortfolio();
    
    // ===== WINDOW RESIZE HANDLER =====
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }, 250);
    });



    

});
