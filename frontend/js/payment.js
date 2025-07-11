// payment.js

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('payment-form');
  const statusDiv = document.getElementById('payment-status');
  const methodInputs = document.querySelectorAll('input[name="method"]');
  const cardFields = document.getElementById('card-fields');
  const upiFields = document.getElementById('upi-fields');
  const codFields = document.getElementById('cod-fields');
  const otherFields = document.getElementById('other-fields');

  // Show/hide fields based on payment method
  methodInputs.forEach(input => {
    input.addEventListener('change', function() {
      cardFields.style.display = this.value === 'card' ? '' : 'none';
      upiFields.style.display = this.value === 'upi' ? '' : 'none';
      codFields.style.display = this.value === 'cod' ? '' : 'none';
      otherFields.style.display = this.value === 'other' ? '' : 'none';
    });
  });

  form.onsubmit = async function(e) {
    e.preventDefault();
    statusDiv.textContent = '';
    const method = document.querySelector('input[name="method"]:checked').value;
    let paymentMethod = '';
    let valid = true;
    if (method === 'card') {
      const cardNumber = document.getElementById('card-number').value.trim();
      const expiry = document.getElementById('expiry').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
      if (!cardNumber || !expiry || !cvv) {
        statusDiv.textContent = 'Please fill all card details.';
        valid = false;
      }
      paymentMethod = `Card (${cardNumber.slice(-4)})`;
    } else if (method === 'upi') {
      const upiId = document.getElementById('upi-id').value.trim();
      if (!upiId) {
        statusDiv.textContent = 'Please enter your UPI ID.';
        valid = false;
      }
      paymentMethod = `UPI (${upiId})`;
    } else if (method === 'cod') {
      paymentMethod = 'Cash on Delivery';
    } else if (method === 'other') {
      const otherDetails = document.getElementById('other-details').value.trim();
      if (!otherDetails) {
        statusDiv.textContent = 'Please enter payment details.';
        valid = false;
      }
      paymentMethod = `Other (${otherDetails})`;
    }
    if (!valid) return;
    // Get cart data and category from sessionStorage
    const cartData = JSON.parse(sessionStorage.getItem('checkout_cart') || '[]');
    const category = sessionStorage.getItem('checkout_category') || 'shopping';
    const addressObj = JSON.parse(sessionStorage.getItem('checkout_address') || 'null');
    let deliveryAddress = 'N/A';
    if (addressObj) {
      deliveryAddress = `${addressObj.name}, ${addressObj.phone}, ${addressObj.address}, ${addressObj.city}, ${addressObj.state}, ${addressObj.zip}`;
    }
    if (!cartData.length) {
      statusDiv.textContent = 'No cart data found.';
      return;
    }
    statusDiv.textContent = 'Processing payment...';
    setTimeout(async () => {
      statusDiv.textContent = 'Placing order...';
      await createOrder(cartData, category, deliveryAddress, paymentMethod);
      // (createOrder will redirect to done.html on success)
      setTimeout(() => {
        window.location.href = 'done.html';
      }, 1200);
    }, 1200);
  };
}); 