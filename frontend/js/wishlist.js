// Wishlist logic using backend API
const demoWishlist = [
  { id: 1, name: 'Amul Butter (500g)', price: 3.49, img: 'assets/amul-butter.jpg', deal: '19% OFF' },
  { id: 2, name: 'Aashirvaad Atta (5kg)', price: 5.99, img: 'assets/aashirvaad-atta.jpg', deal: '5% OFF' },
  { id: 3, name: 'Britannia Bread (400g)', price: 1.19, img: 'assets/britannia-bread.jpg', deal: null }
];

let groceryWishlist = [];
let shoppingWishlist = [];

function loadWishlists() {
  groceryWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  shoppingWishlist = JSON.parse(localStorage.getItem('shopping-wishlist') || '[]');
}

function saveWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(groceryWishlist));
  localStorage.setItem('shopping-wishlist', JSON.stringify(shoppingWishlist));
}

function addToWishlist(item) {
  if (!groceryWishlist.some(w => w.id === item.id)) {
    groceryWishlist.push(item);
    saveWishlist();
    renderWishlist();
  }
}

function removeFromWishlist(id) {
  groceryWishlist = groceryWishlist.filter(item => item.id !== id);
  saveWishlist();
  renderWishlist();
}

function clearWishlist() {
  groceryWishlist = [];
  shoppingWishlist = [];
  saveWishlist();
  renderWishlist();
}

function renderWishlist() {
  const grid = document.getElementById('wishlist-results');
  const emptyMsg = document.getElementById('wishlist-empty');
  grid.innerHTML = '';
  loadWishlists();

  // Grocery Wishlist Section
  if (groceryWishlist.length) {
    const groceryHeader = document.createElement('h2');
    groceryHeader.textContent = 'Grocery Wishlist';
    grid.appendChild(groceryHeader);
    groceryWishlist.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wishlist-card';
      card.innerHTML = `
        <button class="remove-btn" title="Remove from wishlist"><i class="fas fa-times"></i></button>
        <img src="${item.img || item.image || 'assets/noimg.jpg'}" alt="${item.name}" />
        <div class="wishlist-name">${item.name}</div>
        <div class="wishlist-price">$${item.price.toFixed(2)}</div>
        ${item.deal ? `<div class="wishlist-deal">${item.deal}</div>` : ''}
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
      card.querySelector('.remove-btn').onclick = function(e) {
        e.stopPropagation();
        groceryWishlist = groceryWishlist.filter(w => w.id !== item.id);
        localStorage.setItem('wishlist', JSON.stringify(groceryWishlist));
        renderWishlist();
      };
      card.querySelector('.add-to-cart-btn').onclick = function() {
        // Add to mixed cart in localStorage
        let cart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
        if (!cart.some(ci => ci.id === item.id)) {
          cart.push({ ...item, quantity: 1 });
          localStorage.setItem('nexusnow_cart', JSON.stringify(cart));
          updateFloatingCartCount();
          if (window.updateCartCount) window.updateCartCount();
        }
        this.textContent = 'Added!';
        this.disabled = true;
        this.style.background = '#16a34a';
        setTimeout(() => {
          this.textContent = 'Add to Cart';
          this.disabled = false;
          this.style.background = '';
        }, 1500);
      };
      grid.appendChild(card);
    });
  }

  // Shopping Wishlist Section
  if (shoppingWishlist.length) {
    const shoppingHeader = document.createElement('h2');
    shoppingHeader.textContent = 'Shopping Wishlist';
    grid.appendChild(shoppingHeader);
    shoppingWishlist.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wishlist-card';
      card.innerHTML = `
        <button class="remove-btn" title="Remove from wishlist"><i class="fas fa-times"></i></button>
        <img src="${item.img || item.image || 'assets/noimg.jpg'}" alt="${item.name}" />
        <div class="wishlist-name">${item.name}</div>
        <div class="wishlist-price">$${item.price.toFixed(2)}</div>
        ${item.deal ? `<div class="wishlist-deal">${item.deal}</div>` : ''}
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
      card.querySelector('.remove-btn').onclick = function(e) {
        e.stopPropagation();
        shoppingWishlist = shoppingWishlist.filter(w => w.id !== item.id);
        localStorage.setItem('shopping-wishlist', JSON.stringify(shoppingWishlist));
        renderWishlist();
      };
      card.querySelector('.add-to-cart-btn').onclick = function() {
        // Add to mixed cart in localStorage
        let cart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
        if (!cart.some(ci => ci.id === item.id)) {
          cart.push({ ...item, quantity: 1 });
          localStorage.setItem('nexusnow_cart', JSON.stringify(cart));
          updateFloatingCartCount();
          if (window.updateCartCount) window.updateCartCount();
        }
        this.textContent = 'Added!';
        this.disabled = true;
        this.style.background = '#16a34a';
        setTimeout(() => {
          this.textContent = 'Add to Cart';
          this.disabled = false;
          this.style.background = '';
        }, 1500);
      };
      grid.appendChild(card);
    });
  }

  if (!groceryWishlist.length && !shoppingWishlist.length) {
    grid.style.display = 'none';
    emptyMsg.style.display = 'flex';
  } else {
    grid.style.display = 'grid';
    emptyMsg.style.display = 'none';
  }
}

