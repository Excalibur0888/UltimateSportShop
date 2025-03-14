// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        // Ensure product.id is a number
        product.id = parseInt(product.id);
        
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(productId) {
        // Ensure productId is a number
        productId = parseInt(productId);
        
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        // Ensure productId is a number
        productId = parseInt(productId);
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
        }
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

// Initialize cart
const cart = new Cart();

// Sample product data - expanded with 24 products
const products = [
    // Shoes Category
    {
        id: 1,
        name: "Professional Running Shoes",
        price: 4999,
        category: "shoes",
        brand: "velocity",
        image: "/images/shoes1.jpg",
        description: "Professional running shoes with advanced cushioning"
    },
    {
        id: 2,
        name: "Sports Training Shoes",
        price: 3999,
        category: "shoes",
        brand: "sportex",
        image: "/images/shoes2.jpg",
        description: "Versatile training shoes for multiple sports"
    },
    {
        id: 3,
        name: "Tennis Court Shoes",
        price: 5499,
        category: "shoes",
        brand: "athletica",
        image: "/images/shoes3.jpg",
        description: "Specialized shoes for tennis court performance"
    },
    {
        id: 4,
        name: "Premium Football",
        price: 2499,
        category: "equipment",
        brand: "velocity",
        image: "/images/ball1.jpg",
        description: "Professional match football with superior durability"
    },
    {
        id: 5,
        name: "Professional Basketball",
        price: 3499,
        category: "equipment",
        brand: "sportex",
        image: "/images/ball2.jpg",
        description: "Official size basketball with enhanced grip"
    },
    {
        id: 6,
        name: "Tennis Racket Pro",
        price: 3999,
        category: "tennis",
        brand: "athletica",
        image: "/images/racket1.jpg",
        description: "Professional tennis racket with carbon fiber frame"
    },
    {
        id: 7,
        name: "Badminton Racket Elite",
        price: 2799,
        category: "equipment",
        brand: "velocity",
        image: "/images/racket2.jpg",
        description: "Professional badminton racket for competitive play"
    },
    {
        id: 8,
        name: "Competition Volleyball",
        price: 1999,
        category: "equipment",
        brand: "sportex",
        image: "/images/ball3.jpg",
        description: "Tournament-grade volleyball"
    },
    {
        id: 9,
        name: "Basketball Pro Shoes",
        price: 6499,
        category: "shoes",
        brand: "athletica",
        image: "/images/shoes4.jpg",
        description: "High-performance basketball shoes with ankle support"
    },
    {
        id: 10,
        name: "Professional Boxing Gloves",
        price: 3299,
        category: "equipment",
        brand: "velocity",
        image: "/images/gloves1.jpg",
        description: "Premium boxing gloves for training and competition"
    },
    {
        id: 11,
        name: "Premium Yoga Mat",
        price: 1499,
        category: "equipment",
        brand: "sportex",
        image: "/images/yoga1.jpg",
        description: "Extra thick yoga mat with non-slip surface"
    },
    {
        id: 12,
        name: "Adjustable Dumbbells Set",
        price: 7999,
        category: "equipment",
        brand: "athletica",
        image: "/images/weights1.jpg",
        description: "Versatile dumbbell set with adjustable weights"
    },
    {
        id: 13,
        name: "Cricket Match Ball",
        price: 1999,
        category: "equipment",
        brand: "velocity",
        image: "/images/ball4.jpg",
        description: "Premium leather cricket ball for matches"
    },
    {
        id: 14,
        name: "Table Tennis Balls (Pack of 6)",
        price: 899,
        category: "equipment",
        brand: "sportex",
        image: "/images/ball5.jpg",
        description: "Tournament-grade table tennis balls"
    },
    {
        id: 15,
        name: "Golf Balls Premium (Pack of 12)",
        price: 3999,
        category: "equipment",
        brand: "athletica",
        image: "/images/ball6.jpg",
        description: "Long-distance golf balls with precision control"
    },
    {
        id: 16,
        name: "Handball Competition",
        price: 2599,
        category: "equipment",
        brand: "velocity",
        image: "/images/ball7.jpg",
        description: "Official size handball for competitions"
    },
    {
        id: 17,
        name: "Tennis Racket Pro",
        price: 7999,
        category: "tennis",
        brand: "sportex",
        image: "/images/racket1.jpg",
        description: "Professional tennis racket with carbon fiber frame"
    },
    {
        id: 18,
        name: "Tennis Balls (Pack of 3)",
        price: 899,
        category: "tennis",
        brand: "athletica",
        image: "/images/ball8.jpg",
        description: "Tournament-grade tennis balls"
    },
    {
        id: 19,
        name: "Tennis Wristbands",
        price: 599,
        category: "tennis",
        brand: "velocity",
        image: "/images/racket3.jpg",
        description: "Absorbent wristbands for tennis players"
    },
    {
        id: 20,
        name: "Tennis Net Professional",
        price: 12999,
        category: "tennis",
        brand: "sportex",
        image: "/images/racket4.jpg",
        description: "Regulation size tennis net for courts"
    },
    {
        id: 21,
        name: "Tennis Racket Beginner",
        price: 3999,
        category: "tennis",
        brand: "athletica",
        image: "/images/racket5.jpg",
        description: "Lightweight racket ideal for beginners"
    },
    {
        id: 22,
        name: "Tennis Bag Pro",
        price: 4999,
        category: "tennis",
        brand: "velocity",
        image: "/images/racket6.jpg",
        description: "Spacious bag for tennis equipment"
    },
    {
        id: 23,
        name: "Tennis Strings Premium",
        price: 1499,
        category: "tennis",
        brand: "sportex",
        image: "/images/racket7.jpg",
        description: "High-tension strings for professional rackets"
    },
    {
        id: 24,
        name: "Tennis Court Shoes Elite",
        price: 6499,
        category: "shoes",
        brand: "athletica",
        image: "/images/shoes5.jpg",
        description: "Advanced shoes designed for tennis courts"
    }
];

