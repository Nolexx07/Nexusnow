// Initialize AOS (Animate On Scroll) - only if AOS is available
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
}

// Theme toggle (support multiple buttons)
const themeToggles = document.querySelectorAll('#theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggles.forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggles.forEach(btn => {
  btn.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// Search functionality with suggestions
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');
const searchSuggestions = document.getElementById('search-suggestions');

const searchSuggestionsData = [
  { text: 'Fresh Fruits', icon: 'fas fa-apple-alt', category: 'grocery' },
  { text: 'Electronics', icon: 'fas fa-mobile-alt', category: 'shopping' },
  { text: 'Flight Tickets', icon: 'fas fa-plane', category: 'transport' },
  { text: 'Vegetables', icon: 'fas fa-carrot', category: 'grocery' },
  { text: 'Fashion', icon: 'fas fa-tshirt', category: 'shopping' },
  { text: 'Hotels', icon: 'fas fa-hotel', category: 'transport' },
  { text: 'Bakery', icon: 'fas fa-bread-slice', category: 'grocery' },
  { text: 'Home & Garden', icon: 'fas fa-home', category: 'shopping' },
  { text: 'Car Rentals', icon: 'fas fa-car', category: 'transport' }
];

function showSearchSuggestions(query = '') {
  if (!searchSuggestions) return;
  
  const filteredSuggestions = searchSuggestionsData.filter(item =>
    item.text.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filteredSuggestions.length === 0 || !query) {
    searchSuggestions.classList.remove('show');
    return;
  }
  
  searchSuggestions.innerHTML = filteredSuggestions
    .slice(0, 5)
    .map(item => `
      <div class="suggestion-item" data-category="${item.category}">
        <i class="${item.icon}"></i>
        <span>${item.text}</span>
      </div>
    `).join('');
  
  searchSuggestions.classList.add('show');
  
  // Add click handlers to suggestions
  searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      searchInput.value = item.querySelector('span').textContent;
      searchSuggestions.classList.remove('show');
      showToast(`Searching for ${item.querySelector('span').textContent}`, 'info');
      // Navigate to appropriate category
      if (category) {
        showSection(category);
      }
    });
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    showSearchSuggestions(e.target.value);
  });
  
  searchInput.addEventListener('focus', () => {
    if (searchInput.value) {
      showSearchSuggestions(searchInput.value);
    }
  });
  
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (searchSuggestions) {
        searchSuggestions.classList.remove('show');
      }
    }, 200);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        showToast(`Searching for: ${query}`, 'info');
        if (searchSuggestions) {
          searchSuggestions.classList.remove('show');
        }
      }
    }
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      showToast(`Searching for: ${query}`, 'info');
      if (searchSuggestions) {
        searchSuggestions.classList.remove('show');
      }
    }
  });
}

// Countdown Timer
function updateCountdownTimer() {
  const timerElement = document.getElementById('timer1');
  if (!timerElement) return;
  
  const timerDisplay = timerElement.querySelector('.timer-display');
  if (!timerDisplay) return;
  
  const units = timerDisplay.querySelectorAll('.timer-unit');
  if (units.length < 3) return;
  
  let hours = parseInt(units[0].textContent) || 0;
  let minutes = parseInt(units[1].textContent) || 0;
  let seconds = parseInt(units[2].textContent) || 0;
  
  const countdown = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      clearInterval(countdown);
      showToast('Flash sale has ended!', 'warning');
      return;
    }
    
    units[0].textContent = hours.toString().padStart(2, '0');
    units[1].textContent = minutes.toString().padStart(2, '0');
    units[2].textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

