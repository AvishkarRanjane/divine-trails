import { login, register, getCurrentUser, isAdminUser, getFirebaseErrorMessage } from '../services/authService.js';

document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect
  const currentUser = getCurrentUser();
  if (currentUser) {
    if (isAdminUser(currentUser)) {
      window.location.href = '/admin.html';
    } else {
      window.location.href = '/';
    }
    return;
  }

  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');
  const authTitle = document.getElementById('auth-title');
  const authSubtitle = document.getElementById('auth-subtitle');
  const loginError = document.getElementById('login-error');
  const loginErrorText = document.getElementById('login-error-text');

  function hideError() {
    if (loginError) loginError.classList.remove('show');
  }

  function showError(msg) {
    if (loginErrorText) loginErrorText.textContent = msg;
    if (loginError) {
      loginError.classList.remove('show');
      // Force re-trigger shake animation
      void loginError.offsetWidth;
      loginError.classList.add('show');
    }
  }

  // Tab switching
  tabLogin?.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabSignup?.classList.remove('active');
    formLogin?.classList.add('active');
    formSignup?.classList.remove('active');
    if (authTitle) authTitle.textContent = 'Welcome Back';
    if (authSubtitle) authSubtitle.textContent = 'Login to book your sacred journey.';
    hideError();
  });

  tabSignup?.addEventListener('click', () => {
    tabSignup.classList.add('active');
    tabLogin?.classList.remove('active');
    formSignup?.classList.add('active');
    formLogin?.classList.remove('active');
    if (authTitle) authTitle.textContent = 'Create Account';
    if (authSubtitle) authSubtitle.textContent = 'Join us to explore divine trails.';
    hideError();
  });

  // Login Submit
  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const email = document.getElementById('login-email')?.value.trim();
    const pass = document.getElementById('login-pass')?.value.trim();
    const btnLogin = document.getElementById('btn-login');

    if (!email || !pass) return;

    // Loading state
    if (btnLogin) {
      btnLogin.disabled = true;
      btnLogin.innerHTML = '<span class="spinner"></span> Signing in...';
    }

    try {
      const user = await login(email, pass);

      // Smooth page fade-out
      document.body.style.transition = 'opacity 300ms ease';
      document.body.style.opacity = '0';

      setTimeout(() => {
        if (isAdminUser(user)) {
          window.location.href = '/admin.html';
        } else {
          window.location.href = '/';
        }
      }, 300);
    } catch (err) {
      showError(getFirebaseErrorMessage(err));
    } finally {
      if (btnLogin) {
        btnLogin.disabled = false;
        btnLogin.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login';
      }
    }
  });

  // Signup Submit
  formSignup?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const name = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const pass = document.getElementById('signup-pass')?.value.trim();
    const btnSignup = document.getElementById('btn-signup');

    if (!name || !email || !pass) return;

    if (pass.length < 6) {
      showError('Password must be at least 6 characters long.');
      return;
    }

    // Loading state
    if (btnSignup) {
      btnSignup.disabled = true;
      btnSignup.innerHTML = '<span class="spinner"></span> Creating account...';
    }

    try {
      const user = await register(name, email, pass);

      // Smooth page fade-out
      document.body.style.transition = 'opacity 300ms ease';
      document.body.style.opacity = '0';

      setTimeout(() => {
        if (isAdminUser(user)) {
          window.location.href = '/admin.html';
        } else {
          window.location.href = '/';
        }
      }, 300);
    } catch (err) {
      showError(getFirebaseErrorMessage(err));
    } finally {
      if (btnSignup) {
        btnSignup.disabled = false;
        btnSignup.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';
      }
    }
  });
});
