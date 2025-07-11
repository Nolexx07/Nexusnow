// Modern Grocery Page JS - Matching shopping page design

// Comprehensive Grocery Data
const groceryData = {
  trending: [
    { id: 1, name: 'Fresh Avocado', price: 3.49, originalPrice: 4.99, image: '🥑', rating: 4.8, category: 'fruits', badge: '30% OFF' },
    { id: 2, name: 'Organic Quinoa', price: 5.99, originalPrice: 7.99, image: '🌾', rating: 4.9, category: 'staples', badge: '25% OFF' },
    { id: 3, name: 'Fresh Kale', price: 2.49, originalPrice: 3.49, image: '🥬', rating: 4.7, category: 'vegetables', badge: '29% OFF' },
    { id: 4, name: 'Organic Honey', price: 8.99, originalPrice: 11.99, image: '🍯', rating: 4.8, category: 'staples', badge: '25% OFF' },
    { id: 5, name: 'Fresh Strawberries', price: 4.99, originalPrice: 6.99, image: '🍓', rating: 4.9, category: 'fruits', badge: '29% OFF' },
    { id: 6, name: 'Almond Milk', price: 3.99, originalPrice: 5.49, image: '🥛', rating: 4.6, category: 'beverages', badge: '27% OFF' }
  ],
  offers: [
    { id: 7, name: 'Banana Bundle (2kg)', price: 2.99, originalPrice: 4.99, image: '🍌', rating: 4.7, category: 'fruits', badge: '40% OFF' },
    { id: 8, name: 'Whole Grain Bread', price: 2.49, originalPrice: 3.49, image: '🍞', rating: 4.8, category: 'staples', badge: '29% OFF' },
    { id: 9, name: 'Organic Eggs (12)', price: 4.99, originalPrice: 6.99, image: '🥚', rating: 4.9, category: 'dairy', badge: '29% OFF' },
    { id: 10, name: 'Greek Yogurt', price: 3.99, originalPrice: 5.49, image: '🥛', rating: 4.7, category: 'dairy', badge: '27% OFF' },
    { id: 11, name: 'Mixed Nuts (500g)', price: 7.99, originalPrice: 11.99, image: '🥜', rating: 4.8, category: 'snacks', badge: '33% OFF' },
    { id: 12, name: 'Fresh Spinach', price: 2.99, originalPrice: 4.49, image: '🥬', rating: 4.6, category: 'vegetables', badge: '33% OFF' }
  ],
  vegetables: [
    { id: 13, name: 'Fresh Tomatoes', price: 2.99, originalPrice: 2.99, image: '🍅', rating: 4.7, category: 'vegetables' },
    { id: 14, name: 'Organic Broccoli', price: 3.49, originalPrice: 3.49, image: '🥦', rating: 4.8, category: 'vegetables' },
    { id: 15, name: 'Fresh Carrots', price: 1.99, originalPrice: 1.99, image: '🥕', rating: 4.6, category: 'vegetables' },
    { id: 16, name: 'Organic Bell Peppers', price: 3.99, originalPrice: 3.99, image: '🫑', rating: 4.7, category: 'vegetables' },
    { id: 17, name: 'Fresh Onions', price: 1.49, originalPrice: 1.49, image: '🧅', rating: 4.5, category: 'vegetables' },
    { id: 18, name: 'Organic Cucumber', price: 1.99, originalPrice: 1.99, image: '🥒', rating: 4.6, category: 'vegetables' }
  ],
  fruits: [
    { id: 19, name: 'Fresh Apples', price: 2.49, originalPrice: 2.49, image: '🍎', rating: 4.8, category: 'fruits' },
    { id: 20, name: 'Organic Oranges', price: 2.99, originalPrice: 2.99, image: '🍊', rating: 4.7, category: 'fruits' },
    { id: 21, name: 'Fresh Grapes', price: 4.99, originalPrice: 4.99, image: '🍇', rating: 4.9, category: 'fruits' },
    { id: 22, name: 'Organic Pears', price: 3.49, originalPrice: 3.49, image: '🍐', rating: 4.6, category: 'fruits' },
    { id: 23, name: 'Fresh Pineapple', price: 5.99, originalPrice: 5.99, image: '🍍', rating: 4.7, category: 'fruits' },
    { id: 24, name: 'Organic Mangoes', price: 4.49, originalPrice: 4.49, image: '🥭', rating: 4.8, category: 'fruits' }
  ],
  staples: [
    { id: 25, name: 'Basmati Rice (5kg)', price: 12.99, originalPrice: 12.99, image: '🍚', rating: 4.8, category: 'staples' },
    { id: 26, name: 'Extra Virgin Olive Oil', price: 8.99, originalPrice: 8.99, image: '🫒', rating: 4.9, category: 'staples' },
    { id: 27, name: 'Whole Wheat Flour', price: 3.99, originalPrice: 3.99, image: '🌾', rating: 4.7, category: 'staples' },
    { id: 28, name: 'Organic Lentils', price: 4.49, originalPrice: 4.49, image: '🫘', rating: 4.6, category: 'staples' },
    { id: 29, name: 'Pure Honey', price: 9.99, originalPrice: 9.99, image: '🍯', rating: 4.8, category: 'staples' },
    { id: 30, name: 'Organic Sugar', price: 2.99, originalPrice: 2.99, image: '🍯', rating: 4.5, category: 'staples' }
  ],
  snacks: [
    { id: 31, name: 'Mixed Nuts (250g)', price: 5.99, originalPrice: 5.99, image: '🥜', rating: 4.8, category: 'snacks' },
    { id: 32, name: 'Organic Chips', price: 3.49, originalPrice: 3.49, image: '🥔', rating: 4.6, category: 'snacks' },
    { id: 33, name: 'Dark Chocolate', price: 4.99, originalPrice: 4.99, image: '🍫', rating: 4.9, category: 'snacks' },
    { id: 34, name: 'Dried Cranberries', price: 6.99, originalPrice: 6.99, image: '🫐', rating: 4.7, category: 'snacks' },
    { id: 35, name: 'Organic Popcorn', price: 2.99, originalPrice: 2.99, image: '🍿', rating: 4.5, category: 'snacks' },
    { id: 36, name: 'Trail Mix', price: 7.49, originalPrice: 7.49, image: '🥜', rating: 4.8, category: 'snacks' }
  ],
  beverages: [
    { id: 37, name: 'Fresh Orange Juice', price: 3.99, originalPrice: 3.99, image: '🍊', rating: 4.8, category: 'beverages' },
    { id: 38, name: 'Organic Green Tea', price: 4.49, originalPrice: 4.49, image: '🫖', rating: 4.7, category: 'beverages' },
    { id: 39, name: 'Almond Milk', price: 3.99, originalPrice: 3.99, image: '🥛', rating: 4.6, category: 'beverages' },
    { id: 40, name: 'Coconut Water', price: 2.99, originalPrice: 2.99, image: '🥥', rating: 4.5, category: 'beverages' },
    { id: 41, name: 'Organic Coffee', price: 8.99, originalPrice: 8.99, image: '☕', rating: 4.9, category: 'beverages' },
    { id: 42, name: 'Fresh Lemonade', price: 2.49, originalPrice: 2.49, image: '🍋', rating: 4.7, category: 'beverages' }
  ],
  dairy: [
    { id: 43, name: 'Organic Milk (1L)', price: 3.99, originalPrice: 3.99, image: '🥛', rating: 4.8, category: 'dairy' },
    { id: 44, name: 'Greek Yogurt', price: 4.49, originalPrice: 4.49, image: '🥛', rating: 4.9, category: 'dairy' },
    { id: 45, name: 'Fresh Cheese', price: 5.99, originalPrice: 5.99, image: '🧀', rating: 4.7, category: 'dairy' },
    { id: 46, name: 'Organic Butter', price: 4.99, originalPrice: 4.99, image: '🧈', rating: 4.8, category: 'dairy' },
    { id: 47, name: 'Fresh Eggs (12)', price: 4.49, originalPrice: 4.49, image: '🥚', rating: 4.9, category: 'dairy' },
    { id: 48, name: 'Organic Cream', price: 3.99, originalPrice: 3.99, image: '🥛', rating: 4.6, category: 'dairy' }
  ]
};

