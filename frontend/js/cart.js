// Cart Page Functionality
class CartManager {
    constructor() {
        this.cartItems = [];
        this.init();
    }

    init() {
        this.loadCartItems();
        this.renderCart();
        this.setupEventListeners();
    }

    loadCartItems() {
        // Load from main cart storage
        const mainCart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
        
        // Load from category-specific carts
        const groceryCart = JSON.parse(localStorage.getItem('grocery-cart') || '[]');
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
        const transportCart = JSON.parse(localStorage.getItem('transport-cart') || '[]');
        
        // Combine all cart items
        this.cartItems = [
            ...mainCart.map(item => ({ ...item, category: 'general' })),
            ...groceryCart.map(item => ({ ...item, category: 'grocery' })),
            ...shoppingCart.map(item => ({ ...item, category: 'shopping' })),
            ...transportCart.map(item => ({ ...item, category: 'transport' }))
        ];
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryContainer = document.getElementById('cart-summary');
        const cartEmptyContainer = document.getElementById('cart-empty');

        if (!cartItemsContainer || !cartSummaryContainer) return;

        if (this.cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            cartSummaryContainer.style.display = 'none';
            if (cartEmptyContainer) cartEmptyContainer.style.display = 'block';
    return;
  }

        cartItemsContainer.style.display = 'block';
        cartSummaryContainer.style.display = 'block';
        if (cartEmptyContainer) cartEmptyContainer.style.display = 'none';

        // Render cart items
        cartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="cart-item-card" data-id="${item.id}">
                <img class="cart-item-img" src="${item.image || 'https://via.placeholder.com/80x80/2563eb/ffffff?text=ITEM'}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${(item.price || 0).toFixed(2)}</div>
        <div class="cart-item-qty">
                        <button class="qty-btn" onclick="cartManager.updateQuantity('${item.id}', ${(item.quantity || 1) - 1})">-</button>
                        <input type="number" value="${item.quantity || 1}" min="1" onchange="cartManager.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="qty-btn" onclick="cartManager.updateQuantity('${item.id}', ${(item.quantity || 1) + 1})">+</button>
        </div>
      </div>
                <button class="remove-btn" onclick="cartManager.removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Render cart summary
        const subtotal = this.cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;

        cartSummaryContainer.innerHTML = `
    <div class="cart-summary-title">Order Summary</div>
            <div class="cart-summary-row">
                <span>Subtotal (${this.cartItems.length} items)</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="cart-summary-total">
                Total: $${total.toFixed(2)}
            </div>
    <div class="cart-summary-btns">
                <button class="cart-summary-btn" onclick="cartManager.checkout()">
                    <i class="fas fa-credit-card"></i>
                    Proceed to Checkout
                </button>
                <button class="cart-summary-btn" onclick="window.location.href='index.html'" style="background: #6b7280;">
                    <i class="fas fa-arrow-left"></i>
                    Continue Shopping
                </button>
    </div>
  `;
}

    updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(itemId);
            return;
        }

        const item = this.cartItems.find(item => item.id == itemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.renderCart();
        }
    }

    removeItem(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id != itemId);
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
    }

    saveCart() {
        // Save back to appropriate storage based on category
        const mainCart = this.cartItems.filter(item => item.category === 'general');
        const groceryCart = this.cartItems.filter(item => item.category === 'grocery');
        const shoppingCart = this.cartItems.filter(item => item.category === 'shopping');
        const transportCart = this.cartItems.filter(item => item.category === 'transport');

        localStorage.setItem('nexusnow_cart', JSON.stringify(mainCart));
        localStorage.setItem('grocery-cart', JSON.stringify(groceryCart));
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        localStorage.setItem('transport-cart', JSON.stringify(transportCart));
    }

    updateCartCount() {
        // Calculate total from all cart storages
        const mainCart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
        const groceryCart = JSON.parse(localStorage.getItem('grocery-cart') || '[]');
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
        const transportCart = JSON.parse(localStorage.getItem('transport-cart') || '[]');
        
        const totalItems = mainCart.length + groceryCart.length + shoppingCart.length + transportCart.length;
        
        const cartCountElements = document.querySelectorAll('.cart-count, #cart-count, #grocery-cart-count, #shopping-cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    getCategoryLabel(category) {
        const labels = {
            'grocery': 'Grocery',
            'shopping': 'Shopping',
            'transport': 'Transport',
            'general': 'General'
        };
        return labels[category] || 'General';
    }

    async checkout() {
        if (this.cartItems.length === 0) {
            this.showToast('Your cart is empty!', 'error');
            return;
        }
        // Save cart to sessionStorage and redirect to address.html
        sessionStorage.setItem('checkout_cart', JSON.stringify(this.cartItems));
        sessionStorage.setItem('checkout_category', 'mixed');
        window.location.href = 'address.html';
    }

    clearAllCarts() {
        localStorage.removeItem('nexusnow_cart');
        localStorage.removeItem('grocery-cart');
        localStorage.removeItem('shopping-cart');
        localStorage.removeItem('transport-cart');
        this.cartItems = [];
        this.updateCartCount();
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${this.getToastIcon(type)}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    getToastIcon(type) {
        switch (type) {
            case 'success': return '✓';
            case 'error': return '✕';
            case 'warning': return '⚠';
            case 'info': return 'ℹ';
            default: return 'ℹ';
        }
    }

    setupEventListeners() {
        // Update cart count on page load
        this.updateCartCount();

        // Add event listener for checkout button
        document.addEventListener('DOMContentLoaded', function() {
            const checkoutBtn = document.getElementById('cart-checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.onclick = async function() {
                    const cartItems = getCartItems();
                    if (!cartItems.length) {
                        showToast('Your cart is empty!', 'error');
                        return;
                    }
                    sessionStorage.setItem('checkout_cart', JSON.stringify(cartItems));
                    sessionStorage.setItem('checkout_category', 'mixed');
                    window.location.href = 'address.html';
                };
            }
        });
    }
}

// Initialize cart manager when page loads
let cartManager;
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
}); 

// Make cartManager globally accessible
window.cartManager = cartManager; 