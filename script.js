// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Expandable Project Details Logic
    const expandBtns = document.querySelectorAll('.expand-btn');
    const gridContainer = document.querySelector('.grid-container');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const details = card.querySelector('.project-details');
            
            // Toggle active classes
            details.classList.toggle('active');
            btn.classList.toggle('active');
            
            // Update button text contextually
            const isDigitalAsset = card.querySelector('h4').textContent.includes("Digital Asset");
            const openText = isDigitalAsset ? 'View Framework Structure' : 'Read Deep Dive';
            
            if (details.classList.contains('active')) {
                btn.innerHTML = `Close ${isDigitalAsset ? 'Framework' : 'Deep Dive'} <i data-lucide="chevron-up"></i>`;
            } else {
                btn.innerHTML = `${openText} <i data-lucide="chevron-down"></i>`;
            }
            
            // Re-render icons for the new HTML
            lucide.createIcons();

            // Toggle grid-container alignment
            const anyActive = Array.from(document.querySelectorAll('.project-details')).some(d => d.classList.contains('active'));
            if (gridContainer) {
                if (anyActive) {
                    gridContainer.classList.add('has-expanded');
                } else {
                    gridContainer.classList.remove('has-expanded');
                }
            }
        });
    });

    // Intersection Observer for Scroll Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Contact Me Dropdown Logic
    const contactBtn = document.querySelector('.contact-btn');
    const contactDropdown = document.querySelector('.contact-dropdown');
    
    if (contactBtn && contactDropdown) {
        contactBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            contactDropdown.classList.toggle('active');
        });

        // 点击网页其他地方，弹窗自动收起
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.contact-wrapper')) {
                contactDropdown.classList.remove('active');
            }
        });
    }
});
