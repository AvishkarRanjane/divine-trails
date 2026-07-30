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
let galleryImages = [];
let currentGalleryIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initScrollSpy();
  initScrollReveal();
  initHeroCounters();
  initAuthUserNav();
  initDataSync();
  initSearchAndFilter();
  initBookingForm();
  initReviewsForm();
  initLightbox();
  initFAQ();
  initFloatingWidget();
  initNewsletter();
});

/* ========================================================================
   THEME SWITCHER
   ======================================================================== */
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

/* ========================================================================
   NAVBAR & HEADER
   ======================================================================== */
function initNavbar() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  const backdrop = document.getElementById('navbar-backdrop');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Scroll-based glass header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('active');
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');

      if (backdrop) {
        if (!isOpen) {
          backdrop.style.display = 'block';
          requestAnimationFrame(() => backdrop.classList.add('active'));
          document.body.style.overflow = 'hidden';
        } else {
          closeMobileNav();
        }
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileNav);
    }
  }

  // Close mobile nav on link click + smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileNav();
    });
  });

  function closeMobileNav() {
    if (hamburger) hamburger.classList.remove('active');
    if (navbar) navbar.classList.remove('active');
    if (backdrop) {
      backdrop.classList.remove('active');
      setTimeout(() => { backdrop.style.display = ''; }, 350);
    }
    document.body.style.overflow = '';
  }
}

/* ========================================================================
   SCROLL SPY — Active nav link
   ======================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

/* ========================================================================
   SCROLL REVEAL — Apple-style fade-up on intersection
   ======================================================================== */