// Product Carousel
class ProductCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.track = this.container?.querySelector('.carousel-track');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.currentIndex = 0;
    this.itemWidth = 280; // Width of each product card + gap
    
    if (this.track && this.prevBtn && this.nextBtn) {
      this.init();
    }
  }
  
  init() {
    this.loadProducts();
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.updateButtons();
  }
  
  loadProducts() {
    const products = [
      { name: 'Fresh Apples', price: '$2.99', image: '🍎', category: 'grocery' },
      { name: 'Smartphone', price: '$299', image: '📱', category: 'shopping' },
      { name: 'Flight Ticket', price: '$150', image: '✈️', category: 'transport' },
      { name: 'Organic Milk', price: '$4.99', image: '🥛', category: 'grocery' },
      { name: 'Laptop', price: '$899', image: '💻', category: 'shopping' },
      { name: 'Hotel Booking', price: '$120', image: '🏨', category: 'transport' }
    ];
    
    this.track.innerHTML = products.map(product => `
      <div class="product-card" style="min-width: ${this.itemWidth}px; margin-right: 20px;">
        <div class="product-image" style="height: 120px; display: flex; align-items: center; justify-content: center; font-size: 3.5rem;">${product.image}</div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">${product.price}</p>
          <button class="add-cart-btn">Add to Cart</button>
        </div>
      </div>
    `).join('');
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePosition();
    }
  }
  
  next() {
    const maxIndex = Math.max(0, this.track.children.length - 3);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updatePosition();
    }
  }
  
  updatePosition() {
    this.track.style.transform = `translateX(-${this.currentIndex * this.itemWidth}px)`;
    this.updateButtons();
  }
  
  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= Math.max(0, this.track.children.length - 3);
  }
}

// Testimonials Carousel
class TestimonialsCarousel {
  constructor() {
    this.carousel = document.getElementById('testimonials-carousel');
    this.dotsContainer = document.getElementById('testimonial-dots');
    this.currentIndex = 0;
    this.cards = [];
    
    if (this.carousel) {
      this.init();
    }
  }
  
  init() {
    this.cards = this.carousel.querySelectorAll('.testimonial-card');
    this.createDots();
    this.showCard(0);
    this.startAutoPlay();
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.cards.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'testimonial-dot';
      dot.addEventListener('click', () => this.showCard(i));
      this.dotsContainer.appendChild(dot);
    }
  }
  
  showCard(index) {
    this.cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    
    const dots = this.dotsContainer?.querySelectorAll('.testimonial-dot');
    if (dots) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    this.currentIndex = index;
  }
  
  next() {
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.showCard(nextIndex);
  }
  
  startAutoPlay() {
    setInterval(() => {
      this.next();
    }, 5000);
  }
}

// Newsletter subscription
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterSubmit = document.getElementById('newsletter-submit');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

if (newsletterEmail && newsletterSubmit) {
  newsletterSubmit.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    
    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate subscription
    newsletterSubmit.textContent = 'Subscribing...';
    newsletterSubmit.disabled = true;
    
    setTimeout(() => {
      showToast('Successfully subscribed to newsletter!', 'success');
      newsletterEmail.value = '';
      newsletterSubmit.textContent = 'Subscribe';
      newsletterSubmit.disabled = false;
    }, 1500);
  });
}

// Loading overlay
function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('show');
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('show');
  }
}

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Authentication modal
function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Update authentication UI
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem('nexusnow_user');
  const accountLink = document.querySelector('a[href="#account"]');
  
  if (accountLink) {
    if (isLoggedIn) {
      accountLink.innerHTML = '<i class="fas fa-user"></i><span>Profile</span>';
    } else {
      accountLink.innerHTML = '<i class="fas fa-sign-in-alt"></i><span>Login</span>';
      accountLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAuthModal();
      });
    }
  }
}

// Admin dashboard
function renderAdminDashboard() {
  const adminSection = document.getElementById('admin');
  if (!adminSection) return;
  
  const users = JSON.parse(localStorage.getItem('nexusnow_users') || '[]');
  
  adminSection.innerHTML = `
    <div class="container">
    <h2>Admin Dashboard</h2>
      <div class="admin-grid">
    <div class="admin-block">
          <h3>Users</h3>
          <ul class="admin-users-list">
            ${users.map(user => `
              <li>
                <span>${user.email}</span>
                <button class="remove-user-btn" onclick="removeUser('${user.email}')">Remove</button>
              </li>
            `).join('')}
          </ul>
    </div>
    <div class="admin-block">
          <h3>Statistics</h3>
          <p>Total Users: ${users.length}</p>
          <p>Total Orders: ${JSON.parse(localStorage.getItem('nexusnow_orders') || '[]').length}</p>
        </div>
    </div>
    </div>
  `;
}

