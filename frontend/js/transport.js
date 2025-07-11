// Transport Page JavaScript
class TransportApp {
  constructor() {
    this.currentTab = 'flights';
    this.searchResults = [];
    this.bookings = this.loadBookings();
    this.promoMessages = [
      'Book Early & Save up to 40% on Flights!',
      'Zero Convenience Fee on Train Bookings',
      'Bus Tickets: Flat $10 Off This Week!',
      'Premium Members Get 15% Extra Discount',
      'Last Minute Deals: Up to 60% Off!'
    ];
    this.promoIndex = 0;
    this.init();
  }

  init() {
    try {
      console.log('Initializing Transport App...');
      this.setupEventListeners();
      this.loadTransportCategories();
      this.loadFeaturedDestinations();
      this.loadTravelDeals();
      this.loadBookingHistory();
      this.startPromoRotation();
      this.initializeAOS();
      this.setMinDates();
      console.log('Transport App initialized successfully');
    } catch (error) {
      console.error('Error initializing Transport App:', error);
      this.showToast('Failed to initialize transport page', 'error');
    }
  }

  setupEventListeners() {
    // Search tabs
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSearch();
      });
    }

    // Search input suggestions
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearchInput(e.target.value);
      });
    }

    // Sort results
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortResults(e.target.value);
      });
    }

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Theme toggle is handled by main.js
    // No need to add event listener here
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    
    // Update active tab
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update form fields based on transport type
    this.updateFormForTransportType(tabName);
  }

  updateFormForTransportType(type) {
    const classSelect = document.getElementById('class');
    if (!classSelect) return;

    switch (type) {
      case 'flights':
        classSelect.innerHTML = `
          <option value="economy">Economy</option>
          <option value="premium-economy">Premium Economy</option>
          <option value="business">Business Class</option>
          <option value="first">First Class</option>
        `;
        break;
      case 'trains':
        classSelect.innerHTML = `
          <option value="second">Second Class</option>
          <option value="first">First Class</option>
          <option value="sleeper">Sleeper</option>
          <option value="premium">Premium</option>
        `;
        break;
      case 'buses':
        classSelect.innerHTML = `
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="luxury">Luxury</option>
        `;
        break;
    }
  }

  setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    if (departureInput) {
      departureInput.min = today;
      departureInput.addEventListener('change', (e) => {
        if (returnInput) {
          returnInput.min = e.target.value;
        }
      });
    }
  }

  handleSearchInput(query) {
    if (query.length < 2) {
      this.hideSearchSuggestions();
      return;
    }

    const suggestions = this.getSearchSuggestions(query);
    this.showSearchSuggestions(suggestions);
  }

  getSearchSuggestions(query) {
    const allCities = [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
      'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
      'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
      'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City',
      'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore',
      'London', 'Paris', 'Tokyo', 'Sydney', 'Toronto', 'Berlin',
      'Madrid', 'Rome', 'Amsterdam', 'Vienna', 'Prague'
    ];

    return allCities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }

  showSearchSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (!suggestionsContainer) return;

    suggestionsContainer.innerHTML = suggestions.map(city => 
      `<div class="suggestion-item" onclick="transportApp.selectSuggestion('${city}')">${city}</div>`
    ).join('');
    suggestionsContainer.style.display = 'block';
  }

  hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
      suggestionsContainer.style.display = 'none';
    }
  }

  selectSuggestion(city) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = city;
    }
    this.hideSearchSuggestions();
  }

  async handleSearch() {
    const formData = new FormData(document.getElementById('search-form'));
    const searchData = {
      from: formData.get('from') || document.getElementById('from').value,
      to: formData.get('to') || document.getElementById('to').value,
      departure: formData.get('departure') || document.getElementById('departure').value,
      return: formData.get('return') || document.getElementById('return').value,
      passengers: formData.get('passengers') || document.getElementById('passengers').value,
      class: formData.get('class') || document.getElementById('class').value,
      type: this.currentTab
    };

    if (!searchData.from || !searchData.to || !searchData.departure) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }

    this.showLoading();
    try {
      const results = await this.searchTransport(searchData);
      this.displaySearchResults(results);
      this.hideLoading();
      document.getElementById('search-results').style.display = 'block';
      document.getElementById('search-results').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Search error:', error);
      this.showToast('Search failed. Please try again.', 'error');
      this.hideLoading();
    }
  }

  async searchTransport(searchData) {
    // Simulate API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockResults = this.generateMockResults(searchData);
    return mockResults;
  }

  generateMockResults(searchData) {
    const results = [];
    const basePrice = this.getBasePrice(searchData.type, searchData.class);
    
    for (let i = 0; i < 8; i++) {
      const departureTime = this.generateDepartureTime(searchData.departure);
      const duration = this.generateDuration(searchData.type);
      const price = this.calculatePrice(basePrice, searchData.passengers, i);
      
      results.push({
        id: `result-${i}`,
        type: searchData.type,
        from: searchData.from,
        to: searchData.to,
        departure: departureTime,
        duration: duration,
        price: price,
        class: searchData.class,
        operator: this.getRandomOperator(searchData.type),
        stops: this.getRandomStops(searchData.type),
        available: Math.floor(Math.random() * 50) + 10
      });
    }

    return results.sort((a, b) => a.price - b.price);
  }

  getBasePrice(type, classType) {
    const basePrices = {
      flights: { economy: 200, 'premium-economy': 350, business: 800, first: 1500 },
      trains: { second: 50, first: 100, sleeper: 150, premium: 200 },
      buses: { standard: 30, premium: 50, luxury: 80 }
    };
    return basePrices[type]?.[classType] || 100;
  }

  generateDepartureTime(date) {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${date} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  generateDuration(type) {
    const durations = {
      flights: [2, 3, 4, 5, 6, 8, 10, 12],
      trains: [1, 2, 3, 4, 5, 6, 8],
      buses: [2, 3, 4, 5, 6, 8, 10]
    };
    const hours = durations[type][Math.floor(Math.random() * durations[type].length)];
    return `${hours}h ${Math.floor(Math.random() * 60)}m`;
  }

  calculatePrice(basePrice, passengers, index) {
    const variation = 0.8 + (Math.random() * 0.4); // ±20% variation
    return Math.round(basePrice * variation * passengers * (1 + index * 0.1));
  }

  getRandomOperator(type) {
    const operators = {
      flights: ['Delta Airlines', 'American Airlines', 'United Airlines', 'Southwest', 'JetBlue'],
      trains: ['Amtrak', 'Metro-North', 'NJ Transit', 'MBTA', 'Caltrain'],
      buses: ['Greyhound', 'Megabus', 'BoltBus', 'Peter Pan', 'Coach USA']
    };
    return operators[type][Math.floor(Math.random() * operators[type].length)];
  }

  getRandomStops(type) {
    if (type === 'flights') {
      return Math.random() > 0.7 ? 1 : 0;
    }
    return Math.floor(Math.random() * 3);
  }

  displaySearchResults(results) {
    this.searchResults = results;
    const resultsGrid = document.getElementById('results-grid');
    if (!resultsGrid) return;

    resultsGrid.innerHTML = results.map(result => `
      <div class="result-card fade-in">
        <div class="result-info">
          <h3>${result.from} → ${result.to}</h3>
          <div class="result-details">
            <span><i class="fas fa-clock"></i> ${result.departure}</span>
            <span><i class="fas fa-hourglass-half"></i> ${result.duration}</span>
            <span><i class="fas fa-building"></i> ${result.operator}</span>
            <span><i class="fas fa-plane"></i> ${result.stops} stop${result.stops !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div class="result-price">
          <div class="price-main">$${result.price}</div>
          <div class="price-per">per passenger</div>
          <button class="book-now-btn" onclick="transportApp.bookTransport('${result.id}')">
            Book Now
          </button>
        </div>
      </div>
    `).join('');
  }

  sortResults(sortBy) {
    if (!this.searchResults.length) return;

    switch (sortBy) {
      case 'price':
        this.searchResults.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        this.searchResults.sort((a, b) => {
          const aHours = parseInt(a.duration.split('h')[0]);
          const bHours = parseInt(b.duration.split('h')[0]);
          return aHours - bHours;
        });
        break;
      case 'departure':
        this.searchResults.sort((a, b) => new Date(a.departure) - new Date(b.departure));
        break;
    }

    this.displaySearchResults(this.searchResults);
  }

  loadTransportCategories() {
    const categories = [
      {
        id: 'flights',
        name: 'Flights',
        icon: 'fas fa-plane',
        description: 'Domestic and international flights with major airlines',
        stats: { routes: '500+', countries: '100+', airlines: '50+' },
        color: '#667eea'
      },
      {
        id: 'trains',
        name: 'Trains',
        icon: 'fas fa-train',
        description: 'High-speed rail and commuter train services',
        stats: { routes: '200+', stations: '1000+', operators: '20+' },
        color: '#764ba2'
      },
      {
        id: 'buses',
        name: 'Buses',
        icon: 'fas fa-bus',
        description: 'Intercity and local bus transportation',
        stats: { routes: '300+', cities: '500+', operators: '30+' },
        color: '#f093fb'
      }
    ];

    const container = document.getElementById('transport-categories');
    if (!container) return;

    container.innerHTML = categories.map(category => `
      <div class="category-card" onclick="transportApp.switchTab('${category.id}')">
        <div class="category-icon" style="background: ${category.color}">
          <i class="${category.icon}"></i>
        </div>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <div class="category-stats">
          <div class="stat">
            <div class="stat-number">${category.stats.routes}</div>
            <div class="stat-label">Routes</div>
          </div>
          <div class="stat">
            <div class="stat-number">${category.stats.countries || category.stats.stations || category.stats.cities}</div>
            <div class="stat-label">${Object.keys(category.stats)[1]}</div>
          </div>
          <div class="stat">
            <div class="stat-number">${category.stats.airlines || category.stats.operators}</div>
            <div class="stat-label">${Object.keys(category.stats)[2]}</div>
          </div>
        </div>
        <button class="category-btn">Explore ${category.name}</button>
      </div>
    `).join('');
  }

  loadFeaturedDestinations() {
    const destinations = [
      {
        name: 'New York City',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80',
        price: 299,
        details: 'The Big Apple - Times Square, Central Park, Broadway',
        type: 'flights'
      },
      {
        name: 'Los Angeles',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=400&q=80',
        price: 399,
        details: 'Hollywood, Venice Beach, Griffith Observatory',
        type: 'flights'
      },
      {
        name: 'Chicago',
        image: 'https://images.unsplash.com/photo-1494522358658-554da8f0d2c5?auto=format&fit=crop&w=400&q=80',
        price: 199,
        details: 'The Windy City - Millennium Park, Navy Pier',
        type: 'flights'
      },
      {
        name: 'San Francisco',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
        price: 349,
        details: 'Golden Gate Bridge, Alcatraz, Fisherman\'s Wharf',
        type: 'flights'
      },
      {
        name: 'Washington DC',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        price: 249,
        details: 'National Mall, Smithsonian Museums, Capitol Hill',
        type: 'flights'
      },
      {
        name: 'Miami',
        image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=400&q=80',
        price: 279,
        details: 'South Beach, Art Deco District, Everglades',
        type: 'flights'
      }
    ];

    const container = document.getElementById('featured-destinations');
    if (!container) return;

    container.innerHTML = destinations.map(dest => `
      <div class="destination-card" onclick="transportApp.selectDestination('${dest.name}')">
        <div class="destination-image" style="background-image: url('${dest.image}')">
          <div class="destination-overlay">
            <h3 class="destination-name">${dest.name}</h3>
          </div>
        </div>
        <div class="destination-content">
          <div class="destination-price">From $${dest.price}</div>
          <div class="destination-details">${dest.details}</div>
          <button class="destination-btn">Book Now</button>
        </div>
      </div>
    `).join('');
  }

  loadTravelDeals() {
    const deals = [
      {
        title: 'Early Bird Flight Deals',
        subtitle: 'Book 30+ days in advance',
        features: [
          'Up to 40% off regular prices',
          'Free seat selection',
          'Priority boarding',
          'Flexible cancellation'
        ],
        price: 199,
        label: 'Starting from'
      },
      {
        title: 'Weekend Getaway Package',
        subtitle: 'Perfect for short trips',
        features: [
          'Round-trip transportation',
          'Hotel accommodation',
          'Local tour guide',
          'Breakfast included'
        ],
        price: 299,
        label: 'Per person'
      },
      {
        title: 'Business Travel Plus',
        subtitle: 'Premium business solutions',
        features: [
          'Business class upgrades',
          'Lounge access',
          'Priority check-in',
          'Dedicated support'
        ],
        price: 599,
        label: 'Starting from'
      }
    ];

    const container = document.getElementById('travel-deals');
    if (!container) return;

    container.innerHTML = deals.map(deal => `
      <div class="deal-card">
        <div class="deal-header">
          <h3 class="deal-title">${deal.title}</h3>
          <p class="deal-subtitle">${deal.subtitle}</p>
        </div>
        <div class="deal-content">
          <ul class="deal-features">
            ${deal.features.map(feature => `
              <li><i class="fas fa-check"></i> ${feature}</li>
            `).join('')}
          </ul>
          <div class="deal-price">
            <div class="price-amount">$${deal.price}</div>
            <div class="price-label">${deal.label}</div>
          </div>
          <button class="deal-btn" onclick="transportApp.selectDeal('${deal.title}')">
            Get This Deal
          </button>
        </div>
      </div>
    `).join('');
  }

  loadBookingHistory() {
    const container = document.getElementById('bookings-grid');
    if (!container) return;

    if (this.bookings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-ticket-alt" style="font-size: 3rem; color: var(--color-text-light); margin-bottom: 1rem;"></i>
          <h3>No bookings yet</h3>
          <p>Start your journey by booking your first trip!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.bookings.map(booking => `
      <div class="booking-card">
        <div class="booking-info">
          <h3>${booking.from} → ${booking.to}</h3>
          <div class="booking-details">
            <span><i class="fas fa-calendar"></i> ${booking.date}</span>
            <span><i class="fas fa-plane"></i> ${booking.mode}</span>
            <span><i class="fas fa-dollar-sign"></i> $${booking.price}</span>
          </div>
        </div>
        <div class="booking-status ${booking.status || 'confirmed'}">
          ${booking.status || 'Confirmed'}
        </div>
      </div>
    `).join('');
  }

  async bookTransport(resultId) {
    const result = this.searchResults.find(r => r.id === resultId);
    if (!result) return;

    this.showLoading();
    try {
      // Create transport order item
      const transportItem = {
        name: `${result.type} Ticket - ${result.from} to ${result.to}`,
        price: result.price,
        quantity: 1,
        category: 'transport'
      };

      // Create order from transport booking
      const order = await createOrder([transportItem], 'transport', 'N/A', 'Credit Card');
      
      if (order) {
        // Also save to local bookings for transport history
        const booking = {
          id: `booking-${Date.now()}`,
          from: result.from,
          to: result.to,
          date: result.departure,
          mode: result.type,
          price: result.price,
          operator: result.operator,
          status: 'confirmed',
          bookedAt: new Date().toISOString()
        };

        this.bookings.unshift(booking);
        this.saveBookings();
        this.loadBookingHistory();

        this.showToast('Transport booking confirmed successfully!', 'success');
        document.getElementById('search-results').style.display = 'none';
        
        console.log('Transport order created successfully:', order);
      }
    } catch (error) {
      console.error('Booking error:', error);
      this.showToast('Booking failed. Please try again.', 'error');
    } finally {
      this.hideLoading();
    }
  }

  selectDestination(destination) {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    if (fromInput && toInput) {
      // Set a default departure city
      fromInput.value = 'Your City';
      toInput.value = destination;
      
      // Scroll to search section
      document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' });
    }
  }

  selectDeal(dealTitle) {
    this.showToast(`Selected: ${dealTitle}`, 'info');
    // Could open a modal with deal details or redirect to booking
  }

  startPromoRotation() {
    setInterval(() => {
      this.promoIndex = (this.promoIndex + 1) % this.promoMessages.length;
      this.updatePromoMessage();
    }, 4000);
  }

  updatePromoMessage() {
    const banner = document.getElementById('transport-promo-banner');
    if (!banner) return;

    const messageElement = banner.querySelector('.promo-message');
    if (messageElement) {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.textContent = this.promoMessages[this.promoIndex];
        messageElement.style.opacity = '1';
      }, 200);
    }
  }

  loadBookings() {
    try {
      const stored = localStorage.getItem('nexusnow_transport_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading bookings:', error);
      return [];
    }
  }

  saveBookings() {
    try {
      localStorage.setItem('nexusnow_transport_bookings', JSON.stringify(this.bookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  }

  showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  showToast(message, type = 'info') {
    if (window.showToast) {
      window.showToast(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }

  // Theme functionality is handled by main.js

  initializeAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
    }
  }
}

// Initialize the app when DOM is loaded
let transportApp;
document.addEventListener('DOMContentLoaded', () => {
  transportApp = new TransportApp();
});

// Global functions for onclick handlers
window.transportApp = transportApp;

// Export functions for global access
window.searchTransport = searchTransport;
window.bookTransport = bookTransport;
window.viewBookingDetails = viewBookingDetails;
window.cancelBooking = cancelBooking;
window.switchSearchTab = switchSearchTab;

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