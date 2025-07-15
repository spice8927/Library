const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
console.log('Submitting login form...');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Clear previous error messages
  emailError.textContent = '';
  passwordError.textContent = '';

  let isValid = true;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email.';
    isValid = false;
  }

  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Please enter your password.';
    isValid = false;
  }

  if (!isValid) return;

  const formData = new FormData(loginForm);

  try {
    const response = await fetch('login.php', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.location.href = 'dashboard.php';
    }
     else {
      passwordError.textContent = data.message || 'Invalid login.';
    }
  } catch (err) {
    console.error('Login error:', err);
    passwordError.textContent = 'Something went wrong. Try again.';
  }
});