// Toast notifications
function showToast(msg, type = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type ? `toast-${type}` : ''}`;
  toast.innerHTML = `
    <span>${msg}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  container.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('toast-show');
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  }, 5000);
}

// Section navigation
function showSection(id) {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    if (section.id === id) {
      section.style.display = 'block';
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (section.classList.contains('product-section')) {
      section.style.display = 'none';
    }
  });
}

// Skeleton loading
function showSkeleton(sectionId, count = 3) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const skeletonHTML = Array(count).fill(`
    <div class="skeleton-card">
      <div class="skeleton-line" style="width: 60%; height: 20px;"></div>
      <div class="skeleton-line" style="width: 40%; height: 16px;"></div>
      <div class="skeleton-line" style="width: 80%; height: 16px;"></div>
    </div>
  `).join('');
  
  section.innerHTML = skeletonHTML;
}

// Make functions globally available
window.showSkeleton = showSkeleton; 
window.showToast = showToast;
window.showSection = showSection;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing Nexusnow...');
  
  // Initialize theme
  updateAuthUI();
  
  // Initialize carousels
  try {
    new ProductCarousel('product-carousel');
    new TestimonialsCarousel();
  } catch (error) {
    console.log('Carousel initialization error:', error);
  }
  
  // Start countdown timer
  try {
    updateCountdownTimer();
  } catch (error) {
    console.log('Timer initialization error:', error);
  }
  
  // Initialize new functionality
  try {
    initTrendingTabs();
    initFlashDeals();
    initTrendingButtons();
    initSpecialOffers();
  } catch (error) {
    console.log('Feature initialization error:', error);
  }
  
  // Start flash timer
  try {
    setInterval(updateFlashTimer, 1000);
  } catch (error) {
    console.log('Flash timer error:', error);
  }
  
  // Add click handlers for navigation
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      showSection(target);
    });
  });
  
  // Show default section (grocery)
  // showSection('grocery'); // Disabled to prevent auto-scroll on home page load
  
  // Add cart functionality
  updateCartCount();
  
  // Add product card click handlers
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('add-cart-btn')) {
      const productCard = e.target.closest('.product-card');
      if (productCard) {
        const productName = productCard.querySelector('h3')?.textContent || 'Product';
        const productPrice = parseFloat(productCard.querySelector('.price')?.textContent.replace('$', '') || '0');
        const productImage = productCard.querySelector('img')?.src || 'https://via.placeholder.com/200x200/2563eb/ffffff?text=PRODUCT';
        
        const product = {
          id: Date.now() + Math.random(),
          name: productName,
          price: productPrice,
          image: productImage,
          category: 'product'
        };
        
        await addToCart(productName, product);
      }
    }
  });
  
  // Hide loading overlay
  hideLoadingOverlay();
  
  console.log('Nexusnow initialization complete!');
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