// Promo banners data
const promoBanners = [
  {
    title: 'Fresh Fruits Sale',
    description: 'Get 20% off on all fresh fruits this week',
    buttonText: 'Shop Now',
    color: 'linear-gradient(135deg, #22c55e, #2563eb)'
  },
  {
    title: 'Organic Bundle',
    description: 'Save 30% on organic products bundle',
    buttonText: 'Explore',
    color: 'linear-gradient(135deg, #16a34a, #22d3ee)'
  },
  {
    title: 'Free Delivery',
    description: 'Free delivery on orders above $30',
    buttonText: 'Learn More',
    color: 'linear-gradient(135deg, #3b82f6, #22c55e)'
  }
];

// Category configuration
const categories = [
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'offers', name: 'Offers', icon: '🎁' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'staples', name: 'Staples', icon: '🌾' },
  { id: 'snacks', name: 'Snacks', icon: '🥜' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'dairy', name: 'Dairy', icon: '🥛' }
];

// Cart management
class GroceryCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('grocery-cart') || '[]');
    this.updateCartCount();
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }
    this.saveCart();
    this.updateCartCount();
    this.updateCartSidebar();
    
    // Also update global cart count
    if (window.updateCartCount) {
      window.updateCartCount();
    }
    
    return existingItem ? existingItem.quantity : 1;
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.updateCartSidebar();
    
    // Also update global cart count
    if (window.updateCartCount) {
      window.updateCartCount();
    }
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartCount();
        this.updateCartSidebar();
        
        // Also update global cart count
        if (window.updateCartCount) {
          window.updateCartCount();
        }
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem('grocery-cart', JSON.stringify(this.items));
  }

  updateCartCount() {
    // Use the global updateCartCount function if available
    if (window.updateCartCount) {
      window.updateCartCount();
    } else {
      // Fallback to local count
      const count = this.getItemCount();
      const cartCountElements = document.querySelectorAll('#cart-count, #grocery-cart-count');
      cartCountElements.forEach(element => {
        element.textContent = count;
      });
    }
  }

  updateCartSidebar() {
    const sidebarContent = document.getElementById('cart-sidebar-content');
    const subtotalElement = document.getElementById('cart-subtotal');
    
    if (!sidebarContent) return;

    if (this.items.length === 0) {
      sidebarContent.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some fresh groceries to get started! Browse our categories and discover amazing products.</p>
          <div class="empty-cart-suggestions">
            <span>💡 Try our trending items</span>
            <span>🥬 Fresh vegetables</span>
            <span>🍎 Seasonal fruits</span>
          </div>
        </div>
      `;
      subtotalElement.textContent = '$0.00';
      return;
    }

    sidebarContent.innerHTML = this.items.map((item, index) => `
      <div class="cart-item" style="animation-delay: ${index * 0.1}s;">
        <div class="cart-item-thumb">${item.image}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="groceryCart.updateQuantity(${item.id}, ${item.quantity - 1})" title="Decrease quantity">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="groceryCart.updateQuantity(${item.id}, ${item.quantity + 1})" title="Increase quantity">
              <i class="fas fa-plus"></i>
            </button>
            <button class="remove-item" onclick="groceryCart.removeItem(${item.id})" title="Remove item">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    const total = this.getTotal();
    subtotalElement.innerHTML = `
      <span>Subtotal (${this.getItemCount()} items)</span>
      <span class="total-amount">$${total.toFixed(2)}</span>
    `;

    // Add animation classes
    setTimeout(() => {
      const cartItems = sidebarContent.querySelectorAll('.cart-item');
      cartItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
    }, 100);
  }
}

