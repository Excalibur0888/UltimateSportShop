document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }

    // Animated counters in stats section
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
        
        countersStarted = true;
    }

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Event listeners for testimonial controls
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = testimonialSlides.length - 1;
            }
            showSlide(newIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialSlides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialSlides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);

    // Pause auto-rotation when hovering over testimonials
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                let newIndex = currentSlide + 1;
                if (newIndex >= testimonialSlides.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            }, 5000);
        });
    }

    // Reveal elements on scroll
    const revealCards = document.querySelectorAll('.reveal-card');
    const revealImages = document.querySelectorAll('.reveal-image');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        // Reveal cards
        revealCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - revealPoint) {
                card.classList.add('visible');
            }
        });
        
        // Reveal images
        revealImages.forEach(image => {
            const imageTop = image.getBoundingClientRect().top;
            if (imageTop < windowHeight - revealPoint) {
                image.classList.add('visible');
            }
        });
        
        // Start counters when stats section is in view
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            if (statsSectionTop < windowHeight - revealPoint) {
                startCounters();
            }
        }
    }

    // Initial check for elements in view
    revealOnScroll();

    // Check for elements in view on scroll
    window.addEventListener('scroll', revealOnScroll);
}); 