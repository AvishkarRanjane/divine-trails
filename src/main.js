import './styles/style.css';
import { subscribeAuth, getCurrentUser, logout } from './services/authService.js';
import { 
  getPackages, 
  subscribePackages, 
  createBooking, 
  getBookings,
  getReviews,
  addReview 
} from './services/dataService.js';

let packagesList = [];
let selectedPackage = null;
let currentRating = 5;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initAuthUserNav();
  initDataSync();
  initSearchAndFilter();
  initBookingForm();
  initReviewsForm();
  initLightbox();
});

// Theme switcher
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('divineTrailsTheme') || 'light';
  root.setAttribute('data-theme', saved);

  if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    if (icon) icon.className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('divineTrailsTheme', next);
      if (icon) icon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }
}

// Navbar & Header Scroll
function initNavbar() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navbar = document.querySelector('.navbar');
  const backdrop = document.getElementById('navbar-backdrop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
      backdrop?.classList.toggle('active');
    });

    backdrop?.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
      backdrop.classList.remove('active');
    });
  }
}

// Auth state nav button / user profile menu
function initAuthUserNav() {
  const userContainer = document.getElementById('user-nav-container');

  subscribeAuth((user) => {
    if (!userContainer) return;

    if (user && user.email) {
      const isAdm = user.email.toLowerCase() === 'mr.avishkarranjane07@gmail.com';
      const initials = (user.name || user.email).charAt(0).toUpperCase();

      userContainer.innerHTML = `
        <div class="user-dropdown-container">
          <button class="user-dropdown-toggle" id="user-dropdown-btn">
            <span class="user-avatar-icon">${initials}</span>
            <span>${user.name || 'Pilgrim'}</span>
            <i class="fa-solid fa-chevron-down" style="font-size:0.75rem;"></i>
          </button>
          <div class="user-dropdown-menu" id="user-dropdown-menu">
            <div class="user-dropdown-header">
              <strong>${user.name || 'Pilgrim'}</strong>
              <small>${user.email}</small>
            </div>
            ${isAdm ? `<a href="/admin.html" class="dropdown-item"><i class="fa-solid fa-gauge"></i> Admin Dashboard</a>` : ''}
            <button class="dropdown-item" id="btn-view-bookings"><i class="fa-solid fa-suitcase"></i> My Bookings</button>
            <button class="dropdown-item logout-item" id="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
          </div>
        </div>
      `;

      const dropdownBtn = document.getElementById('user-dropdown-btn');
      const dropdownMenu = document.getElementById('user-dropdown-menu');

      dropdownBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu?.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        dropdownMenu?.classList.remove('show');
      });

      document.getElementById('btn-logout')?.addEventListener('click', async () => {
        await logout();
        window.location.reload();
      });

      document.getElementById('btn-view-bookings')?.addEventListener('click', () => {
        renderUserBookingsModal();
      });

    } else {
      userContainer.innerHTML = `
        <a href="/auth.html" id="auth-btn" class="btn btn-outline" style="padding: 6px 16px; font-size: 0.9rem; margin-right: 8px;">Login / Sign Up</a>
      `;
    }
  });
}

// Data synchronization & package rendering
function initDataSync() {
  packagesList = getPackages();
  renderPackages(packagesList);
  renderReviewsList(getReviews());

  subscribePackages((updated) => {
    packagesList = updated;
    renderPackages(packagesList);
  });
}

// Render Packages
function renderPackages(list) {
  const container = document.getElementById('packages-container');
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `
      <div class="no-results-msg">
        <i class="fa-solid fa-compass"></i>
        <h3>No packages found</h3>
        <p>Try adjusting your search filter</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(pkg => `
    <div class="package-card" data-id="${pkg.id}">
      <div class="package-img-wrapper">
        <img src="${pkg.image}" alt="${escapeHtml(pkg.title)}" loading="lazy">
        ${pkg.badge ? `<span class="package-badge">${escapeHtml(pkg.badge)}</span>` : ''}
      </div>
      <div class="package-content">
        <h3 class="package-title">${escapeHtml(pkg.title)}</h3>
        <div class="package-info-grid">
          <div class="package-info-item"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(pkg.location)}</div>
          <div class="package-info-item"><i class="fa-regular fa-clock"></i> ${escapeHtml(pkg.duration)}</div>
          <div class="package-info-item"><i class="fa-solid fa-users"></i> ${escapeHtml(pkg.groupSize)}</div>
          <div class="package-info-item"><i class="fa-solid fa-star" style="color:#FFA000;"></i> ${pkg.rating || 5.0} (${pkg.reviewsCount || 10})</div>
        </div>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:12px;">${escapeHtml(pkg.description || '')}</p>
        <div class="package-footer">
          <div class="package-price">${escapeHtml(pkg.price)} <span>/ person</span></div>
          <button class="btn btn-primary btn-book-pkg" data-id="${pkg.id}">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-book-pkg').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const found = packagesList.find(p => p.id === id);
      if (found) openBookingModal(found);
    });
  });
}