// Initialize cart
const groceryCart = new GroceryCart();

// Utility functions
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Render functions
function renderProductCard(product) {
  const discount = product.originalPrice > product.price;
  const discountPercent = discount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const isWishlisted = isProductInWishlist(product.id);
  return `
    <div class="grocery-product-card" data-id="${product.id}">
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      <div class="product-image">${product.image}</div>
      <div class="grocery-product-info">
        <h3>${product.name}</h3>
        <div class="grocery-product-rating">
          ${generateStars(product.rating)} <span>(${product.rating})</span>
        </div>
        <div class="grocery-product-price">
          ${formatPrice(product.price)}
          ${discount ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <button class="grocery-add-cart-btn" onclick="addToGroceryCart(${product.id})">
          <i class="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>
      <button class="wishlist-btn${isWishlisted ? ' wishlisted' : ''}" title="Add to Wishlist" onclick="toggleWishlist(event, ${product.id}, 'grocery')">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;
}

function isProductInWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return wishlist.some(item => item.id === productId);
}

function toggleWishlist(event, productId, category) {
  event.stopPropagation();
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const product = findGroceryProductById(productId);
  if (!product) return;
  const index = wishlist.findIndex(item => item.id === productId);
  const card = event.target.closest('.grocery-product-card');
  const btn = card.querySelector('.wishlist-btn');
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from wishlist', 'info');
    btn.classList.remove('wishlisted');
  } else {
    wishlist.push({ id: product.id, name: product.name, price: product.price, image: product.image, category });
    showToast('Added to wishlist!', 'success');
    btn.classList.add('wishlisted');
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  console.log('Wishlist now:', wishlist);
}

function renderHorizontalSection(categoryId, title, products) {
  const container = document.getElementById(`${categoryId}-container`);
  if (!container) return;

  container.innerHTML = `
    <div class="grocery-horizontal-title">
      <h2>${title}</h2>
      <a href="#" class="view-all-link">View All <i class="fas fa-arrow-right"></i></a>
    </div>
    <button class="grocery-arrow left" onclick="scrollGrocerySection('${categoryId}', 'left')">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="grocery-horizontal-scroll" id="${categoryId}-scroll">
      ${products.map(renderProductCard).join('')}
    </div>
    <button class="grocery-arrow right" onclick="scrollGrocerySection('${categoryId}', 'right')">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
}

