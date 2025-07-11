// address.js

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('address-form');
  const statusDiv = document.getElementById('address-status');

  form.onsubmit = function(e) {
    e.preventDefault();
    statusDiv.textContent = '';
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    if (!name || !phone || !address || !city || !state || !zip) {
      statusDiv.textContent = 'Please fill all address fields.';
      return;
    }
    const addressObj = { name, phone, address, city, state, zip };
    sessionStorage.setItem('checkout_address', JSON.stringify(addressObj));
    window.location.href = 'payment.html';
  };
}); 