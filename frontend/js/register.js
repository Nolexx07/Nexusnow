document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const registerBtn = document.getElementById('registerBtn');
  const registerSpinner = document.getElementById('registerSpinner');
  const registerError = document.getElementById('registerError');
  const passwordInput = document.getElementById('password');

  function isValidEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
  function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  }

  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    registerError.textContent = '';
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!isValidUsername(username)) {
      registerError.textContent = 'Username must be 3-20 characters, letters, numbers, or underscores.';
      return;
    }
    if (!isValidEmail(email)) {
      registerError.textContent = 'Please enter a valid email address.';
      return;
    }
    registerBtn.disabled = true;
    registerSpinner.style.display = 'inline-block';
    try {
      const password = passwordInput.value;
      if (password.length < 6) {
        registerError.textContent = 'Password must be at least 6 characters.';
        return;
      }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = 'login.html?registered=1';
      } else {
        registerError.textContent = data.error || 'Registration failed.';
      }
    } catch (err) {
      registerError.textContent = 'Network error.';
    } finally {
      registerBtn.disabled = false;
      registerSpinner.style.display = 'none';
    }
  });
}); 