function renderStickyCategories() {
  const categoriesContainer = document.getElementById('grocery-sticky-categories');
  if (!categoriesContainer) return;

  categoriesContainer.innerHTML = `
    <div class="category-scroll">
      ${categories.map(category => `
        <button class="category-btn" data-category="${category.id}" onclick="scrollToGroceryCategory('${category.id}')">
          <span>${category.icon}</span>
          ${category.name}
        </button>
      `).join('')}
    </div>
  `;
}

function renderPromoBanners() {
  const bannersContainer = document.getElementById('grocery-promo-banners');
  if (!bannersContainer) return;

  bannersContainer.innerHTML = promoBanners.map(banner => `
    <div class="promo-banner" style="border-top: 4px solid; border-image: ${banner.color} 1;">
      <h3>${banner.title}</h3>
      <p>${banner.description}</p>
      <button class="promo-btn">${banner.buttonText}</button>
    </div>
  `).join('');
}

// Navigation functions
function scrollGrocerySection(sectionId, direction) {
  const scrollContainer = document.getElementById(`${sectionId}-scroll`);
  if (!scrollContainer) return;

  const scrollAmount = 300;
  const currentScroll = scrollContainer.scrollLeft;
  const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
  
  scrollContainer.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  });
}

function scrollToGroceryCategory(categoryId) {
  const section = document.getElementById(`grocery-${categoryId}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Update active category button
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-category="${categoryId}"]`)?.classList.add('active');
}

// Cart functions
function addToGroceryCart(productId) {
  const product = findGroceryProductById(productId);
  if (!product) return;

  const quantity = groceryCart.addItem(product);
  showToast(`${product.name} added to cart!`, 'success');
  
  // Animate the button
  const button = event.target.closest('.grocery-add-cart-btn');
  if (button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = '#22c55e';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
    }, 2000);
  }
}

function findGroceryProductById(productId) {
  for (const category in groceryData) {
    const product = groceryData[category].find(p => p.id === productId);
    if (product) return product;
  }
  return null;
}

// Cart sidebar functions
function openGroceryCartSidebar() {
  const sidebar = document.getElementById('grocery-cart-sidebar');
  const overlay = document.getElementById('cart-sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeGroceryCartSidebar() {
  const sidebar = document.getElementById('grocery-cart-sidebar');
  const overlay = document.getElementById('cart-sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Search functionality
function initializeGrocerySearch() {
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  
  if (!searchInput || !searchSuggestions) return;

  const allProducts = Object.values(groceryData).flat();
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
      searchSuggestions.classList.remove('show');
      return;
    }

    const filteredProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (filteredProducts.length > 0) {
      searchSuggestions.innerHTML = filteredProducts.map(product => `
        <div class="suggestion-item" onclick="searchGroceryProduct('${product.name}')">
          <span>${product.image}</span>
          <span>${product.name}</span>
          <span class="suggestion-price">${formatPrice(product.price)}</span>
        </div>
      `).join('');
      searchSuggestions.classList.add('show');
    } else {
      searchSuggestions.classList.remove('show');
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
      searchSuggestions.classList.remove('show');
    }
  });
}

