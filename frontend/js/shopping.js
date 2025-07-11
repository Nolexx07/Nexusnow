// Comprehensive Shopping Data
const shoppingData = {
  trending: [
    { id: 1, name: 'Designer T-Shirt', price: 29.99, originalPrice: 49.99, image: '👕', rating: 4.8, category: 'men', badge: '40% OFF' },
    { id: 2, name: 'Summer Dress', price: 45.99, originalPrice: 79.99, image: '👗', rating: 4.9, category: 'women', badge: '42% OFF' },
    { id: 3, name: 'Sneakers', price: 89.99, originalPrice: 129.99, image: '👟', rating: 4.7, category: 'footwear', badge: '31% OFF' },
    { id: 4, name: 'Leather Handbag', price: 69.99, originalPrice: 99.99, image: '👜', rating: 4.6, category: 'bags', badge: '30% OFF' },
    { id: 5, name: 'Denim Jacket', price: 59.99, originalPrice: 89.99, image: '🧥', rating: 4.8, category: 'men', badge: '33% OFF' },
    { id: 6, name: 'Gold Necklace', price: 129.99, originalPrice: 199.99, image: '📿', rating: 4.9, category: 'jewelry', badge: '35% OFF' }
  ],
  topSelling: [
    { id: 7, name: 'Classic Jeans', price: 39.99, originalPrice: 39.99, image: '👖', rating: 4.7, category: 'men' },
    { id: 8, name: 'Blouse', price: 34.99, originalPrice: 34.99, image: '👚', rating: 4.8, category: 'women' },
    { id: 9, name: 'Kids T-Shirt', price: 19.99, originalPrice: 19.99, image: '👕', rating: 4.6, category: 'kids' },
    { id: 10, name: 'Running Shoes', price: 79.99, originalPrice: 79.99, image: '👟', rating: 4.7, category: 'footwear' },
    { id: 11, name: 'Sunglasses', price: 24.99, originalPrice: 24.99, image: '🕶️', rating: 4.5, category: 'accessories' },
    { id: 12, name: 'Watch', price: 149.99, originalPrice: 149.99, image: '⌚', rating: 4.8, category: 'accessories' }
  ],
  men: [
    { id: 13, name: 'Formal Shirt', price: 44.99, originalPrice: 64.99, image: '👔', rating: 4.7, category: 'men', badge: '31% OFF' },
    { id: 14, name: 'Casual Hoodie', price: 49.99, originalPrice: 49.99, image: '🧥', rating: 4.8, category: 'men' },
    { id: 15, name: 'Chino Pants', price: 54.99, originalPrice: 74.99, image: '👖', rating: 4.6, category: 'men', badge: '27% OFF' },
    { id: 16, name: 'Polo Shirt', price: 29.99, originalPrice: 29.99, image: '👕', rating: 4.7, category: 'men' },
    { id: 17, name: 'Blazer', price: 89.99, originalPrice: 89.99, image: '🧥', rating: 4.8, category: 'men' },
    { id: 18, name: 'Cargo Shorts', price: 34.99, originalPrice: 34.99, image: '🩳', rating: 4.5, category: 'men' }
  ],
  women: [
    { id: 19, name: 'Maxi Dress', price: 59.99, originalPrice: 79.99, image: '👗', rating: 4.8, category: 'women', badge: '25% OFF' },
    { id: 20, name: 'Skinny Jeans', price: 49.99, originalPrice: 49.99, image: '👖', rating: 4.7, category: 'women' },
    { id: 21, name: 'Blouse', price: 39.99, originalPrice: 59.99, image: '👚', rating: 4.6, category: 'women', badge: '33% OFF' },
    { id: 22, name: 'Cardigan', price: 44.99, originalPrice: 44.99, image: '🧥', rating: 4.8, category: 'women' },
    { id: 23, name: 'Skirt', price: 34.99, originalPrice: 34.99, image: '👗', rating: 4.7, category: 'women' },
    { id: 24, name: 'Tank Top', price: 19.99, originalPrice: 19.99, image: '👕', rating: 4.5, category: 'women' }
  ],
  kids: [
    { id: 25, name: 'Kids Dress', price: 24.99, originalPrice: 34.99, image: '👗', rating: 4.8, category: 'kids', badge: '29% OFF' },
    { id: 26, name: 'Kids Jeans', price: 29.99, originalPrice: 29.99, image: '👖', rating: 4.7, category: 'kids' },
    { id: 27, name: 'Kids Hoodie', price: 34.99, originalPrice: 44.99, image: '🧥', rating: 4.6, category: 'kids', badge: '23% OFF' },
    { id: 28, name: 'Kids Sneakers', price: 39.99, originalPrice: 39.99, image: '👟', rating: 4.8, category: 'kids' },
    { id: 29, name: 'Kids Cap', price: 14.99, originalPrice: 14.99, image: '🧢', rating: 4.5, category: 'kids' },
    { id: 30, name: 'Kids Backpack', price: 24.99, originalPrice: 24.99, image: '🎒', rating: 4.7, category: 'kids' }
  ],
  accessories: [
    { id: 31, name: 'Sunglasses', price: 29.99, originalPrice: 49.99, image: '🕶️', rating: 4.7, category: 'accessories', badge: '39% OFF' },
    { id: 32, name: 'Watch', price: 89.99, originalPrice: 89.99, image: '⌚', rating: 4.8, category: 'accessories' },
    { id: 33, name: 'Belt', price: 19.99, originalPrice: 29.99, image: '👔', rating: 4.6, category: 'accessories', badge: '34% OFF' },
    { id: 34, name: 'Scarf', price: 14.99, originalPrice: 14.99, image: '🧣', rating: 4.5, category: 'accessories' },
    { id: 35, name: 'Wallet', price: 24.99, originalPrice: 24.99, image: '👛', rating: 4.7, category: 'accessories' },
    { id: 36, name: 'Hat', price: 19.99, originalPrice: 19.99, image: '🧢', rating: 4.6, category: 'accessories' }
  ],
  footwear: [
    { id: 37, name: 'Running Shoes', price: 79.99, originalPrice: 119.99, image: '👟', rating: 4.8, category: 'footwear', badge: '33% OFF' },
    { id: 38, name: 'Formal Shoes', price: 89.99, originalPrice: 89.99, image: '👞', rating: 4.7, category: 'footwear' },
    { id: 39, name: 'Sandals', price: 34.99, originalPrice: 49.99, image: '🩴', rating: 4.6, category: 'footwear', badge: '30% OFF' },
    { id: 40, name: 'Boots', price: 99.99, originalPrice: 99.99, image: '👢', rating: 4.8, category: 'footwear' },
    { id: 41, name: 'Slippers', price: 19.99, originalPrice: 19.99, image: '🩴', rating: 4.5, category: 'footwear' },
    { id: 42, name: 'Heels', price: 69.99, originalPrice: 69.99, image: '👠', rating: 4.7, category: 'footwear' }
  ],
  bags: [
    { id: 43, name: 'Leather Handbag', price: 79.99, originalPrice: 119.99, image: '👜', rating: 4.8, category: 'bags', badge: '33% OFF' },
    { id: 44, name: 'Backpack', price: 49.99, originalPrice: 49.99, image: '🎒', rating: 4.7, category: 'bags' },
    { id: 45, name: 'Clutch', price: 29.99, originalPrice: 39.99, image: '👛', rating: 4.6, category: 'bags', badge: '25% OFF' },
    { id: 46, name: 'Tote Bag', price: 34.99, originalPrice: 34.99, image: '👜', rating: 4.7, category: 'bags' },
    { id: 47, name: 'Crossbody Bag', price: 39.99, originalPrice: 39.99, image: '👜', rating: 4.8, category: 'bags' },
    { id: 48, name: 'Laptop Bag', price: 59.99, originalPrice: 59.99, image: '💼', rating: 4.6, category: 'bags' }
  ],
  jewelry: [
    { id: 49, name: 'Gold Necklace', price: 149.99, originalPrice: 199.99, image: '📿', rating: 4.9, category: 'jewelry', badge: '25% OFF' },
    { id: 50, name: 'Silver Ring', price: 79.99, originalPrice: 79.99, image: '💍', rating: 4.8, category: 'jewelry' },
    { id: 51, name: 'Diamond Earrings', price: 299.99, originalPrice: 399.99, image: '💎', rating: 4.9, category: 'jewelry', badge: '25% OFF' },
    { id: 52, name: 'Bracelet', price: 59.99, originalPrice: 59.99, image: '📿', rating: 4.7, category: 'jewelry' },
    { id: 53, name: 'Pearl Necklace', price: 89.99, originalPrice: 89.99, image: '📿', rating: 4.8, category: 'jewelry' },
    { id: 54, name: 'Anklet', price: 34.99, originalPrice: 34.99, image: '📿', rating: 4.6, category: 'jewelry' }
  ],
  offers: [
    { id: 55, name: 'Flash Sale Bundle', price: 99.99, originalPrice: 199.99, image: '📦', rating: 4.9, category: 'offers', badge: '50% OFF' },
    { id: 56, name: 'Buy 2 Get 1 Free', price: 79.99, originalPrice: 119.99, image: '🎁', rating: 4.8, category: 'offers', badge: '33% OFF' },
    { id: 57, name: 'Weekend Special', price: 129.99, originalPrice: 219.99, image: '🎉', rating: 4.7, category: 'offers', badge: '41% OFF' },
    { id: 58, name: 'Clearance Items', price: 19.99, originalPrice: 39.99, image: '🏷️', rating: 4.6, category: 'offers', badge: '50% OFF' },
    { id: 59, name: 'New Customer Deal', price: 49.99, originalPrice: 99.99, image: '👋', rating: 4.8, category: 'offers', badge: '50% OFF' },
    { id: 60, name: 'Seasonal Sale', price: 69.99, originalPrice: 119.99, image: '🌤️', rating: 4.7, category: 'offers', badge: '42% OFF' }
  ]
};