// Cart functionality
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count, #cart-count, #grocery-cart-count, #shopping-cart-count');
  if (cartCountElements.length > 0) {
    // Get total items from all cart storages
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

function addToCart(productName, productData = null) {
  const cart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
  
  if (productData) {
    // Add product with full data
    const existingItem = cart.find(item => item.id === productData.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: productData.id || Date.now(),
        name: productName,
        price: productData.price || 0,
        image: productData.image || '',
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
  } else {
    // Simple add with just name
    cart.push({
      id: Date.now(),
      name: productName,
      addedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem('nexusnow_cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${productName} added to cart!`, 'success');
}

// Performance monitoring
function measurePerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
    });
  }
}

measurePerformance();

// Flash deals timer
function updateFlashTimer() {
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  if (!hoursElement || !minutesElement || !secondsElement) return;
  
  let hours = parseInt(hoursElement.textContent) || 0;
  let minutes = parseInt(minutesElement.textContent) || 0;
  let seconds = parseInt(secondsElement.textContent) || 0;
  
  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    minutes--;
    seconds = 59;
  } else if (hours > 0) {
    hours--;
    minutes = 59;
    seconds = 59;
  } else {
    // Timer expired
    showToast('Flash deals have ended!', 'info');
    return;
  }
  
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Trending tabs functionality
function initTrendingTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const trendingCards = document.querySelectorAll('.trending-card');
  
  if (tabButtons.length === 0 || trendingCards.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter cards
      trendingCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Flash deal buttons functionality
function initFlashDeals() {
  const dealButtons = document.querySelectorAll('.deal-btn');
  
  dealButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const card = button.closest('.flash-deal-card');
      if (!card) return;
      
      const productName = card.querySelector('h3')?.textContent || 'Product';
      const productPrice = parseFloat(card.querySelector('.deal-price')?.textContent.replace('$', '') || '0');
      const productImage = card.querySelector('.deal-image img')?.src || 'https://via.placeholder.com/200x200/2563eb/ffffff?text=PRODUCT';
      
      const product = {
        id: Date.now() + Math.random(),
        name: productName,
        price: productPrice,
        image: productImage,
        category: 'flash-deal'
      };
      
      // Add to cart animation
      button.textContent = 'Added!';
      button.style.background = '#4ade80';
      
      // Add to cart
      await addToCart(productName, product);
      
      setTimeout(() => {
        button.textContent = 'Buy Now';
        button.style.background = '#ffd700';
      }, 2000);
    });
  });
}

// Trending buttons functionality
function initTrendingButtons() {
  const trendingButtons = document.querySelectorAll('.trending-btn');
  
  trendingButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const card = button.closest('.trending-card');
      if (!card) return;
      
      const productName = card.querySelector('h3')?.textContent || 'Product';
      const productPrice = parseFloat(card.querySelector('.current-price')?.textContent.replace('$', '').replace('/night', '') || '0');
      const productImage = card.querySelector('.trending-image img')?.src || 'https://via.placeholder.com/250x200/2563eb/ffffff?text=PRODUCT';
      const category = card.getAttribute('data-category') || 'trending';
      
      const product = {
        id: Date.now() + Math.random(),
        name: productName,
        price: productPrice,
        image: productImage,
        category: category
      };
      
      // Add to cart animation
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.style.background = '#4ade80';
      
      // Add to cart
      await addToCart(productName, product);
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    });
  });
}

// Special offers functionality
function initSpecialOffers() {
  const offerButtons = document.querySelectorAll('.offer-btn');
  
  offerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const card = button.closest('.offer-card');
      if (!card) return;
      
      const offerName = card.querySelector('h3')?.textContent || 'Offer';
      
      // Subscription animation
      const originalText = button.textContent;
      button.textContent = 'Processing...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.style.background = '#4ade80';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '#ffd700';
          button.disabled = false;
        }, 2000);
      }, 1500);
      
      showToast(`Successfully subscribed to ${offerName}!`, 'success');
    });
  });
}

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
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

// Export floating icon functions
window.openHelpCenter = openHelpCenter;
window.openAboutPage = openAboutPage;

// Test function to add sample items to cart (for testing)
function addSampleItemsToCart() {
  const sampleItems = [
    { id: 1, name: 'Fresh Apples', price: 2.49, image: '🍎', category: 'grocery' },
    { id: 2, name: 'Wireless Headphones', price: 89.99, image: '🎧', category: 'shopping' },
    { id: 3, name: 'Flight Ticket', price: 299.99, image: '✈️', category: 'transport' }
  ];
  
  sampleItems.forEach(item => {
    addToCart(item.name, item);
  });
  
  showToast('Sample items added to cart for testing!', 'success');
}

// Export test function
window.addSampleItemsToCart = addSampleItemsToCart;

// Hamburger menu for responsive navbar
function setupHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', function(e) {
    navLinks.classList.toggle('open');
    e.stopPropagation();
  });
  // Close menu when clicking outside or on a nav link
  document.addEventListener('click', function(e) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
  navLinks.querySelectorAll('a,button').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
document.addEventListener('DOMContentLoaded', setupHamburgerMenu);

 