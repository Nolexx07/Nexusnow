// Fetch and flatten products from backend
let products = [];
const demoProducts = [
  { name: 'Amul Butter (500g)', brand: 'Amul', category: 'Dairy & Breakfast', price: 3.49, rating: 4.7, img: 'assets/amul-butter.jpg' },
  { name: 'Aashirvaad Atta (5kg)', brand: 'Aashirvaad', category: 'Grocery', price: 5.99, rating: 4.5, img: 'assets/aashirvaad-atta.jpg' },
  { name: 'Britannia Bread (400g)', brand: 'Britannia', category: 'Dairy & Breakfast', price: 1.19, rating: 4.2, img: 'assets/britannia-bread.jpg' },
  { name: 'Mother Dairy Paneer (200g)', brand: 'Mother Dairy', category: 'Dairy & Breakfast', price: 2.49, rating: 4.4, img: 'assets/mother-dairy-paneer.jpg' },
  { name: 'Tata Salt (1kg)', brand: 'Tata', category: 'Grocery', price: 0.99, rating: 4.3, img: 'assets/tata-salt.jpg' },
  { name: 'Amul Cheese Slices (200g)', brand: 'Amul', category: 'Dairy & Breakfast', price: 2.99, rating: 4.5, img: 'assets/amul-cheese.jpg' },
  { name: 'Nestle Milk (1L)', brand: 'Nestle', category: 'Beverages', price: 1.09, rating: 4.3, img: 'assets/nestle-milk.jpg' },
  { name: 'Amul Ghee (500ml)', brand: 'Amul', category: 'Dairy & Breakfast', price: 5.99, rating: 4.6, img: 'assets/amul-ghee.jpg' },
  { name: 'Lays Chips (Classic)', brand: 'Lays', category: 'Snacks', price: 0.89, rating: 4.1, img: 'assets/lays-chips.jpg' },
  { name: 'Coca Cola (1.25L)', brand: 'Coca Cola', category: 'Beverages', price: 1.49, rating: 4.0, img: 'assets/coca-cola.jpg' },
];

async function loadProducts() {
  try {
    const res = await fetch('/api/grocery');
    const data = await res.json();
    // Flatten all products from all categories
    products = data.flatMap(cat => cat.products.map(p => ({
      ...p,
      category: cat.category,
      name: p.name,
      price: p.price,
      img: 'assets/' + (p.image || 'noimg.jpg'),
      rating: Math.round(Math.random() * 2) + 3 + Math.random(), // Simulate rating 3-5
      brand: p.brand || '',
      tags: p.tags || [],
      deal: p.deal || null
    })));
  } catch (e) {
    products = demoProducts;
  }
}

function getAllTags() {
  const tags = new Set();
  products.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
  return Array.from(tags);
}

function getSuggestions(query) {
  if (!query) return [];
  query = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.brand && p.brand.toLowerCase().includes(query)) ||
    (p.category && p.category.toLowerCase().includes(query))
  ).slice(0, 6);
}

function renderSuggestions(suggestions) {
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';
  if (suggestions.length === 0) {
    suggestionsDiv.classList.remove('active');
    return;
  }
  suggestions.forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = `${item.name}`;
    div.onclick = () => {
      document.getElementById('search-input').value = item.name;
      suggestionsDiv.classList.remove('active');
      performSearch();
    };
    suggestionsDiv.appendChild(div);
  });
  suggestionsDiv.classList.add('active');
}