// Search and Filter
function initSearchAndFilter() {
  const searchInput = document.getElementById('package-search');
  const sortSelect = document.getElementById('package-sort');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function applyFilters() {
    let result = [...packagesList];
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    if (query) {
      result = result.filter(p => p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query));
    }

    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    if (activeFilter !== 'all') {
      result = result.filter(p => p.badge?.toLowerCase() === activeFilter.toLowerCase());
    }

    if (sortSelect) {
      const val = sortSelect.value;
      if (val === 'price-low') {
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      } else if (val === 'price-high') {
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      } else if (val === 'rating') {
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }

    renderPackages(result);
  }

  searchInput?.addEventListener('input', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
}

function parsePrice(str) {
  if (!str) return 0;
  return parseInt(str.replace(/[^\d]/g, ''), 10) || 0;
}

// Booking Modal
function openBookingModal(pkg) {
  selectedPackage = pkg;
  const modal = document.getElementById('booking-modal');
  const overlay = document.getElementById('modal-overlay');
  const pkgTitleInput = document.getElementById('booking-pkg-title');

  if (pkgTitleInput) pkgTitleInput.value = pkg.title;

  modal?.classList.add('active');
  overlay?.classList.add('active');

  const closeBtn = modal?.querySelector('.modal-close');
  if (closeBtn) closeBtn.onclick = closeModals;
  if (overlay) overlay.onclick = closeModals;
}

function closeModals() {
  document.querySelectorAll('.modal, .modal-overlay').forEach(el => el.classList.remove('active'));
}

// Booking form submission
function initBookingForm() {
  const form = document.getElementById('contact-form') || document.getElementById('booking-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('booking-name')?.value.trim();
    const email = document.getElementById('booking-email')?.value.trim();
    const phone = document.getElementById('booking-phone')?.value.trim();
    const travelers = document.getElementById('booking-travelers')?.value || "1";
    const date = document.getElementById('booking-date')?.value || new Date().toISOString().split('T')[0];
    const pkgName = selectedPackage ? selectedPackage.title : (document.getElementById('booking-pkg-title')?.value || "Temple Yatra");

    if (name && email && phone) {
      await createBooking({
        userName: name,
        userEmail: email,
        phone: phone,
        packageName: pkgName,
        travelers: travelers,
        travelDate: date
      });

      closeModals();
      showToast('Booking submitted successfully! Our pilgrim guide will contact you shortly.');
      form.reset();
    }
  });
}

// User Bookings Modal
function renderUserBookingsModal() {
  const modal = document.getElementById('user-bookings-modal');
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('user-bookings-body');
  const user = getCurrentUser();

  if (!user || !body) return;

  const bookings = getBookings().filter(b => b.userEmail?.toLowerCase() === user.email?.toLowerCase());

  if (bookings.length === 0) {
    body.innerHTML = `
      <div class="no-bookings">
        <i class="fa-solid fa-box-open"></i>
        <p>No bookings found for ${escapeHtml(user.email)}</p>
      </div>
    `;
  } else {
    body.innerHTML = bookings.map(b => `
      <div class="booking-card">
        <div class="booking-card-header">
          <span class="booking-ref">${b.id}</span>
          <span class="booking-badge">${b.status || 'Confirmed'}</span>
        </div>
        <div><strong>${escapeHtml(b.packageName)}</strong></div>
        <div class="booking-details-grid">
          <div class="booking-detail-item"><i class="fa-regular fa-calendar"></i> ${b.travelDate || 'Flexible'}</div>
          <div class="booking-detail-item"><i class="fa-solid fa-user-group"></i> ${b.travelers} Travelers</div>
        </div>
      </div>
    `).join('');
  }

  modal?.classList.add('active');
  overlay?.classList.add('active');

  modal?.querySelector('.modal-close')?.addEventListener('click', closeModals);
  overlay?.addEventListener('click', closeModals);
}

// Reviews & Rating
function initReviewsForm() {
  const stars = document.querySelectorAll('.star-rating i');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.getAttribute('data-value'), 10) || 5;
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        s.className = val <= currentRating ? 'fa-solid fa-star active' : 'fa-regular fa-star';
      });
    });
  });

  const reviewForm = document.getElementById('feedback-form');
  reviewForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const comment = document.getElementById('feedback-text')?.value.trim();

    if (comment) {
      await addReview({
        name: user ? user.name : "Devotee Pilgrim",
        rating: currentRating,
        comment: comment,
        location: "India"
      });

      renderReviewsList(getReviews());
      showToast('Thank you for sharing your spiritual experience!');
      reviewForm.reset();
    }
  });
}

function renderReviewsList(reviews) {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  container.innerHTML = reviews.map(r => `
    <div class="testimonial-card">
      <div class="stars">${'★'.repeat(r.rating || 5)}</div>
      <p class="test-text">"${escapeHtml(r.comment)}"</p>
      <div class="test-author">
        <h4>${escapeHtml(r.name)}</h4>
        <span>${escapeHtml(r.location || 'Pilgrim')}</span>
      </div>
    </div>
  `).join('');
}

// Lightbox
function initLightbox() {
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
