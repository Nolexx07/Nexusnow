document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const loginSpinner = document.getElementById('loginSpinner');
  const loginError = document.getElementById('loginError');
  const passwordInput = document.getElementById('password');

  function isValidEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    loginError.textContent = '';
    const email = document.getElementById('email').value.trim();
    if (!isValidEmail(email)) {
      loginError.textContent = 'Please enter a valid email address.';
      return;
    }
    loginBtn.disabled = true;
    loginSpinner.style.display = 'inline-block';
    try {
      const password = passwordInput.value;
      if (!password) {
        loginError.textContent = 'Password is required.';
        return;
      }
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('nexusnow_token', data.token);
        // Store user info for profile page
        if (data.user) {
          localStorage.setItem('nexusnow_user', JSON.stringify(data.user));
        } else {
          // Fallback: store minimal info
          localStorage.setItem('nexusnow_user', JSON.stringify({ email: email, firstName: '', lastName: '' }));
        }
        window.location.href = 'profile.html';
      } else {
        loginError.textContent = data.error || 'Login failed.';
      }
    } catch (err) {
      loginError.textContent = 'Network error.';
    } finally {
      loginBtn.disabled = false;
      loginSpinner.style.display = 'none';
    }
  });
}); 