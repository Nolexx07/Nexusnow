// Order Management Utilities - Shared across all pages

// Generate unique order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${new Date().getFullYear()}-${String(random).padStart(3, '0')}`;
}

// Create order from cart items
async function createOrder(cartItems, category, deliveryAddress = 'N/A', paymentMethod = 'Credit Card') {
    try {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const orderData = {
            userId: JSON.parse(localStorage.getItem('currentUser'))?.id || 'default',
            total: total,
            category: category,
            items: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: category
            })),
            deliveryAddress: deliveryAddress,
            paymentMethod: paymentMethod,
            trackingNumber: category === 'transport' ? 'N/A' : `TRK${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            status: 'pending'
        };

        const token = localStorage.getItem('token');
        const response = await fetch('https://nexusnow.onrender.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const result = await response.json();
            showToast('Order placed successfully!', 'success');
            
            // Clear cart after successful order
            clearCart();
            
            // Redirect to orders page after a short delay
            setTimeout(() => {
                window.location.href = 'orders.html';
            }, 1500);
            
            return result.order;
        } else {
            const error = await response.json();
            showBackendError(error.error || 'Failed to place order');
            return null;
        }
    } catch (error) {
        console.error('Error creating order:', error);
        showBackendError('Could not connect to backend. Please check your server.');
        return null;
    }
}

// Clear cart from localStorage
function clearCart() {
    localStorage.removeItem('nexusnow_cart');
    localStorage.removeItem('grocery-cart');
    localStorage.removeItem('shopping-cart');
    localStorage.removeItem('transport-cart');
    
    // Update cart count
    updateCartCount(0);
}

// Update cart count display
function updateCartCount(count = null) {
    const cartCountElements = document.querySelectorAll('.cart-count, #cart-count, #grocery-cart-count, #shopping-cart-count');
    
    if (count !== null) {
        // Set specific count
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    } else {
        // Calculate total from all cart storages
        const mainCart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
        const groceryCart = JSON.parse(localStorage.getItem('grocery-cart') || '[]');
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
        const transportCart = JSON.parse(localStorage.getItem('transport-cart') || '[]');
        
        const totalItems = mainCart.length + groceryCart.length + shoppingCart.length + transportCart.length;
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${getToastIcon(type)}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Get toast icon based on type
function getToastIcon(type) {
    switch (type) {
        case 'success': return '✓';
        case 'error': return '✕';
        case 'warning': return '⚠';
        case 'info': return 'ℹ';
        default: return 'ℹ';
    }
}

// Get cart items from localStorage
function getCartItems(category = null) {
    if (category) {
        return JSON.parse(localStorage.getItem(`${category}-cart`)) || [];
    }
    
    // Get all cart items from different categories
    const groceryCart = JSON.parse(localStorage.getItem('grocery-cart')) || [];
    const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
    const transportCart = JSON.parse(localStorage.getItem('transport-cart')) || [];
    
    return [...groceryCart, ...shoppingCart, ...transportCart];
}

// Calculate total cart value
function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize cart count on page load
function initializeCartCount() {
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        updateCartCount();
    }, 100);
}

// Show backend error message visibly on the page
function showBackendError(message) {
    let errorDiv = document.getElementById('orders-backend-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'orders-backend-error';
        errorDiv.style.color = 'red';
        errorDiv.style.background = '#fff0f0';
        errorDiv.style.padding = '12px';
        errorDiv.style.margin = '12px 0';
        errorDiv.style.border = '1px solid #f00';
        errorDiv.style.borderRadius = '6px';
        errorDiv.style.textAlign = 'center';
        const container = document.body;
        container.insertBefore(errorDiv, container.firstChild);
    }
    errorDiv.textContent = message;
}

// Export functions for global access
window.generateOrderId = generateOrderId;
window.createOrder = createOrder;
window.clearCart = clearCart;
window.updateCartCount = updateCartCount;
window.initializeCartCount = initializeCartCount;
window.showToast = showToast;
window.getCartItems = getCartItems;
window.calculateCartTotal = calculateCartTotal;

// Auto-initialize cart count when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCartCount);
} else {
    initializeCartCount();
} 