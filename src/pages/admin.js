import '../styles/style.css';
import { getCurrentUser, isAdminUser, logout } from '../services/authService.js';
import { 
  getPackages, 
  savePackagesToCloud, 
  subscribePackages, 
  getBookings, 
  subscribeBookings 
} from '../services/dataService.js';

let packages = [];

document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  if (!isAdminUser(user)) {
    alert('Access Denied: Admin authorization required.');
    window.location.href = '/auth.html';
    return;
  }

  initTheme();
  loadData();
  initTabSwitching();
  initPackageModal();

  document.getElementById('admin-logout-btn')?.addEventListener('click', async () => {
    await logout();
    window.location.href = '/';
  });
});

function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('divineTrailsTheme') || 'light';
  root.setAttribute('data-theme', saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('divineTrailsTheme', next);
    });
  }
}

function loadData() {
  packages = getPackages();
  renderMetrics();
  renderPackagesList();
  renderBookingsTable();

  subscribePackages((list) => {
    packages = list;
    renderMetrics();
    renderPackagesList();
  });

  subscribeBookings(() => {
    renderMetrics();
    renderBookingsTable();
  });
}

function renderMetrics() {
  const bookings = getBookings();

  const elActive = document.getElementById('stat-active-packages');
  const elBookings = document.getElementById('stat-total-bookings');
  const elRev = document.getElementById('stat-revenue');

  if (elActive) elActive.innerText = packages.length;
  if (elBookings) elBookings.innerText = bookings.length;

  let revenue = 0;
  bookings.forEach(b => {
    const pkg = packages.find(p => p.title === b.packageName);
    const val = pkg ? parseInt(pkg.price.replace(/[^\d]/g, ''), 10) || 15000 : 15000;
    revenue += val * (parseInt(b.travelers, 10) || 1);
  });

  if (elRev) elRev.innerText = '₹' + revenue.toLocaleString('en-IN');
}

function renderPackagesList() {
  const tableBody = document.getElementById('admin-packages-list');
  if (!tableBody) return;

  tableBody.innerHTML = packages.map(pkg => `
    <tr>
      <td><img src="${pkg.image}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;"></td>
      <td><strong>${escapeHtml(pkg.title)}</strong><br><small>${escapeHtml(pkg.location)}</small></td>
      <td>${escapeHtml(pkg.price)}</td>
      <td><span class="booking-badge">${escapeHtml(pkg.badge || 'Active')}</span></td>
      <td>
        <button class="btn btn-outline btn-edit-pkg" data-id="${pkg.id}" style="padding:4px 10px; font-size:0.8rem; margin-right:4px;">Edit</button>
        <button class="btn btn-outline btn-delete-pkg" data-id="${pkg.id}" style="padding:4px 10px; font-size:0.8rem; color:#e03131; border-color:#e03131;">Delete</button>
      </td>
    </tr>
  `).join('');

  tableBody.querySelectorAll('.btn-edit-pkg').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const found = packages.find(p => p.id === id);
      if (found) openPackageFormModal(found);
    });
  });

  tableBody.querySelectorAll('.btn-delete-pkg').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this package?')) {
        packages = packages.filter(p => p.id !== id);
        await savePackagesToCloud(packages);
        renderPackagesList();
        renderMetrics();
      }
    });
  });
}

function renderBookingsTable() {
  const tableBody = document.getElementById('admin-bookings-list');
  if (!tableBody) return;

  const bookings = getBookings();
  if (bookings.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">No bookings recorded yet.</td></tr>`;
    return;
  }

  tableBody.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${escapeHtml(b.userName)}<br><small>${escapeHtml(b.userEmail)}</small></td>
      <td>${escapeHtml(b.packageName)}</td>
      <td>${b.travelers}</td>
      <td>${b.travelDate || '-'}</td>
      <td><span class="booking-badge">${b.status || 'Confirmed'}</span></td>
    </tr>
  `).join('');
}

function initTabSwitching() {
  const btns = document.querySelectorAll('.admin-tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId)?.classList.add('active');
    });
  });
}

function initPackageModal() {
  const btnAdd = document.getElementById('btn-add-package');
  btnAdd?.addEventListener('click', () => openPackageFormModal(null));

  const form = document.getElementById('admin-package-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('pkg-form-id').value;
    const title = document.getElementById('pkg-form-title').value.trim();
    const location = document.getElementById('pkg-form-location').value.trim();
    const price = document.getElementById('pkg-form-price').value.trim();
    const duration = document.getElementById('pkg-form-duration').value.trim();
    const image = document.getElementById('pkg-form-image').value.trim();
    const badge = document.getElementById('pkg-form-badge').value.trim();

    if (id) {
      const idx = packages.findIndex(p => p.id === id);
      if (idx >= 0) {
        packages[idx] = { ...packages[idx], title, location, price, duration, image, badge };
      }
    } else {
      const newPkg = {
        id: 'pkg-' + Date.now(),
        title, location, price, duration, image, badge,
        rating: 5.0,
        reviewsCount: 1
      };
      packages.push(newPkg);
    }

    await savePackagesToCloud(packages);
    closeAdminModal();
    renderPackagesList();
    renderMetrics();
  });
}

function openPackageFormModal(pkg) {
  const modal = document.getElementById('admin-pkg-modal');
  const overlay = document.getElementById('modal-overlay');

  document.getElementById('pkg-form-id').value = pkg ? pkg.id : '';
  document.getElementById('pkg-form-title').value = pkg ? pkg.title : '';
  document.getElementById('pkg-form-location').value = pkg ? pkg.location : '';
  document.getElementById('pkg-form-price').value = pkg ? pkg.price : '';
  document.getElementById('pkg-form-duration').value = pkg ? pkg.duration : '';
  document.getElementById('pkg-form-image').value = pkg ? pkg.image : '';
  document.getElementById('pkg-form-badge').value = pkg ? pkg.badge || '' : '';

  modal?.classList.add('active');
  overlay?.classList.add('active');

  modal?.querySelector('.modal-close')?.addEventListener('click', closeAdminModal);
  overlay?.addEventListener('click', closeAdminModal);
}

function closeAdminModal() {
  document.querySelectorAll('.modal, .modal-overlay').forEach(el => el.classList.remove('active'));
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
