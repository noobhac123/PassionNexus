document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Load Header and Footer Components ---
    const loadComponent = (selector, url) => {
        const element = document.querySelector(selector);
        if (element) {
            fetch(url)
                .then(response => response.ok ? response.text() : Promise.reject('Component not found'))
                .then(data => {
                    element.innerHTML = data;
                    if (selector === '#header-placeholder') {
                        handleMobileMenu();
                        setActiveNavLink();
                    }
                    if (selector === '#footer-placeholder') {
                        handleModals();
                    }
                })
                .catch(error => console.error(`Error loading ${url}:`, error));
        }
    };

    loadComponent('#header-placeholder', '/_includes/header.html');
    loadComponent('#footer-placeholder', '/_includes/footer.html');

    // --- 2. Mobile Menu Toggle ---
    const handleMobileMenu = () => {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const isExpanded = navLinks.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isExpanded);
            });
        }
    };
    
    // --- 3. Modal Handling (Submit Story) ---
    const handleModals = () => {
        const modal = document.getElementById('submit-story-modal');
        const openModalBtns = document.querySelectorAll('#submit-story-btn-footer');
        const closeModalBtn = document.querySelector('.close-modal-btn');

        if (modal) {
            const openModal = () => {
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                document.body.classList.add('modal-active');
            };

            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.classList.remove('modal-active');
                }, 300);
            };

            openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
            
            if(closeModalBtn) {
                 closeModalBtn.addEventListener('click', closeModal);
            }

            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        }
    };

    // --- 4. Age Verification Modal ---
    const handleAgeVerification = () => {
        const ageModal = document.getElementById('age-verification-modal');
        if (!ageModal) return;

        const hasVerified = sessionStorage.getItem('ageVerified') === 'true';

        if (!hasVerified) {
            ageModal.style.display = 'flex';
            setTimeout(() => { ageModal.style.opacity = '1'; }, 10);
            document.body.classList.add('modal-active');
        }

        const confirmYesBtn = document.getElementById('age-confirm-yes');
        const confirmNoBtn = document.getElementById('age-confirm-no');

        if(confirmYesBtn) {
            confirmYesBtn.addEventListener('click', () => {
                sessionStorage.setItem('ageVerified', 'true');
                ageModal.style.opacity = '0';
                setTimeout(() => {
                    ageModal.style.display = 'none';
                    document.body.classList.remove('modal-active');
                }, 300);
            });
        }

        if(confirmNoBtn) {
            confirmNoBtn.addEventListener('click', () => {
                const directLink = 'https://maintaintournamentslick.com/tne69h9kgh?key=c9b66e4fd0c3cb03a3e22667f5d60e65';
                window.location.href = directLink;
            });
        }
    };
    
    // --- 5. Scroll to Top Button ---
    const handleScrollToTop = () => {
        const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
        if (!scrollToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // --- 6. Set Active Navigation Link ---
    const setActiveNavLink = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        const currentPage = window.location.pathname;
        const homePage = '/index.html';

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPage || (currentPage === '/' && linkPath === homePage)) {
                link.classList.add('active-nav-link');
            }
        });
    };

    // --- 7. Handle Dummy Form Submissions ---
    const handleDummyForms = () => {
        const mainNewsletterForm = document.getElementById('main-newsletter-form');
        if (mainNewsletterForm) {
            mainNewsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newsletterSection = document.querySelector('.newsletter-section .container');
                if (newsletterSection) {
                    newsletterSection.innerHTML = `
                        <h2>Thank You!</h2>
                        <p>You've been successfully subscribed to our newsletter.</p>
                    `;
                }
            });
        }

        const storyForm = document.getElementById('dummy-story-form');
        if (storyForm) {
            storyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitButton = storyForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Submitted! Thank You.';
                submitButton.disabled = true;

                setTimeout(() => {
                    const modal = document.getElementById('submit-story-modal');
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.classList.remove('modal-active');
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        storyForm.reset();
                    }, 300);
                }, 2000);
            });
        }
    };

    // --- 8. Character Counter for Story Form ---
    const handleStoryCharCount = () => {
        const storyText = document.getElementById('story-text');
        const charCount = document.getElementById('story-char-count');
        if (storyText && charCount) {
            const minLength = storyText.getAttribute('minlength') || 600;
            storyText.addEventListener('input', () => {
                const currentLength = storyText.value.length;
                charCount.textContent = `${currentLength} / ${minLength} characters`;
                if (currentLength >= minLength) {
                    charCount.style.color = 'var(--accent-cyan)';
                } else {
                    charCount.style.color = 'var(--secondary-text-color)';
                }
            });
        }
    };
    
    // --- 9. Special Offer Popunder Button (DIRECT URL METHOD - MOST RELIABLE) ---
    const handleSpecialOfferButton = () => {
        const popunderBtn = document.getElementById('special-offer-btn');
        if (!popunderBtn) return; 

        // Adsterra का URL जिसे हम खोलना चाहते हैं
        const popunderUrl = 'https://maintaintournamentslick.com/k6p5y9a9?key=e8d9b89e2f97480a49c666f7f6311d0d';

        const setButtonToActivated = () => {
            popunderBtn.textContent = 'Offer Activated!';
            popunderBtn.disabled = true;
            popunderBtn.style.cursor = 'not-allowed';
            popunderBtn.style.opacity = '0.7';
        };

        if (sessionStorage.getItem('popunderActivated') === 'true') {
            setButtonToActivated();
        } else {
            popunderBtn.addEventListener('click', () => {
                if (sessionStorage.getItem('popunderActivated') === 'true') {
                    return;
                }

                // सीधे विज्ञापन का URL खोलें। यह सबसे भरोसेमंद तरीका है।
                const popunderWindow = window.open(popunderUrl, '_blank');
                
                if (popunderWindow) {
                    popunderWindow.blur();
                    window.focus();
                } else {
                    // अगर पॉप-अप ब्लॉक हो जाता है, तो यूजर को उसी टैब में रीडायरेक्ट कर दें।
                    // यह एक बैकअप प्लान है।
                    console.log("Pop-up was blocked. Redirecting in the same tab as a fallback.");
                    window.location.href = popunderUrl;
                }

                sessionStorage.setItem('popunderActivated', 'true');
                setButtonToActivated();
            });
        }
    };
    
    // --- 10. Native Ad Placement on Homepage ---
    const handleNativeAdPlacement = () => {
        const adWrapper = document.getElementById('native-ad-wrapper');
        if (!adWrapper) return;

        const mobileTarget = document.getElementById('native-ad-target-mobile');
        const desktopTarget = document.getElementById('native-ad-target-desktop');

        function moveNativeAd() {
            if (window.innerWidth >= 992) { 
                if (desktopTarget && adWrapper) {
                    desktopTarget.appendChild(adWrapper);
                    adWrapper.style.display = 'block';
                }
            } else {
                if (mobileTarget && adWrapper) {
                    mobileTarget.appendChild(adWrapper);
                    adWrapper.style.display = 'block';
                }
            }
        }

        moveNativeAd();
        window.addEventListener('resize', moveNativeAd);
    };

    // --- Initialize all functions ---
    handleAgeVerification();
    handleScrollToTop();
    handleDummyForms();
    handleStoryCharCount();
    handleSpecialOfferButton(); 
    handleNativeAdPlacement();
});