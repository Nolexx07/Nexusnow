// Demo help topics
const helpTopics = [
  { icon: 'fa-box', text: 'Orders & Tracking', keywords: ['order', 'track', 'tracking', 'status', 'shipment'] },
  { icon: 'fa-credit-card', text: 'Payments & Refunds', keywords: ['payment', 'refund', 'card', 'upi', 'wallet'] },
  { icon: 'fa-undo', text: 'Returns & Cancellations', keywords: ['return', 'cancel', 'cancellation', 'refund'] },
  { icon: 'fa-user', text: 'Account & Profile', keywords: ['account', 'profile', 'login', 'register', 'password'] },
  { icon: 'fa-truck', text: 'Delivery & Shipping', keywords: ['delivery', 'shipping', 'address', 'pincode'] },
  { icon: 'fa-tags', text: 'Offers & Coupons', keywords: ['offer', 'coupon', 'discount', 'deal'] },
  { icon: 'fa-question', text: 'FAQs', keywords: ['faq', 'question', 'common'] },
  { icon: 'fa-headset', text: 'Contact Support', keywords: ['contact', 'support', 'help', 'chat', 'call', 'email'] }
];

function filterHelpTopics(query) {
  query = query.trim().toLowerCase();
  const cards = document.querySelectorAll('.help-topic-card');
  helpTopics.forEach((topic, idx) => {
    const match =
      topic.text.toLowerCase().includes(query) ||
      topic.keywords.some(k => k.includes(query));
    cards[idx].style.display = match || !query ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('help-search-input');
  input.addEventListener('input', () => filterHelpTopics(input.value));
  document.getElementById('help-search-btn').onclick = () => filterHelpTopics(input.value);
}); 