import '../styles/style.css';
import { login, register, getCurrentUser, isAdminUser } from '../services/authService.js';

document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect
  const currentUser = getCurrentUser();
  if (currentUser) {
    if (isAdminUser(currentUser)) {
      window.location.href = '/admin.html';
      return;
    } else {
      window.location.href = '/';
      return;
    }
  }

  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');
  const titleText = document.querySelector('.auth-header h2');
  const subtitleText = document.querySelector('.auth-header p');
  const loginError = document.getElementById('login-error');

  tabLogin?.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    formLogin.classList.add('active');
    formSignup.classList.remove('active');
    if (titleText) titleText.innerText = 'Welcome Back';
    if (subtitleText) subtitleText.innerText = 'Login to book your sacred journey.';
  });

  tabSignup?.addEventListener('click', () => {
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    formSignup.classList.add('active');
    formLogin.classList.remove('active');
    if (titleText) titleText.innerText = 'Create Account';
    if (subtitleText) subtitleText.innerText = 'Join us to explore divine trails.';
  });

  // Login Submit
  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value.trim();
    const pass = document.getElementById('login-pass')?.value.trim();

    if (email && pass) {
      try {
        const user = await login(email, pass);
        if (isAdminUser(user)) {
          window.location.href = '/admin.html';
        } else {
          window.location.href = '/';
        }
      } catch (err) {
        if (loginError) {
          loginError.innerText = err.message || 'Invalid credentials. Please try again.';
          loginError.classList.add('show');
        }
      }
    }
  });

  // Signup Submit
  formSignup?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const pass = document.getElementById('signup-pass')?.value.trim();

    if (name && email && pass && pass.length >= 6) {
      try {
        const user = await register(name, email, pass);
        if (isAdminUser(user)) {
          window.location.href = '/admin.html';
        } else {
          window.location.href = '/';
        }
      } catch (err) {
        alert(err.message || 'Registration failed');
      }
    }
  });
});