function performSearch() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const category = document.getElementById('filter-category').value;
  const sortBy = document.getElementById('sort-by').value;
  const minPrice = parseFloat(document.getElementById('filter-min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('filter-max-price').value) || 9999;
  const tag = document.getElementById('filter-tag').value;
  const dealOnly = document.getElementById('filter-deal').checked;
  let results = products.filter(p =>
    (p.name.toLowerCase().includes(query) ||
     (p.brand && p.brand.toLowerCase().includes(query)) ||
     (p.category && p.category.toLowerCase().includes(query))) &&
    (category === 'all' || (p.category && p.category.toLowerCase().includes(category))) &&
    (p.price >= minPrice && p.price <= maxPrice) &&
    (tag === 'all' || (p.tags && p.tags.includes(tag))) &&
    (!dealOnly || p.deal)
  );
  if (sortBy === 'price-asc') results.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') results.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  renderResults(results);
}

function renderResults(results) {
  const resultsDiv = document.getElementById('search-results');
  resultsDiv.innerHTML = '';
  if (results.length === 0) {
    resultsDiv.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#b91c1c; font-size:1.1rem;">No products found.</div>';
    return;
  }
  results.forEach(p => {
    const card = document.createElement('div');
    card.className = 'search-result-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="result-name">${p.name}</div>
      <div class="result-brand">${p.brand || ''}</div>
      <div class="result-price">$${p.price.toFixed(2)}</div>
      <div class="result-rating">${'★'.repeat(Math.round(p.rating || 4))}${'☆'.repeat(5 - Math.round(p.rating || 4))}</div>
      ${p.deal ? `<div class="result-deal">${p.deal}</div>` : ''}
      <button class="add-to-cart-btn">Add to Cart</button>
      <button class="add-to-wishlist-btn" title="Add to Wishlist"><i class="fas fa-heart"></i></button>
    `;
    card.querySelector('.add-to-cart-btn').onclick = function() {
      this.textContent = 'Added!';
      this.disabled = true;
      this.style.background = '#16a34a';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.disabled = false;
        this.style.background = '';
      }, 1500);
    };
    card.querySelector('.add-to-wishlist-btn').onclick = async function() {
      this.innerHTML = '<i class="fas fa-heart"></i>';
      this.style.color = '#fff';
      this.style.background = '#b91c1c';
      this.disabled = true;
      try {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: p.id || Math.floor(Math.random()*100000),
            name: p.name,
            price: p.price,
            image: p.img ? p.img.replace('assets/','') : '',
            deal: p.deal || null
          })
        });
      } catch {}
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-heart"></i>';
        this.style.color = '#b91c1c';
        this.style.background = '#fff';
        this.disabled = false;
      }, 1500);
    };
    resultsDiv.appendChild(card);
  });
}

function renderAdvancedFilters() {
  // Price range
  const controls = document.querySelector('.search-controls');
  const priceMin = document.createElement('input');
  priceMin.type = 'number';
  priceMin.id = 'filter-min-price';
  priceMin.placeholder = 'Min $';
  priceMin.style.width = '80px';
  priceMin.min = 0;
  priceMin.step = '0.01';
  controls.appendChild(priceMin);
  const priceMax = document.createElement('input');
  priceMax.type = 'number';
  priceMax.id = 'filter-max-price';
  priceMax.placeholder = 'Max $';
  priceMax.style.width = '80px';
  priceMax.min = 0;
  priceMax.step = '0.01';
  controls.appendChild(priceMax);
  // Tag filter
  const tagSelect = document.createElement('select');
  tagSelect.id = 'filter-tag';
  tagSelect.innerHTML = '<option value="all">All Tags</option>';
  getAllTags().forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    tagSelect.appendChild(opt);
  });
  controls.appendChild(tagSelect);
  // Deal only
  const dealLabel = document.createElement('label');
  dealLabel.style.display = 'flex';
  dealLabel.style.alignItems = 'center';
  dealLabel.style.gap = '4px';
  dealLabel.innerHTML = '<input type="checkbox" id="filter-deal"> Deals Only';
  controls.appendChild(dealLabel);
  // Event listeners
  priceMin.addEventListener('input', performSearch);
  priceMax.addEventListener('input', performSearch);
  tagSelect.addEventListener('change', performSearch);
  dealLabel.querySelector('input').addEventListener('change', performSearch);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  if (document.querySelector('.search-controls')) {
    renderAdvancedFilters();
  }
  const input = document.getElementById('search-input');
  if (input) {
    input.addEventListener('input', () => {
      const suggestions = getSuggestions(input.value);
      renderSuggestions(suggestions);
    });
    input.addEventListener('focus', () => {
      const suggestions = getSuggestions(input.value);
      renderSuggestions(suggestions);
    });
    input.addEventListener('blur', () => {
      setTimeout(() => document.getElementById('suggestions').classList.remove('active'), 120);
    });
  }
  if (document.getElementById('search-btn'))
    document.getElementById('search-btn').onclick = performSearch;
  if (document.getElementById('filter-category'))
    document.getElementById('filter-category').onchange = performSearch;
  if (document.getElementById('sort-by'))
    document.getElementById('sort-by').onchange = performSearch;
  performSearch();
});

// --- INDEX PAGE SEARCH BAR SUPPORT ---
function renderIndexSuggestions(suggestions) {
  const suggestionsDiv = document.getElementById('index-search-suggestions');
  suggestionsDiv.innerHTML = '';
  if (suggestions.length === 0) {
    suggestionsDiv.classList.remove('active');
    return;
  }
  suggestions.forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = `${item.name}`;
    div.onclick = () => {
      document.getElementById('index-search-input').value = item.name;
      suggestionsDiv.classList.remove('active');
      performIndexSearch();
    };
    suggestionsDiv.appendChild(div);
  });
  suggestionsDiv.classList.add('active');
}

function renderIndexResults(results) {
  let modal = document.getElementById('index-search-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'index-search-modal';
    modal.className = 'index-search-modal';
    document.body.appendChild(modal);
  }
  modal.innerHTML = '<button class="close-modal" id="close-index-search-modal">&times;</button>';
  if (results.length === 0) {
    modal.innerHTML += '<div style="padding:2rem; text-align:center; color:#b91c1c; font-size:1.1rem;">No products found.</div>';
  } else {
    results.forEach(p => {
      const card = document.createElement('div');
      card.className = 'search-result-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <div class="result-name">${p.name}</div>
        <div class="result-brand">${p.brand || ''}</div>
        <div class="result-price">$${p.price.toFixed(2)}</div>
        <div class="result-rating">${'★'.repeat(Math.round(p.rating || 4))}${'☆'.repeat(5 - Math.round(p.rating || 4))}</div>
        ${p.deal ? `<div class="result-deal">${p.deal}</div>` : ''}
        <button class="add-to-cart-btn">Add to Cart</button>
        <button class="add-to-wishlist-btn" title="Add to Wishlist"><i class="fas fa-heart"></i></button>
      `;
      modal.appendChild(card);
    });
  }
  modal.style.display = 'block';
  document.getElementById('close-index-search-modal').onclick = () => {
    modal.style.display = 'none';
  };
}

function performIndexSearch() {
  const query = document.getElementById('index-search-input').value.trim().toLowerCase();
  let results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.brand && p.brand.toLowerCase().includes(query)) ||
    (p.category && p.category.toLowerCase().includes(query))
  );
  renderIndexResults(results);
}

// Attach event listeners for index page search bar
if (document.getElementById('index-search-input')) {
  document.getElementById('index-search-input').addEventListener('input', async function() {
    if (products.length === 0) await loadProducts();
    const val = this.value;
    const suggestions = getSuggestions(val);
    renderIndexSuggestions(suggestions);
  });
  document.getElementById('index-search-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      performIndexSearch();
      document.getElementById('index-search-suggestions').classList.remove('active');
    }
  });
  document.querySelector('.search-container .search-btn').addEventListener('click', function() {
    performIndexSearch();
    document.getElementById('index-search-suggestions').classList.remove('active');
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      document.getElementById('index-search-suggestions').classList.remove('active');
    }
  });
} 