function searchGroceryProduct(productName) {
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  
  if (searchInput) {
    searchInput.value = productName;
  }
  if (searchSuggestions) {
    searchSuggestions.classList.remove('show');
  }
  
  showToast(`Searching for ${productName}...`, 'info');
}

// Flash deals countdown
function initializeGroceryFlashDeals() {
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const progressElement = document.getElementById('flash-progress');
  
  if (!hoursElement || !minutesElement || !secondsElement) return;

  let totalSeconds = 12 * 60 * 60; // 12 hours in seconds
  
  function updateCountdown() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar
    const progress = ((12 * 60 * 60 - totalSeconds) / (12 * 60 * 60)) * 100;
    if (progressElement) {
      progressElement.style.width = `${Math.min(progress, 100)}%`;
    }
    
    if (totalSeconds <= 0) {
      totalSeconds = 12 * 60 * 60; // Reset to 12 hours
    } else {
      totalSeconds--;
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Promo banner rotation
function initializeGroceryPromoBanner() {
  const promoMessages = [
    'Fresh Deals: Up to 50% off on Groceries!',
    'Same Day Delivery Available',
    'Organic Products at Best Prices!',
    'Free Delivery on orders above $30',
    'Fresh from Farm to Table!'
  ];
  
  let currentIndex = 0;
  const banner = document.getElementById('grocery-promo-banner');
  const messageElement = banner?.querySelector('.promo-message');
  
  if (!messageElement) return;

  function updateMessage() {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.textContent = promoMessages[currentIndex];
      messageElement.style.opacity = '1';
      currentIndex = (currentIndex + 1) % promoMessages.length;
    }, 300);
  }

  setInterval(updateMessage, 4000);
}

// Initialize everything
function initializeGroceryPage() {
  console.log('Initializing Grocery Page...');
  
  try {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
      console.log('AOS initialized');
    } else {
      console.log('AOS not available');
    }

    // Render all sections
    console.log('Rendering sticky categories...');
    renderStickyCategories();
    
    console.log('Rendering promo banners...');
    renderPromoBanners();
    
    // Render each category section
    console.log('Rendering category sections...');
    Object.entries(groceryData).forEach(([category, products]) => {
      const categoryConfig = categories.find(c => c.id === category);
      if (categoryConfig) {
        console.log(`Rendering ${category} section...`);
        renderHorizontalSection(`grocery-${category}`, categoryConfig.name, products);
      }
    });

    // Initialize search
    console.log('Initializing search...');
    initializeGrocerySearch();
    
    // Initialize promo banner rotation
    console.log('Initializing promo banner...');
    initializeGroceryPromoBanner();
    
    // Initialize flash deals
    console.log('Initializing flash deals...');
    initializeGroceryFlashDeals();
    
    // Initialize cart sidebar
    console.log('Initializing cart...');
    groceryCart.updateCartSidebar();
    
    // Event listeners
    const floatingCart = document.getElementById('grocery-floating-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-sidebar-overlay');
    
    if (floatingCart) {
      floatingCart.addEventListener('click', openGroceryCartSidebar);
      console.log('Floating cart event listener added');
    }
    
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', closeGroceryCartSidebar);
      console.log('Close cart event listener added');
    }
    
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeGroceryCartSidebar);
      console.log('Cart overlay event listener added');
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.onclick = async function() {
        const cartItems = groceryCart.items || [];
        if (!cartItems.length) {
          showToast('Your cart is empty!', 'error');
          return;
        }
        sessionStorage.setItem('checkout_cart', JSON.stringify(cartItems));
        sessionStorage.setItem('checkout_category', 'grocery');
        window.location.href = 'address.html';
      };
      console.log('Checkout button event listener added');
    }

    console.log('Grocery Page initialized successfully!');
  } catch (error) {
    console.error('Error initializing grocery page:', error);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGroceryPage);

// Export for global access
window.groceryCart = groceryCart;
window.addToGroceryCart = addToGroceryCart;
window.scrollToGroceryCategory = scrollToGroceryCategory;
window.scrollGrocerySection = scrollGrocerySection;
window.openGroceryCartSidebar = openGroceryCartSidebar;
window.closeGroceryCartSidebar = closeGroceryCartSidebar;

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

// Export floating icon functions
window.openHelpCenter = openHelpCenter;
window.openAboutPage = openAboutPage;

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

// Export floating icon functions
window.openHelpCenter = openHelpCenter;
window.openAboutPage = openAboutPage; 