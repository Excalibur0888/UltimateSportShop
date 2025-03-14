document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Сразу показываем hero-секции на главной странице и странице app
    function showHeroSectionsImmediately() {
        // Главная страница
        const homeHeroElements = document.querySelectorAll('.hero .reveal-left, .hero .reveal-right, .hero .reveal-text, .hero .reveal-image, .hero .reveal-scale, .hero .reveal-card');
        // Страница app
        const appHeroElements = document.querySelectorAll('.app-hero .reveal-left, .app-hero .reveal-right, .app-hero .reveal-text, .app-hero .reveal-image, .app-hero .reveal-scale, .app-hero .reveal-card');
        // Секция приложения на главной
        const appSectionElements = document.querySelectorAll('.app-section .reveal-left, .app-section .reveal-right, .app-section .reveal-text, .app-section .reveal-image, .app-section .reveal-scale, .app-section .reveal-card');
        
        // Добавляем класс visible ко всем элементам hero-секций
        [...homeHeroElements, ...appHeroElements, ...appSectionElements].forEach(element => {
            element.classList.add('visible');
        });
    }

    // Функция для добавления класса visible к элементам
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.reveal-text:not(.hero .reveal-text):not(.app-hero .reveal-text):not(.app-section .reveal-text), .reveal-card:not(.hero .reveal-card):not(.app-hero .reveal-card):not(.app-section .reveal-card), .reveal-image:not(.hero .reveal-image):not(.app-hero .reveal-image):not(.app-section .reveal-image), .reveal-left:not(.hero .reveal-left):not(.app-hero .reveal-left):not(.app-section .reveal-left), .reveal-right:not(.hero .reveal-right):not(.app-hero .reveal-right):not(.app-section .reveal-right), .reveal-scale:not(.hero .reveal-scale):not(.app-hero .reveal-scale):not(.app-section .reveal-scale)');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Показываем hero-секции сразу
    showHeroSectionsImmediately();
    
    // Обработчик скролла для остальных элементов
    window.addEventListener('scroll', handleScrollAnimation);
    // Запускаем проверку при загрузке страницы
    handleScrollAnimation();

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Enhanced Counter Animation
    function animateCounter(element, target, duration = 2000, decimals = 0) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            let currentValue = start + (target - start) * easedProgress;
            
            // Format with decimals if needed
            if (decimals > 0) {
                element.textContent = currentValue.toFixed(decimals);
            } else {
                element.textContent = Math.round(currentValue).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Observer for App Statistics
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = document.querySelectorAll('.stat-item .stat-number');
                
                statItems.forEach(item => {
                    const target = parseFloat(item.getAttribute('data-count'));
                    const decimals = target % 1 === 0 ? 0 : 1;
                    animateCounter(item, target, 2000, decimals);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe stats section if it exists
    const statsSection = document.querySelector('.app-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Reviews Slider Functionality
    const reviewSlides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.review-prev');
    const nextBtn = document.querySelector('.review-next');
    
    if (!reviewSlides.length) return; // Exit if no slides found
    
    let currentSlide = 0;
    
    // Initialize the slider
    function initSlider() {
        reviewSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        reviewSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % reviewSlides.length;
        initSlider();
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + reviewSlides.length) % reviewSlides.length;
        initSlider();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            initSlider();
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        reviewsSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        reviewsSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Initialize the slider
    initSlider();
}); 