function initScrollReveal() {
  const animateElements = document.querySelectorAll('[data-animate]');
  const staggerElements = document.querySelectorAll('[data-animate-stagger]');
  const allElements = [...animateElements, ...staggerElements];

  if (allElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  allElements.forEach(el => observer.observe(el));
}

/* ========================================================================
   HERO COUNTER ANIMATION
   ======================================================================== */
function initHeroCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();
  const suffix = target >= 1000 ? '+' : '+';

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (target >= 10000) {
      el.textContent = current.toLocaleString('en-IN') + '+';
    } else {
      el.textContent = current + '+';
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ========================================================================
   AUTH USER NAV — Login button or user dropdown
   ======================================================================== */
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
            <span>${escapeHtml(user.name || 'Pilgrim')}</span>
            <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;"></i>
          </button>
          <div class="user-dropdown-menu" id="user-dropdown-menu">
            <div class="user-dropdown-header">
              <strong>${escapeHtml(user.name || 'Pilgrim')}</strong>
              <small>${escapeHtml(user.email)}</small>
            </div>
            ${isAdm ? `<a href="/admin.html" class="dropdown-item"><i class="fa-solid fa-gauge"></i> Admin Dashboard</a>` : ''}
            <button class="dropdown-item" id="btn-view-bookings"><i class="fa-solid fa-suitcase"></i> My Bookings</button>
            <button class="dropdown-item logout-item" id="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
          </div>
        </div>
      `;

      const dropdownBtn = document.getElementById('user-dropdown-btn');
      const dropdownMenu = document.getElementById('user-dropdown-menu');

      if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (dropdownMenu) dropdownMenu.classList.toggle('show');
        });
      }

      document.addEventListener('click', () => {
        if (dropdownMenu) dropdownMenu.classList.remove('show');
      });

      const logoutBtn = document.getElementById('btn-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
          await logout();
          window.location.reload();
        });
      }

      const viewBookingsBtn = document.getElementById('btn-view-bookings');
      if (viewBookingsBtn) {
        viewBookingsBtn.addEventListener('click', () => {
          renderUserBookingsModal();
        });
      }
    } else {
      userContainer.innerHTML = `
        <a href="/auth.html" id="auth-btn" class="btn btn-outline" style="padding: 8px 20px; font-size: 0.88rem;">Login / Sign Up</a>
      `;
    }
  });
}

/* ========================================================================
   DATA SYNC — Packages & Reviews
   ======================================================================== */
function initDataSync() {
  packagesList = getPackages();
  renderPackages(packagesList);
  renderReviewsList(getReviews());

  subscribePackages((updated) => {
    packagesList = updated;
    applyCurrentFilters();
  });
}

/* ========================================================================
   RENDER PACKAGES
   ======================================================================== */
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
      <div class="package-img-wrapper btn-card-details" data-id="${pkg.id}">
        <img src="${pkg.image}" alt="${escapeHtml(pkg.title)}" loading="lazy">
        ${pkg.badge ? `<span class="package-badge">${escapeHtml(pkg.badge)}</span>` : ''}
      </div>
      <div class="package-content">
        <h3 class="package-title btn-card-details" data-id="${pkg.id}" style="cursor:pointer;">${escapeHtml(pkg.title)}</h3>
        <div class="package-info-grid">
          <div class="package-info-item"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(pkg.location)}</div>
          <div class="package-info-item"><i class="fa-regular fa-clock"></i> ${escapeHtml(pkg.duration)}</div>
          <div class="package-info-item"><i class="fa-solid fa-users"></i> ${escapeHtml(pkg.groupSize || 'Flexible')}</div>
          <div class="package-info-item"><i class="fa-solid fa-star" style="color:#FFA000;"></i> ${pkg.rating || 5.0} (${pkg.reviewsCount || 0})</div>
        </div>
        <p style="font-size:0.9rem; color:var(--text-2); margin-bottom:14px;">${escapeHtml(pkg.description || '')}</p>
        <div class="package-footer">
          <div class="package-price">${escapeHtml(pkg.price)} <span>/ person</span></div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline btn-view-details" data-id="${pkg.id}" style="padding:8px 14px; font-size:0.82rem;">Details</button>
            <button class="btn btn-primary btn-book-pkg" data-id="${pkg.id}" style="padding:8px 16px; font-size:0.82rem;">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // "View Details" click
  container.querySelectorAll('.btn-view-details, .btn-card-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const found = packagesList.find(p => p.id === id);
      if (found) openPackageDetailsModal(found);
    });
  });

  // "Book Now" click → pre-fill contact form & scroll
  container.querySelectorAll('.btn-book-pkg').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const found = packagesList.find(p => p.id === id);
      if (found) {
        selectedPackage = found;
        const pkgTitleInput = document.getElementById('booking-pkg-title');
        if (pkgTitleInput) pkgTitleInput.value = found.title;
        
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ========================================================================
   PACKAGE DETAILS MODAL (Detailed Path, Itinerary, Spots, Inclusions)
   ======================================================================== */
function openPackageDetailsModal(pkg) {
  selectedPackage = pkg;
  const modal = document.getElementById('pkg-details-modal');
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('pkg-details-body');

  if (!modal || !body) return;

  const itineraryList = pkg.itinerary || [];
  const inclusionsList = pkg.inclusions || [
    "Special VIP Darshan Assistance",
    "Deluxe Hotel Stay (Double/Triple Sharing)",
    "Pure Veg Sattvic Breakfast & Dinner",
    "AC Vehicle Transfers & Sightseeing",
    "Experienced Pilgrim Guide Support"
  ];

  body.innerHTML = `
    <div class="pkg-modal-header">
      <img src="${pkg.image}" alt="${escapeHtml(pkg.title)}" class="pkg-modal-banner">
      ${pkg.badge ? `<span class="package-badge" style="top:16px; left:16px;">${escapeHtml(pkg.badge)}</span>` : ''}
    </div>

    <div class="pkg-modal-content">
      <div class="pkg-modal-title-row">
        <div>
          <h2>${escapeHtml(pkg.title)}</h2>
          <p class="pkg-modal-location"><i class="fa-solid fa-location-dot" style="color:var(--primary);"></i> ${escapeHtml(pkg.location)}</p>
        </div>
        <div class="pkg-modal-price-box">
          <div class="pkg-modal-price">${escapeHtml(pkg.price)}</div>
          <small style="color:var(--text-3);">per person</small>
        </div>
      </div>

      <!-- Quick Highlights Ribbon -->
      <div class="pkg-modal-ribbon">
        <div class="ribbon-item">
          <i class="fa-regular fa-clock"></i>
          <div>
            <strong>Duration</strong>
            <span>${escapeHtml(pkg.duration)}</span>
          </div>
        </div>
        <div class="ribbon-item">
          <i class="fa-solid fa-map-pin"></i>
          <div>
            <strong>Spots Covered</strong>
            <span>${escapeHtml(pkg.totalSpots || 'Multiple Shrines')}</span>
          </div>
        </div>
        <div class="ribbon-item">
          <i class="fa-solid fa-users"></i>
          <div>
            <strong>Group Size</strong>
            <span>${escapeHtml(pkg.groupSize || 'Flexible')}</span>
          </div>
        </div>
        <div class="ribbon-item">
          <i class="fa-solid fa-utensils"></i>
          <div>
            <strong>Meals</strong>
            <span>${escapeHtml(pkg.meals || 'Pure Veg Sattvic')}</span>
          </div>
        </div>
        <div class="ribbon-item">
          <i class="fa-solid fa-bus"></i>
          <div>
            <strong>Transport</strong>
            <span>${escapeHtml(pkg.transport || 'AC Vehicle')}</span>
          </div>
        </div>
        <div class="ribbon-item">
          <i class="fa-solid fa-ticket"></i>
          <div>
            <strong>VIP Darshan</strong>
            <span>${escapeHtml(pkg.vipEntry || 'Included')}</span>
          </div>
        </div>
      </div>

      <!-- Tour Overview -->
      <div class="pkg-modal-section">
        <h3><i class="fa-solid fa-circle-info" style="color:var(--primary);"></i> Tour Overview</h3>
        <p style="font-size:0.96rem; line-height:1.7; color:var(--text-2);">${escapeHtml(pkg.description || '')}</p>
      </div>

      <!-- Day by Day Path / Itinerary -->
      <div class="pkg-modal-section">
        <h3><i class="fa-solid fa-route" style="color:var(--primary);"></i> Complete Yatra Path & Itinerary</h3>
        <div class="itinerary-timeline">
          ${itineraryList.map((item, idx) => {
            const isObj = typeof item === 'object';
            const dayLabel = isObj ? item.day : `Day ${idx + 1}`;
            const titleText = isObj ? item.title : item;
            const descText = isObj ? item.desc : '';
            return `
              <div class="timeline-step">
                <div class="step-badge">${escapeHtml(dayLabel)}</div>
                <div class="step-content">
                  <h4>${escapeHtml(titleText)}</h4>
                  ${descText ? `<p>${escapeHtml(descText)}</p>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Inclusions -->
      <div class="pkg-modal-section">
        <h3><i class="fa-solid fa-circle-check" style="color:#2E7D32;"></i> Package Inclusions</h3>
        <ul class="inclusions-grid">
          ${inclusionsList.map(inc => `
            <li><i class="fa-solid fa-check" style="color:#2E7D32;"></i> ${escapeHtml(inc)}</li>
          `).join('')}
        </ul>
      </div>

      <!-- Action Footer -->
      <div class="pkg-modal-action-bar">
        <div>
          <span style="font-size:0.85rem; color:var(--text-3);">Starting from</span>
          <div style="font-size:1.5rem; font-weight:700; color:var(--secondary);">${escapeHtml(pkg.price)}</div>
        </div>
        <button class="btn btn-primary btn-modal-book" style="padding: 12px 28px; font-size:0.95rem;">
          <i class="fa-solid fa-calendar-check"></i> Book This Yatra
        </button>
      </div>
    </div>
  `;

  openModal(modal, overlay);

  // CTA button in modal
  const ctaBtn = body.querySelector('.btn-modal-book');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      closeModals();
      const pkgTitleInput = document.getElementById('booking-pkg-title');
      if (pkgTitleInput) pkgTitleInput.value = pkg.title;
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ========================================================================
   SEARCH, FILTER, SORT
   ======================================================================== */
let currentSearchQuery = '';
let currentFilter = 'all';
let currentSort = 'featured';

function initSearchAndFilter() {
  const searchInput = document.getElementById('package-search');
  const sortSelect = document.getElementById('package-sort');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearchQuery = searchInput.value;
      applyCurrentFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      applyCurrentFilters();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyCurrentFilters();
    });
  });
}

function applyCurrentFilters() {
  let result = [...packagesList];
  const query = currentSearchQuery.toLowerCase().trim();

  if (query) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query)
    );
  }

  if (currentFilter !== 'all') {
    result = result.filter(p => p.badge?.toLowerCase() === currentFilter.toLowerCase());
  }

  if (currentSort === 'price-low') {
    result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (currentSort === 'price-high') {
    result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (currentSort === 'rating') {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  renderPackages(result);
}

function parsePrice(str) {
  if (!str) return 0;
  return parseInt(str.replace(/[^\d]/g, ''), 10) || 0;
}

/* ========================================================================
   BOOKING FORM
   ======================================================================== */
function initBookingForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const name = document.getElementById('booking-name')?.value.trim();
    const email = document.getElementById('booking-email')?.value.trim();
    const phone = document.getElementById('booking-phone')?.value.trim();
    const travelers = document.getElementById('booking-travelers')?.value || '1';
    const date = document.getElementById('booking-date')?.value || new Date().toISOString().split('T')[0];
    const pkgName = selectedPackage
      ? selectedPackage.title
      : (document.getElementById('booking-pkg-title')?.value || 'Temple Yatra');

    if (!name || !email || !phone) return;

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
    }

    try {
      const booking = await createBooking({
        userName: name,
        userEmail: email,
        phone: phone,
        packageName: pkgName,
        travelers: travelers,
        travelDate: date
      });

      showToast(`Booking ${booking.id} submitted! Our pilgrim guide will contact you shortly.`);
      form.reset();
      selectedPackage = null;
    } catch (err) {
      showToast('Something went wrong. Please try again.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Confirm Booking Request';
      }
    }
  });
}

/* ========================================================================
   USER BOOKINGS MODAL
   ======================================================================== */
function renderUserBookingsModal() {
  const modal = document.getElementById('user-bookings-modal');
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('user-bookings-body');
  const user = getCurrentUser();

  if (!user || !body) return;

  const bookings = getBookings().filter(b =>
    b.userEmail?.toLowerCase() === user.email?.toLowerCase()
  );

  if (bookings.length === 0) {
    body.innerHTML = `
      <div class="no-bookings">
        <i class="fa-solid fa-box-open"></i>
        <p>No bookings found for ${escapeHtml(user.email)}</p>
      </div>
    `;
  } else {
    body.innerHTML = bookings.map(b => {
      const statusClass = (b.status || 'Confirmed').toLowerCase() === 'cancelled' ? 'cancelled' :
                          (b.status || 'Confirmed').toLowerCase() === 'pending' ? 'pending' : '';
      return `
        <div class="booking-card">
          <div class="booking-card-header">
            <span class="booking-ref">${b.id}</span>
            <span class="booking-badge ${statusClass}">${b.status || 'Confirmed'}</span>
          </div>
          <div><strong>${escapeHtml(b.packageName)}</strong></div>
          <div class="booking-details-grid">
            <div class="booking-detail-item"><i class="fa-regular fa-calendar"></i> ${b.travelDate || 'Flexible'}</div>
            <div class="booking-detail-item"><i class="fa-solid fa-user-group"></i> ${b.travelers} Travelers</div>
          </div>
        </div>
      `;
    }).join('');
  }

  openModal(modal, overlay);
}

/* ========================================================================
   MODAL HELPERS
   ======================================================================== */
function openModal(modal, overlay) {
  if (modal) modal.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal?.querySelector('.modal-close');
  const closeHandler = () => closeModals();
  if (closeBtn) closeBtn.onclick = closeHandler;
  if (overlay) overlay.onclick = closeHandler;

  // Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModals();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeModals() {
  document.querySelectorAll('.modal, .modal-overlay').forEach(el => el.classList.remove('active'));
  document.body.style.overflow = '';
}

/* ========================================================================
   REVIEWS & RATING
   ======================================================================== */
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

    star.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(star.getAttribute('data-value'), 10);
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        s.className = val <= hoverVal ? 'fa-solid fa-star active' : 'fa-regular fa-star';
      });
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        s.className = val <= currentRating ? 'fa-solid fa-star active' : 'fa-regular fa-star';
      });
    });
  });

  const reviewForm = document.getElementById('feedback-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = getCurrentUser();
      const comment = document.getElementById('feedback-text')?.value.trim();
      const submitBtn = reviewForm.querySelector('button[type="submit"]');

      if (!comment) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
      }

      try {
        await addReview({
          name: user ? user.name : 'Devotee Pilgrim',
          rating: currentRating,
          comment: comment,
          location: 'India'
        });

        renderReviewsList(getReviews());
        showToast('Thank you for sharing your spiritual experience!');
        reviewForm.reset();
        currentRating = 5;
        stars.forEach(s => s.className = 'fa-solid fa-star active');
      } catch (err) {
        showToast('Could not submit review. Please try again.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Review';
        }
      }
    });
  }
}

function renderReviewsList(reviews) {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  container.innerHTML = reviews.map(r => `
    <div class="testimonial-card">
      <div class="stars">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}</div>
      <p class="test-text">"${escapeHtml(r.comment)}"</p>
      <div class="test-author">
        <h4>${escapeHtml(r.name)}</h4>
        <span>${escapeHtml(r.location || 'Pilgrim')}</span>
      </div>
    </div>
  `).join('');
}

/* ========================================================================
   LIGHTBOX — Gallery with arrow navigation
   ======================================================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  galleryImages = Array.from(galleryItems).map(img => img.src);

  galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentGalleryIndex = index;
      showLightboxImage();
      if (lightbox) lightbox.classList.add('active');
    });
  });

  if (lightbox) {
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      showLightboxImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      showLightboxImage();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      showLightboxImage();
    }
    if (e.key === 'ArrowRight') {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      showLightboxImage();
    }
  });

  function showLightboxImage() {
    if (lightboxImg && galleryImages[currentGalleryIndex]) {
      lightboxImg.style.opacity = '0';
      lightboxImg.style.transform = 'scale(0.95)';
      setTimeout(() => {
        lightboxImg.src = galleryImages[currentGalleryIndex];
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 150);
    }
  }

  // Add inline transition to lightbox img
  if (lightboxImg) {
    lightboxImg.style.transition = 'opacity 200ms ease, transform 200ms ease';
  }
}

/* ========================================================================
   FAQ ACCORDION
   ======================================================================== */
function initFAQ() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        if (h.nextElementSibling) h.nextElementSibling.style.maxHeight = null;
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen && content) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ========================================================================
   FLOATING CONTACT WIDGET
   ======================================================================== */
function initFloatingWidget() {
  const btn = document.getElementById('floating-contact-btn');
  const menu = document.getElementById('floating-contact-menu');

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu) menu.classList.toggle('show');
    });
  }

  document.addEventListener('click', () => {
    if (menu) menu.classList.remove('show');
  });
}

/* ========================================================================
   NEWSLETTER
   ======================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to our newsletter!');
      form.reset();
    });
  }
}

/* ========================================================================
   TOAST NOTIFICATION
   ======================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const span = toast.querySelector('span');
  if (span) span.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

/* ========================================================================
   UTILITIES
   ======================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