// Promo banners data
const promoBanners = [
  {
    title: 'Summer Collection',
    description: 'Get 40% off on all summer fashion items',
    buttonText: 'Shop Now',
    color: 'linear-gradient(135deg, #ec4899, #f97316)'
  },
  {
    title: 'Premium Brands',
    description: 'Exclusive deals on designer wear',
    buttonText: 'Explore',
    color: 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
  },
  {
    title: 'Free Shipping',
    description: 'Free shipping on orders above $50',
    buttonText: 'Learn More',
    color: 'linear-gradient(135deg, #10b981, #3b82f6)'
  }
];

// Category configuration
const categories = [
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'topSelling', name: 'Top Selling', icon: '⭐' },
  { id: 'men', name: 'Men', icon: '👨' },
  { id: 'women', name: 'Women', icon: '👩' },
  { id: 'kids', name: 'Kids', icon: '👶' },
  { id: 'accessories', name: 'Accessories', icon: '🕶️' },
  { id: 'footwear', name: 'Footwear', icon: '👟' },
  { id: 'bags', name: 'Bags', icon: '👜' },
  { id: 'jewelry', name: 'Jewelry', icon: '💍' },
  { id: 'offers', name: 'Offers', icon: '🎁' }
];

// Cart management
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('shopping-cart') || '[]');
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
    localStorage.setItem('shopping-cart', JSON.stringify(this.items));
  }

  updateCartCount() {
    // Use the global updateCartCount function if available
    if (window.updateCartCount) {
      window.updateCartCount();
    } else {
      // Fallback to local count
      const count = this.getItemCount();
      const cartCountElements = document.querySelectorAll('#cart-count, #shopping-cart-count');
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
          <i class="fas fa-shopping-cart"></i>
          <h3>Your cart is empty</h3>
          <p>Add some trendy fashion items to get started!</p>
        </div>
      `;
      if (subtotalElement) subtotalElement.textContent = '$0.00';
      return;
    }

    sidebarContent.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">${item.image}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="shoppingCart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="shoppingCart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="shoppingCart.removeItem(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');

    if (subtotalElement) subtotalElement.textContent = `$${this.getTotal().toFixed(2)}`;
  }
}

// Initialize cart
const shoppingCart = new ShoppingCart();

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
  // You can add a custom toast UI here if you want
  console.log(`${type.toUpperCase()}: ${message}`);
}

// Render functions
function renderProductCard(product) {
  const discount = product.originalPrice > product.price;
  const discountPercent = discount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const isWishlisted = isProductInWishlist(product.id);
  return `
    <div class="shopping-product-card" data-id="${product.id}">
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      <div class="product-image">${product.image}</div>
      <div class="shopping-product-info">
        <h3>${product.name}</h3>
        <div class="shopping-product-rating">
          ${generateStars(product.rating)} <span>(${product.rating})</span>
        </div>
        <div class="shopping-product-price">
          ${formatPrice(product.price)}
          ${discount ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <button class="shopping-add-cart-btn" onclick="addToCart(${product.id})">
          <i class="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>
      <button class="wishlist-btn${isWishlisted ? ' wishlisted' : ''}" title="Add to Wishlist" onclick="toggleWishlist(event, ${product.id}, 'shopping')">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;
}

function isProductInWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem('shopping-wishlist') || '[]');
  return wishlist.some(item => item.id === productId);
}