// Only run DOM logic if on the wishlist page
if (document.getElementById('wishlist-results') && document.getElementById('wishlist-empty')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
  });
}

// Expose wishlist functions globally for shopping.js
window.loadWishlist = loadWishlists;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.clearWishlist = clearWishlist;

// Floating cart logic
function updateFloatingCartCount() {
  const cart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const el = document.getElementById('floating-cart-count');
  if (el) el.textContent = count;
}

function renderMixedCartSidebar() {
  const cart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
  const itemsDiv = document.getElementById('mixed-cart-items');
  const subtotalSpan = document.getElementById('mixed-cart-subtotal');
  if (!itemsDiv || !subtotalSpan) return;
  if (!cart.length) {
    itemsDiv.innerHTML = '<div class="cart-empty-msg">Your cart is empty.</div>';
    subtotalSpan.textContent = '$0.00';
    return;
  }
  let subtotal = 0;
  itemsDiv.innerHTML = cart.map(item => {
    const itemTotal = (item.price * (item.quantity || 1));
    subtotal += itemTotal;
    return `<div class="cart-sidebar-item">
      <div class="cart-sidebar-item-name">${item.name}</div>
      <div class="cart-sidebar-item-qty">Qty: ${item.quantity || 1}</div>
      <div class="cart-sidebar-item-price">$${itemTotal.toFixed(2)}</div>
    </div>`;
  }).join('');
  subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
  updateFloatingCartCount();
  // Floating cart open/close
  const openBtn = document.getElementById('open-mixed-cart');
  const sidebar = document.getElementById('mixed-cart-sidebar');
  const overlay = document.getElementById('cart-sidebar-overlay');
  const closeBtn = document.getElementById('close-mixed-cart');
  if (openBtn && sidebar && overlay) {
    openBtn.onclick = function(e) {
      e.preventDefault();
      sidebar.classList.add('open');
      overlay.style.display = 'block';
      renderMixedCartSidebar();
    };
    closeBtn.onclick = function() {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
    };
    overlay.onclick = function() {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
    };
  }
  // Checkout button
  const checkoutBtn = document.getElementById('mixed-cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.onclick = function() {
      const cart = JSON.parse(localStorage.getItem('nexusnow_cart') || '[]');
      if (!cart.length) {
        alert('Your cart is empty!');
        return;
      }
      sessionStorage.setItem('checkout_cart', JSON.stringify(cart));
      sessionStorage.setItem('checkout_category', 'mixed');
      window.location.href = 'address.html';
    };
  }
}); 