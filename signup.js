const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmError').textContent = '';

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  let isValid = true;

  if (fullName.length < 3) {
    document.getElementById('nameError').textContent = 'Full name is too short.';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid email format.';
    isValid = false;
  }

  if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
    isValid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById('confirmError').textContent = 'Passwords do not match.';
    isValid = false;
  }

  if (!isValid) return;

  const formData = new FormData(signupForm);

  try {
    const response = await fetch('signup.php', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert('Signup successful! Redirecting to login...');
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'Signup failed.');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong.');
  }
});