// Catalog page functionality
class CatalogManager {
    constructor(products) {
        this.allProducts = products;
        this.filteredProducts = [...products];
        this.currentPage = 1;
        this.productsPerPage = 6;
        this.filters = {
            categories: [],
            brands: [],
            priceMin: null,
            priceMax: null
        };
        
        // Добавляем numericPrice для всех продуктов
        this.allProducts.forEach(product => {
            product.numericPrice = Number(product.price);
        });
    }

    // Синхронизируем данные из HTML с JavaScript
    syncProductsWithDOM() {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;
        
        const productCards = productsGrid.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const addToCartBtn = card.querySelector('.add-to-cart');
            if (!addToCartBtn) return;
            
            const productId = parseInt(addToCartBtn.getAttribute('data-id'));
            const productInJS = this.allProducts.find(p => p.id === productId);
            
            if (productInJS) {
                // Получаем данные из DOM
                const titleElement = card.querySelector('.product-title');
                const priceElement = card.querySelector('.product-price');
                
                if (titleElement && priceElement) {
                    const titleInDOM = titleElement.textContent;
                    const priceInDOM = priceElement.textContent;
                    
                    // Обновляем название в JavaScript, если оно отличается
                    if (productInJS.name !== titleInDOM) {
                        productInJS.name = titleInDOM;
                    }
                    
                    // Обновляем цену в JavaScript, если она отличается
                    // Удаляем все нецифровые символы и преобразуем в число
                    const numericPrice = parseInt(priceInDOM.replace(/[^\d]/g, ''));
                    if (productInJS.price !== numericPrice) {
                        productInJS.price = numericPrice;
                    }
                    
                    // Всегда устанавливаем numericPrice как число
                    productInJS.numericPrice = numericPrice;
                    
                    // Определяем категорию на основе названия и изображения
                    if (titleInDOM.toLowerCase().includes('shoe') || 
                        titleInDOM.toLowerCase().includes('boot')) {
                        productInJS.category = 'shoes';
                    } else if (titleInDOM.toLowerCase().includes('tennis') || 
                               titleInDOM.toLowerCase().includes('racket')) {
                        productInJS.category = 'tennis';
                    } else {
                        productInJS.category = 'equipment';
                    }
                }
            }
        });
        
        // Дополнительная проверка, что все цены являются числами
        this.allProducts.forEach(product => {
            if (typeof product.numericPrice !== 'number' || isNaN(product.numericPrice)) {
                product.numericPrice = Number(product.price);
            }
        });
    }

    // Apply filters and return filtered products
    applyFilters() {
        // Сначала сбрасываем фильтрованные продукты до всех продуктов
        this.filteredProducts = [...this.allProducts];
        
        // Применяем фильтр по категориям
        if (this.filters.categories.length > 0) {
            this.filteredProducts = this.filteredProducts.filter(product => 
                this.filters.categories.includes(product.category)
            );
        }
        
        // Применяем фильтр по брендам
        if (this.filters.brands.length > 0) {
            this.filteredProducts = this.filteredProducts.filter(product => 
                this.filters.brands.includes(product.brand)
            );
        }
        
        // Применяем фильтр по минимальной цене
        if (this.filters.priceMin !== null) {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.numericPrice >= this.filters.priceMin
            );
        }
        
        // Применяем фильтр по максимальной цене
        if (this.filters.priceMax !== null) {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.numericPrice <= this.filters.priceMax
            );
        }
        
        // Reset to first page when filters change
        this.currentPage = 1;
        
        // Обновляем отображение
        this.updateVisibleProducts();
        this.updateProductCount();
        this.updatePagination();
    }
    
    // Sort products
    sortProducts(sortBy) {
        // Создаем копию массива для сортировки
        const sortedProducts = [...this.filteredProducts];
        
        // Преобразуем все цены в числа перед сортировкой
        sortedProducts.forEach(product => {
            if (typeof product.numericPrice !== 'number') {
                product.numericPrice = Number(product.price);
            }
        });
        
        // Сортируем товары
        switch(sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => {
                    return a.numericPrice - b.numericPrice;
                });
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => {
                    return b.numericPrice - a.numericPrice;
                });
                break;
            case 'newest':
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
            default: // featured
                sortedProducts.sort((a, b) => a.id - b.id);
                break;
        }
        
        // Обновляем отфильтрованные товары
        this.filteredProducts = sortedProducts;
        
        // Обновляем отображение
        this.updateVisibleProducts();
    }
    
    // Get products for current page
    getCurrentPageProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        return this.filteredProducts.slice(startIndex, endIndex);
    }
    
    // Update visible products based on filters and pagination
    updateVisibleProducts() {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;
        
        const currentProducts = this.getCurrentPageProducts();
        
        // Скрываем все товары
        const allProductCards = productsGrid.querySelectorAll('.product-card');
        allProductCards.forEach(card => {
            card.style.display = 'none';
        });
        
        if (currentProducts.length === 0) {
            // If no products match filters, show a message
            let noProductsEl = productsGrid.querySelector('.no-products');
            if (!noProductsEl) {
                noProductsEl = document.createElement('div');
                noProductsEl.className = 'no-products';
                noProductsEl.innerHTML = `
                    <h3>No products found</h3>
                    <p>Try changing your filters or search criteria</p>
                `;
                productsGrid.appendChild(noProductsEl);
            } else {
                noProductsEl.style.display = 'block';
            }
            return;
        }
        
        // Hide no products message if it exists
        const noProductsEl = productsGrid.querySelector('.no-products');
        if (noProductsEl) {
            noProductsEl.style.display = 'none';
        }
        
        // Создаем карту DOM-элементов по ID товара
        const cardMap = {};
        allProductCards.forEach(card => {
            const addToCartBtn = card.querySelector('.add-to-cart');
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.getAttribute('data-id'));
                cardMap[productId] = card;
            }
        });
        
        // Показываем только карточки товаров для текущей страницы
        currentProducts.forEach(product => {
            const card = cardMap[product.id];
            if (card) {
                // Добавляем атрибуты для отладки
                card.setAttribute('data-category', product.category);
                card.setAttribute('data-id', product.id);
                card.setAttribute('data-price', product.numericPrice);
                
                // Показываем карточку
                card.style.display = 'block';
            }
        });
    }
    
    // Update pagination
    updatePagination() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        pagination.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = 'page-number' + (i === this.currentPage ? ' active' : '');
            pageLink.textContent = i;
            
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToPage(i);
            });
            
            pagination.appendChild(pageLink);
        }
        
        // Ensure pagination is always visible, even with one page
        pagination.style.display = 'flex';
    }
    
    // Go to specific page
    goToPage(pageNumber) {
        this.currentPage = pageNumber;
        
        // Обновляем видимость товаров
        this.updateVisibleProducts();
        this.updateProductCount();
        
        // Update active class in pagination
        const paginationLinks = document.querySelectorAll('.pagination .page-number');
        paginationLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.textContent) === pageNumber) {
                link.classList.add('active');
            }
        });
        
        // Прокручиваем к верху списка товаров
        const productsSection = document.querySelector('.catalog-products');
        if (productsSection) {
            window.scrollTo({
                top: productsSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Update product count display
    updateProductCount() {
        const productCount = document.querySelector('.product-count');
        if (productCount) {
            const start = (this.currentPage - 1) * this.productsPerPage + 1;
            const end = Math.min(start + this.productsPerPage - 1, this.filteredProducts.length);
            
            if (this.filteredProducts.length === 0) {
                productCount.textContent = `No products found`;
            } else {
                productCount.textContent = `Showing ${start}-${end} of ${this.filteredProducts.length} products`;
            }
        }
    }
    
    // Setup event listeners for Add to Cart buttons
    setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                const product = this.allProducts.find(p => p.id === productId);
                
                if (product) {
                    cart.addItem(product);
                    
                    // Show added to cart message
                    button.textContent = 'Added to Cart';
                    button.classList.add('added');
                    
                    setTimeout(() => {
                        button.textContent = 'Add to Cart';
                        button.classList.remove('added');
                    }, 2000);
                }
            });
        });
    }
    
    // Initialize catalog page
    init() {
        // Синхронизируем данные из HTML с JavaScript
        this.syncProductsWithDOM();
        
        // Проверяем, что у всех товаров есть правильные категории и бренды
        const categories = [...new Set(this.allProducts.map(p => p.category))];
        const brands = [...new Set(this.allProducts.map(p => p.brand))];
        
        // Проверяем, что все цены являются числами и добавляем numericPrice
        this.allProducts.forEach(product => {
            if (typeof product.price !== 'number') {
                product.price = Number(product.price);
            }
            product.numericPrice = product.price;
        });
        
        // Setup filter event listeners
        this.setupFilterListeners();
        
        // Setup sort select
        this.setupSortSelect();
        
        // Setup Add to Cart buttons for existing products
        this.setupAddToCartButtons();
        
        // Initial setup of visible products
        this.currentPage = 1;
        this.updateVisibleProducts();
        this.updateProductCount();
        
        // Setup pagination
        this.setupPagination();
        
        // Ensure pagination is visible
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.style.display = 'flex';
        }
        
        // Добавляем кнопки для сброса фильтров
        const resetFiltersButton = document.querySelector('.reset-filters');
        if (resetFiltersButton) {
            resetFiltersButton.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    }
    
    // Setup filter event listeners
    setupFilterListeners() {
        // Category checkboxes
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Получаем все отмеченные категории
                this.filters.categories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                    .map(input => input.value);
                
                this.applyFilters();
            });
        });
        
        // Brand checkboxes
        const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Получаем все отмеченные бренды
                this.filters.brands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
                    .map(input => input.value);
                
                this.applyFilters();
            });
        });
        
        // Price range inputs
        const minPriceInput = document.querySelector('.price-range input:first-child');
        const maxPriceInput = document.querySelector('.price-range input:last-child');
        
        if (minPriceInput && maxPriceInput) {
            // Debounce function to prevent too many updates
            const debounce = (func, delay) => {
                let timeoutId;
                return function(...args) {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                    }, delay);
                };
            };
            
            // Apply price filter with debounce
            const applyPriceFilter = debounce(() => {
                this.filters.priceMin = minPriceInput.value ? parseInt(minPriceInput.value) : null;
                this.filters.priceMax = maxPriceInput.value ? parseInt(maxPriceInput.value) : null;
                
                this.applyFilters();
            }, 300);
            
            minPriceInput.addEventListener('input', applyPriceFilter);
            maxPriceInput.addEventListener('input', applyPriceFilter);
            
            // Validate price range (min should not be greater than max)
            minPriceInput.addEventListener('change', () => {
                if (maxPriceInput.value && parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
                    maxPriceInput.value = minPriceInput.value;
                }
                applyPriceFilter();
            });
            
            maxPriceInput.addEventListener('change', () => {
                if (minPriceInput.value && parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
                    minPriceInput.value = maxPriceInput.value;
                }
                applyPriceFilter();
            });
        }
        
        // Remove Apply Filters button functionality as it's no longer needed
        const applyFiltersButton = document.querySelector('.apply-filters');
        if (applyFiltersButton) {
            applyFiltersButton.style.display = 'none'; // Hide the button
        }
        
        // Add Reset Filters button functionality
        const resetFiltersButton = document.querySelector('.reset-filters');
        if (resetFiltersButton) {
            resetFiltersButton.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    }
    
    // Setup sort select
    setupSortSelect() {
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.sortProducts(sortSelect.value);
            });
        }
    }
    
    // Reset all filters
    resetFilters() {
        // Reset checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset price inputs
        const minPriceInput = document.querySelector('.price-range input:first-child');
        const maxPriceInput = document.querySelector('.price-range input:last-child');
        if (minPriceInput && maxPriceInput) {
            minPriceInput.value = '';
            maxPriceInput.value = '';
        }
        
        // Reset filter values
        this.filters = {
            categories: [],
            brands: [],
            priceMin: null,
            priceMax: null
        };
        
        // Apply filters (reset)
        this.applyFilters();
    }
    
    // Setup pagination
    setupPagination() {
        const paginationLinks = document.querySelectorAll('.pagination .page-number');
        paginationLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToPage(index + 1);
            });
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add burger menu to all pages if it doesn't exist
    const addBurgerMenu = () => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        // Check if burger menu already exists
        if (!header.querySelector('.burger-menu-icon')) {
            const logo = header.querySelector('.logo');
            if (logo) {
                const burgerMenuIcon = document.createElement('div');
                burgerMenuIcon.className = 'burger-menu-icon';
                burgerMenuIcon.innerHTML = '<span></span><span></span><span></span>';
                logo.after(burgerMenuIcon);
            }
        }
        
        // Check if menu overlay exists
        if (!document.querySelector('.menu-overlay')) {
            const menuOverlay = document.createElement('div');
            menuOverlay.className = 'menu-overlay';
            header.after(menuOverlay);
        }
    };
    
    // Add burger menu to all pages
    addBurgerMenu();
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Burger menu functionality
    const burgerMenuIcon = document.querySelector('.burger-menu-icon');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (burgerMenuIcon && mainNav && menuOverlay) {
        // Добавляем обработчик клика на бургер-меню
        burgerMenuIcon.addEventListener('click', () => {
            console.log('Burger menu clicked'); // Отладочный вывод
            burgerMenuIcon.classList.toggle('active');
            mainNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Добавляем обработчик клика на оверлей
        menuOverlay.addEventListener('click', () => {
            console.log('Overlay clicked'); // Отладочный вывод
            burgerMenuIcon.classList.remove('active');
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked'); // Отладочный вывод
                burgerMenuIcon.classList.remove('active');
                mainNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    } else {
        console.warn('Burger menu elements not found:', {
            burgerMenuIcon: !!burgerMenuIcon,
            mainNav: !!mainNav,
            menuOverlay: !!menuOverlay
        });
    }
    
    // Initialize the page
    if (document.querySelector('.catalog-page')) {
        // Проверяем, что массив products доступен
        if (typeof products !== 'undefined' && Array.isArray(products)) {
            const catalogManager = new CatalogManager(products);
            catalogManager.init();
        }
    }
    
    // Инициализация кнопок Add to Cart на главной странице
    const homeAddToCartButtons = document.querySelectorAll('.home-products-grid .add-to-cart');
    if (homeAddToCartButtons.length > 0) {
        
        homeAddToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                
                // Найти продукт в массиве products
                const product = products.find(p => p.id === productId);
                
                if (product) {
                    // Добавить продукт в корзину
                    cart.addItem(product);
                    
                    // Показать обратную связь
                    button.classList.add('added');
                    button.textContent = 'Added to Cart';
                    
                    // Вернуть кнопку в исходное состояние через 2 секунды
                    setTimeout(() => {
                        button.classList.remove('added');
                        button.textContent = 'Add to Cart';
                    }, 2000);
                } else {
                    // Если продукт не найден в массиве, создаем его из данных кнопки
                    const productCard = button.closest('.home-product-card');
                    if (productCard) {
                        const productName = productCard.querySelector('.product-title').textContent;
                        const productPrice = parseInt(productCard.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));
                        const productImage = productCard.querySelector('.product-image img').src;
                        
                        cart.addItem({
                            id: productId,
                            name: productName,
                            price: productPrice,
                            image: productImage,
                            quantity: 1
                        });
                        
                        // Показать обратную связь
                        button.classList.add('added');
                        button.textContent = 'Added to Cart';
                        
                        // Вернуть кнопку в исходное состояние через 2 секунды
                        setTimeout(() => {
                            button.classList.remove('added');
                            button.textContent = 'Add to Cart';
                        }, 2000);
                    }
                }
            });
        });
    }
}); 