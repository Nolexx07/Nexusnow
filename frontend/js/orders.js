// Orders Page - Comprehensive Summary with Backend Integration

// Global variables
let allOrders = [];
let filteredOrders = [];
let currentUser = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeOrders();
    setupEventListeners();
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});

// Initialize orders functionality
function initializeOrders() {
    // Get current user from localStorage
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || { id: 'default' };
    
    // Load orders from backend
    loadOrdersFromBackend();
    
    // Update summary statistics
    updateSummaryStats();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('order-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter functionality
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', handleFilter);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', handleFilter);
    }
    
    // Modal functionality
    const modalOverlay = document.getElementById('order-modal-overlay');
    const closeModal = document.getElementById('close-order-modal');
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeOrderModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeOrderModal);
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOrderModal();
        }
    });
}

// Load orders from backend
async function loadOrdersFromBackend() {
    try {
        showLoading(true);
        const token = localStorage.getItem('token');
        // Fetch orders from backend
        const response = await fetch('/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
        if (response.ok) {
            const data = await response.json();
            allOrders = data.orders || [];
            filteredOrders = [...allOrders];
            renderOrders();
            updateSummaryStats();
        } else {
            const error = await response.json();
            showBackendError(error.error || 'Failed to load orders from backend.');
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        showBackendError('Could not connect to backend. Please check your server.');
    } finally {
        showLoading(false);
    }
}

// Render orders
function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    const ordersEmpty = document.getElementById('orders-empty');
    const ordersCount = document.getElementById('orders-count');
    
    if (!ordersList) return;
    
    if (filteredOrders.length === 0) {
        ordersList.innerHTML = '';
        if (ordersEmpty) ordersEmpty.style.display = 'block';
        if (ordersCount) ordersCount.textContent = '0';
        return;
    }
    

    
    if (ordersEmpty) ordersEmpty.style.display = 'none';
    if (ordersCount) ordersCount.textContent = filteredOrders.length;
    
    ordersList.innerHTML = filteredOrders.map(order => `
        <div class="order-card" data-aos="fade-up" onclick="openOrderDetails('${order.id}')">
            <div class="order-header">
                <div class="order-info">
                    <h3>${order.items[0]?.name || 'Order'}${order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}</h3>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${formatDate(order.date)}</div>
                </div>
                <div class="order-status ${order.status}">${order.status}</div>
            </div>
            
            <div class="order-details">
                ${order.items.slice(0, 3).map(item => `
                    <div class="order-item">
                        <div class="order-item-image">
                            <i class="fas ${getCategoryIcon(item.category)}"></i>
                        </div>
                        <div class="order-item-info">
                            <h4>${item.name}</h4>
                            <div class="order-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
                ${order.items.length > 3 ? `
                    <div class="order-item">
                        <div class="order-item-image">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        <div class="order-item-info">
                            <h4>+${order.items.length - 3} more items</h4>
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div class="order-footer">
                <div class="order-total">Total: $${order.total.toFixed(2)}</div>
                <div class="order-actions">
                    <button class="order-btn view-btn" onclick="event.stopPropagation(); openOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${order.trackingNumber !== 'N/A' ? `
                        <button class="order-btn track-btn" onclick="event.stopPropagation(); trackOrder('${order.trackingNumber}')">
                            <i class="fas fa-truck"></i> Track
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Update summary statistics
function updateSummaryStats() {
    const totalOrders = allOrders.length;
    const totalSpent = allOrders.reduce((sum, order) => sum + order.total, 0);
    const activeOrders = allOrders.filter(order => ['pending', 'processing', 'shipped'].includes(order.status)).length;
    const recentOrders = allOrders.filter(order => {
        const orderDate = new Date(order.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return orderDate >= thirtyDaysAgo;
    }).length;
    const pendingOrders = allOrders.filter(order => ['pending', 'processing'].includes(order.status)).length;
    const avgRating = calculateAverageRating();
    const rewardPoints = Math.floor(totalSpent * 10); // 10 points per dollar spent
    
    // Update hero stats
    updateElement('total-orders', totalOrders);
    updateElement('total-spent', `$${totalSpent.toFixed(2)}`);
    updateElement('active-orders', activeOrders);
    
    // Update summary cards
    updateElement('recent-orders', recentOrders);
    updateElement('pending-orders', pendingOrders);
    updateElement('avg-rating', avgRating.toFixed(1));
    updateElement('reward-points', rewardPoints.toLocaleString());
}

// Calculate average rating (mock calculation)
function calculateAverageRating() {
    const deliveredOrders = allOrders.filter(order => order.status === 'delivered');
    if (deliveredOrders.length === 0) return 0;
    
    // Mock ratings based on order value and recency
    const totalRating = deliveredOrders.reduce((sum, order) => {
        const baseRating = 4.0;
        const valueBonus = Math.min(order.total / 100, 0.5); // Up to 0.5 bonus for high-value orders
        const recencyBonus = 0.3; // Bonus for recent orders
        return sum + (baseRating + valueBonus + recencyBonus);
    }, 0);
    
    return Math.min(totalRating / deliveredOrders.length, 5.0);
}

// Update element text content
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('order-search').value.toLowerCase();
    
    filteredOrders = allOrders.filter(order => {
        const orderId = order.id.toLowerCase();
        const itemNames = order.items.map(item => item.name.toLowerCase()).join(' ');
        const status = order.status.toLowerCase();
        
        return orderId.includes(searchTerm) || 
               itemNames.includes(searchTerm) || 
               status.includes(searchTerm);
    });
    
    renderOrders();
}

// Handle filtering
function handleFilter() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    filteredOrders = allOrders.filter(order => {
        // Status filter
        if (statusFilter && order.status !== statusFilter) {
            return false;
        }
        
        // Date filter
        if (dateFilter) {
            const orderDate = new Date(order.date);
            const filterDate = new Date();
            filterDate.setDate(filterDate.getDate() - parseInt(dateFilter));
            
            if (orderDate < filterDate) {
                return false;
            }
        }
        
        return true;
    });
    
    renderOrders();
}

// Refresh orders
function refreshOrders() {
    loadOrdersFromBackend();
    showToast('Orders refreshed successfully!', 'success');
}

// Open order details modal
function openOrderDetails(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = document.getElementById('order-modal-content');
    const modal = document.getElementById('order-modal');
    const overlay = document.getElementById('order-modal-overlay');
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>Order Details</h2>
            <div class="order-status ${order.status}">${order.status}</div>
        </div>
        
        <div class="modal-body">
            <div class="order-info-grid">
                <div class="info-section">
                    <h3>Order Information</h3>
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Date:</strong> ${formatDate(order.date)}</p>
                    <p><strong>Status:</strong> ${order.status}</p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                    ${order.trackingNumber !== 'N/A' ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
                </div>
                
                <div class="info-section">
                    <h3>Delivery Information</h3>
                    <p><strong>Address:</strong> ${order.deliveryAddress}</p>
                    <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="order-items-section">
                <h3>Order Items (${order.items.length})</h3>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="modal-order-item">
                            <div class="item-icon">
                                <i class="fas ${getCategoryIcon(item.category)}"></i>
                            </div>
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Price: $${item.price.toFixed(2)} each</p>
                            </div>
                            <div class="item-total">
                                $${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <button class="modal-btn secondary" onclick="closeOrderModal()">Close</button>
            ${order.trackingNumber !== 'N/A' ? `
                <button class="modal-btn primary" onclick="trackOrder('${order.trackingNumber}')">
                    <i class="fas fa-truck"></i> Track Order
                </button>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('show');
    overlay.classList.add('show');
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    const overlay = document.getElementById('order-modal-overlay');
    
    modal.classList.remove('show');
    overlay.classList.remove('show');
}

// Track order
function trackOrder(trackingNumber) {
    showToast(`Tracking order: ${trackingNumber}`, 'info');
    // In a real application, this would open a tracking page or modal
    setTimeout(() => {
        window.open(`https://tracking.example.com/${trackingNumber}`, '_blank');
    }, 1000);
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        grocery: 'fa-shopping-basket',
        shopping: 'fa-shopping-bag',
        transport: 'fa-bus',
        default: 'fa-box'
    };
    return icons[category] || icons.default;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show loading state
function showLoading(show) {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

// Get toast icon
function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Floating icon functions
function openHelpCenter() {
    showToast('Opening Help Center...', 'info');
    setTimeout(() => {
        window.open('helpcenter.html', '_blank');
    }, 500);
}

function openAboutPage() {
    showToast('Opening About Us...', 'info');
    setTimeout(() => {
        window.open('about.html', '_blank');
    }, 500);
}

// Remove order function
async function removeOrder(orderId) {
    if (!confirm('Are you sure you want to remove this order? This action cannot be undone.')) {
        return;
    }
    
    try {
        showLoading(true);
        
        const response = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            // Remove from local arrays
            allOrders = allOrders.filter(order => order.id !== orderId);
            filteredOrders = filteredOrders.filter(order => order.id !== orderId);
            
            // Re-render orders
            renderOrders();
            updateSummaryStats();
            
            showToast('Order removed successfully', 'success');
        } else {
            const error = await response.json();
            showToast(error.error || 'Failed to remove order', 'error');
        }
    } catch (error) {
        console.error('Error removing order:', error);
        showToast('Failed to remove order. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
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
        const container = document.getElementById('orders-list')?.parentElement || document.body;
        container.insertBefore(errorDiv, container.firstChild);
    }
    errorDiv.textContent = message;
}

// Export functions for global access
window.refreshOrders = refreshOrders;
window.openOrderDetails = openOrderDetails;
window.closeOrderModal = closeOrderModal;
window.trackOrder = trackOrder;
window.removeOrder = removeOrder;
window.openHelpCenter = openHelpCenter;
window.openAboutPage = openAboutPage; 