function toggleWishlist(event, productId, category) {
  event.stopPropagation();
  console.log('toggleWishlist called for productId:', productId, 'category:', category);
  let wishlist = JSON.parse(localStorage.getItem('shopping-wishlist') || '[]');
  const product = findProductById(productId);
  console.log('Product found:', product);
  if (!product) return;
  const index = wishlist.findIndex(item => item.id === productId);
  let card = event.target.closest('.shopping-product-card');
  let btn = card ? card.querySelector('.wishlist-btn') : null;
  if (!btn && event.target.classList.contains('wishlist-btn')) btn = event.target;
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from wishlist', 'info');
    if (btn) btn.classList.remove('wishlisted');
  } else {
    wishlist.push({ id: product.id, name: product.name, price: product.price, image: product.image, category });
    showToast('Added to wishlist!', 'success');
    if (btn) btn.classList.add('wishlisted');
  }
  localStorage.setItem('shopping-wishlist', JSON.stringify(wishlist));
  console.log('Shopping Wishlist now:', wishlist);
}

function renderHorizontalSection(categoryId, title, products) {
  const container = document.getElementById(`${categoryId}-container`);
  if (!container) return;

  container.innerHTML = `
    <div class="shopping-horizontal-title">
      <h2>${title}</h2>
      <a href="#" class="view-all-link">View All <i class="fas fa-arrow-right"></i></a>
    </div>
    <button class="shopping-arrow left" onclick="scrollSection('${categoryId}', 'left')">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="shopping-horizontal-scroll" id="${categoryId}-scroll">
      ${products.map(renderProductCard).join('')}
    </div>
    <button class="shopping-arrow right" onclick="scrollSection('${categoryId}', 'right')">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
}

function renderStickyCategories() {
  const categoriesContainer = document.getElementById('shopping-sticky-categories');
  if (!categoriesContainer) {
    console.error('Categories container not found');
    return;
  }

  try {
    categoriesContainer.innerHTML = `
      <div class="category-scroll">
        ${categories.map(category => `
          <button class="category-btn" data-category="${category.id}" onclick="scrollToCategory('${category.id}')">
            <span>${category.icon}</span>
            ${category.name}
          </button>
        `).join('')}
      </div>
    `;
    console.log('Sticky categories rendered successfully');
  } catch (error) {
    console.error('Error rendering sticky categories:', error);
  }
}

function renderPromoBanners() {
  const bannersContainer = document.getElementById('shopping-promo-banners');
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
function scrollSection(sectionId, direction) {
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

function scrollToCategory(categoryId) {
  const section = document.getElementById(`shopping-${categoryId}`);
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
function addToCart(productId) {
  const product = findProductById(productId);
  if (!product) return;

  const quantity = shoppingCart.addItem(product);
  showToast(`${product.name} added to cart!`, 'success');
  
  // Animate the button
  const button = event.target.closest('.shopping-add-cart-btn');
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

function findProductById(productId) {
  for (const category in shoppingData) {
    const product = shoppingData[category].find(p => p.id === productId);
    if (product) return product;
  }
  return null;
}

// Cart sidebar functions
function openCartSidebar() {
  const sidebar = document.getElementById('shopping-cart-sidebar');
  const overlay = document.getElementById('cart-sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartSidebar() {
  const sidebar = document.getElementById('shopping-cart-sidebar');
  const overlay = document.getElementById('cart-sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  
  if (!searchInput || !searchSuggestions) return;

  const allProducts = Object.values(shoppingData).flat();
  
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
        <div class="suggestion-item" onclick="searchProduct('${product.name}')">
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

function searchProduct(productName) {
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
function initializeFlashDeals() {
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const progressElement = document.getElementById('flash-progress');
  
  if (!hoursElement || !minutesElement || !secondsElement) return;

  let totalSeconds = 24 * 60 * 60; // 24 hours in seconds
  
  function updateCountdown() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar
    const progress = ((24 * 60 * 60 - totalSeconds) / (24 * 60 * 60)) * 100;
    if (progressElement) {
      progressElement.style.width = `${Math.min(progress, 100)}%`;
    }
    
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 60 * 60; // Reset to 24 hours
    } else {
      totalSeconds--;
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Promo banner rotation
function initializePromoBanner() {
const promoMessages = [
    'Mega Sale: Up to 70% off on Fashion!',
  'New Arrivals for Men & Women',
    'Free Shipping on orders above $50.',
    'Premium Brands at Discounted Prices!',
    'Flash sale: Limited time offers!'
  ];
  
  let currentIndex = 0;
  const banner = document.getElementById('shopping-promo-banner');
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
function initializeShoppingPage() {
  console.log('Initializing Shopping Page...');
  
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
    Object.entries(shoppingData).forEach(([category, products]) => {
      const categoryConfig = categories.find(c => c.id === category);
      if (categoryConfig) {
        console.log(`Rendering ${category} section...`);
        renderHorizontalSection(`shopping-${category}`, categoryConfig.name, products);
      }
    });

    // Initialize search
    console.log('Initializing search...');
    initializeSearch();
    
    // Initialize promo banner rotation
    console.log('Initializing promo banner...');
    initializePromoBanner();
    
    // Initialize flash deals
    console.log('Initializing flash deals...');
    initializeFlashDeals();
    
    // Initialize cart sidebar
    console.log('Initializing cart...');
    shoppingCart.updateCartSidebar();
    
    // Event listeners
    const floatingCart = document.getElementById('shopping-floating-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-sidebar-overlay');
    
    if (floatingCart) {
      floatingCart.addEventListener('click', openCartSidebar);
      console.log('Floating cart event listener added');
    }
    
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', closeCartSidebar);
      console.log('Close cart event listener added');
    }
    
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCartSidebar);
      console.log('Cart overlay event listener added');
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.onclick = async function() {
        const cartItems = shoppingCart.items || [];
        if (!cartItems.length) {
          showToast('Your cart is empty!', 'error');
          return;
        }
        sessionStorage.setItem('checkout_cart', JSON.stringify(cartItems));
        sessionStorage.setItem('checkout_category', 'shopping');
        window.location.href = 'address.html';
      };
      console.log('Checkout button event listener added');
    }

    console.log('Shopping Page initialized successfully!');
  } catch (error) {
    console.error('Error initializing shopping page:', error);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeShoppingPage);

// Export for global access
window.shoppingCart = shoppingCart;
window.addToCart = addToCart;
window.scrollToCategory = scrollToCategory;
window.scrollSection = scrollSection;
window.openCartSidebar = openCartSidebar;
window.closeCartSidebar = closeCartSidebar;

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