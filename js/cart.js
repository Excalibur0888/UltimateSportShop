class CartPage {
    constructor() {
        this.cart = new Cart();
        this.init();
    }

    init() {
        this.renderCartItems();
        this.updateSummary();
        this.setupEventListeners();
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartContainer = document.querySelector('.cart-container');
        
        if (!cartItems) return;

        if (this.cart.items.length === 0) {
            // Show the empty cart message and hide cart items and summary
            if (emptyCart) {
                emptyCart.style.display = 'block';
                if (cartContainer) cartContainer.style.display = 'none';
            } else {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <p>Your cart is empty</p>
                        <a href="/catalog" class="continue-shopping">Continue Shopping</a>
                    </div>
                `;
            }
            return;
        }

        // Hide empty cart message and show cart items and summary
        if (emptyCart) {
            emptyCart.style.display = 'none';
            if (cartContainer) cartContainer.style.display = 'grid';
        }

        cartItems.innerHTML = this.cart.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}" data-quantity="${item.quantity - 1}">-</button>
                    <span class="quantity-input">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}" data-quantity="${item.quantity + 1}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `).join('');
        
        // Добавляем слушатели событий для кнопок
        const minusButtons = cartItems.querySelectorAll('.quantity-btn.minus');
        const plusButtons = cartItems.querySelectorAll('.quantity-btn.plus');
        const removeButtons = cartItems.querySelectorAll('.remove-item');
        
        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                const quantity = parseInt(button.dataset.quantity);
                this.updateQuantity(id, quantity);
            });
        });
        
        plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                const quantity = parseInt(button.dataset.quantity);
                this.updateQuantity(id, quantity);
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                this.removeItem(id);
            });
        });
    }

    updateSummary() {
        const subtotal = document.getElementById('subtotal');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');
        if (subtotal && total) {
            const amount = this.cart.getTotal();
            subtotal.textContent = `₹${amount}`;
            
            if (tax) {
                const taxAmount = Math.round(amount * 0.18);
                tax.textContent = `₹${taxAmount}`;
                total.textContent = `₹${amount + taxAmount}`;
            } else {
                total.textContent = `₹${amount}`;
            }
        }
    }

    setupEventListeners() {
        
        // Setup event listeners for recommended products
        this.setupRecommendedProductsListeners();
    }
    
    setupRecommendedProductsListeners() {
        const recommendedAddToCartButtons = document.querySelectorAll('.recommended-products-grid .add-to-cart');
        
        recommendedAddToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(button.dataset.id);
                const productName = button.dataset.name;
                const productPrice = parseFloat(button.dataset.price);
                const productImage = button.dataset.image;
                
                // Add the product to the cart
                this.addToCart(productId, productName, productPrice, productImage);
                
                // Show feedback
                button.classList.add('added');
                button.textContent = 'Added to Cart';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    button.classList.remove('added');
                    button.textContent = 'Add to Cart';
                }, 2000);
            });
        });
    }

    addToCart(productId, productName, productPrice, productImage) {
        this.cart.addItem({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
        
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.getTotalItems();
        }
        
        // Use renderCartItems to handle the display logic
        this.renderCartItems();
        this.updateSummary();
    }

    updateQuantity(productId, quantity) {
        // Ensure productId is a number
        productId = parseInt(productId);
        
        if (quantity < 1) {
            this.removeItem(productId);
        } else {
            this.cart.updateQuantity(productId, quantity);
            this.renderCartItems();
            this.updateSummary();
        }
    }

    removeItem(productId) {
        // Ensure productId is a number
        productId = parseInt(productId);
        
        this.cart.removeItem(productId);
        this.renderCartItems();
        this.updateSummary();
        
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.getTotalItems();
        }
    }

    handleCheckout() {
        if (this.cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        this.cart.items = [];
        this.cart.saveCart();
        this.renderCartItems();
        this.updateSummary();
        
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = '0';
        }
    }
}

// Initialize cart page
let cartPage;
document.addEventListener('DOMContentLoaded', () => {
    cartPage = new CartPage();
}); 