import '../styles/style.css';
import { getCurrentUser, isAdminUser, logout } from '../services/authService.js';
import { 
  getAllPackagesAdmin,
  savePackagesToCloud, 
  subscribePackages, 
  getBookings, 
  subscribeBookings,
  updateBookingStatus,
  deleteBooking,
  getReviews,
  subscribeReviews,
  deleteReview
} from '../services/dataService.js';

let packages = [];

document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();

  // Strict Admin Guard: Only admin email can access admin panel
  if (!isAdminUser(user)) {
    alert('Access Denied: Admin authorization required (mr.avishkarranjane07@gmail.com).');
    window.location.href = '/auth.html';
    return;
  }

  // Display Admin Email
  const adminEmailEl = document.getElementById('admin-user-email');
  if (adminEmailEl && user) adminEmailEl.innerText = user.email;

  loadData();
  initTabSwitching();
  initPackageModal();

  document.getElementById('admin-logout-btn')?.addEventListener('click', async () => {
    await logout();
    window.location.href = '/';
  });
});

function loadData() {
  packages = getAllPackagesAdmin();
  renderMetrics();
  renderPackagesList();
  renderBookingsTable();
  renderReviewsTable();

  subscribePackages(() => {
    packages = getAllPackagesAdmin();
    renderMetrics();
    renderPackagesList();
  });

  subscribeBookings(() => {
    renderMetrics();
    renderBookingsTable();
  });

  subscribeReviews(() => {
    renderMetrics();
    renderReviewsTable();
  });
}

function renderMetrics() {
  const bookings = getBookings();
  const reviews = getReviews();

  const elActive = document.getElementById('stat-active-packages');
  const elBookings = document.getElementById('stat-total-bookings');
  const elRev = document.getElementById('stat-revenue');
  const elTotalRev = document.getElementById('stat-total-reviews');

  if (elActive) elActive.innerText = packages.filter(p => p.status === 'published').length;
  if (elBookings) elBookings.innerText = bookings.length;
  if (elTotalRev) elTotalRev.innerText = reviews.length;

  let revenue = 0;
  bookings.forEach(b => {
    if (b.status !== 'Cancelled') {
      const pkg = packages.find(p => p.title === b.packageName);
      const val = pkg ? parseInt(pkg.price.replace(/[^\d]/g, ''), 10) || 15000 : 15000;
      revenue += val * (parseInt(b.travelers, 10) || 1);
    }
  });

  if (elRev) elRev.innerText = '₹' + revenue.toLocaleString('en-IN');
}

function renderPackagesList() {
  const tableBody = document.getElementById('admin-packages-list');
  if (!tableBody) return;

  tableBody.innerHTML = packages.map(pkg => {
    const isPublished = pkg.status !== 'draft';
    return `
      <tr>
        <td><img src="${pkg.image}" alt="${escapeHtml(pkg.title)}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;"></td>
        <td><strong>${escapeHtml(pkg.title)}</strong></td>
        <td>${escapeHtml(pkg.location)}</td>
        <td><strong>${escapeHtml(pkg.price)}</strong></td>
        <td><span class="booking-badge">${escapeHtml(pkg.badge || 'Active')}</span></td>
        <td>
          <span class="booking-badge ${!isPublished ? 'cancelled' : ''}">${isPublished ? 'Published' : 'Draft'}</span>
        </td>
        <td>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btn-action btn-toggle-publish" data-id="${pkg.id}" style="${!isPublished ? 'background:#e6f4ea; color:#137333; border-color:#ceead6;' : ''}">
              <i class="fa-solid fa-globe"></i> ${isPublished ? 'Unpublish' : 'Publish Live'}
            </button>
            <button class="btn-action btn-edit-pkg" data-id="${pkg.id}"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn-action delete btn-delete-pkg" data-id="${pkg.id}"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tableBody.querySelectorAll('.btn-toggle-publish').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const idx = packages.findIndex(p => p.id === id);
      if (idx >= 0) {
        const currentStatus = packages[idx].status || 'published';
        packages[idx].status = currentStatus === 'published' ? 'draft' : 'published';
        await savePackagesToCloud(packages);
        renderPackagesList();
        renderMetrics();
      }
    });
  });

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
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:24px; color:#888;">No pilgrim bookings recorded yet.</td></tr>`;
    return;
  }

  tableBody.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${escapeHtml(b.userName)}<br><small style="color:#777;">${escapeHtml(b.userEmail)}</small></td>
      <td>${escapeHtml(b.phone || '-')}</td>
      <td>${escapeHtml(b.packageName)}</td>
      <td>${b.travelers || 1} Person(s)</td>
      <td>${b.travelDate || '-'}</td>
      <td>
        <select class="status-select" data-id="${b.docId || b.id}">
          <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
          <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
          <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td>
        <button class="btn-action delete btn-delete-booking" data-id="${b.docId || b.id}"><i class="fa-solid fa-trash"></i> Delete</button>
      </td>
    </tr>
  `).join('');

  tableBody.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', async (e) => {
      const id = e.target.getAttribute('data-id');
      const newStatus = e.target.value;
      await updateBookingStatus(id, newStatus);
      renderMetrics();
    });
  });

  tableBody.querySelectorAll('.btn-delete-booking').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (confirm('Delete this booking permanently?')) {
        await deleteBooking(id);
        renderBookingsTable();
        renderMetrics();
      }
    });
  });
}

function renderReviewsTable() {
  const tableBody = document.getElementById('admin-reviews-list');
  if (!tableBody) return;

  const reviews = getReviews();
  if (reviews.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:#888;">No reviews submitted yet.</td></tr>`;
    return;
  }

  tableBody.innerHTML = reviews.map(r => `
    <tr>
      <td><strong>${escapeHtml(r.name)}</strong><br><small style="color:#777;">${escapeHtml(r.location || 'India')}</small></td>
      <td><span style="color:#FFA000;">${'★'.repeat(r.rating || 5)}</span> (${r.rating || 5}/5)</td>
      <td>"${escapeHtml(r.comment)}"</td>
      <td>${r.date || '-'}</td>
      <td>
        <button class="btn-action delete btn-delete-review" data-id="${r.docId || r.id}"><i class="fa-solid fa-trash"></i> Delete</button>
      </td>
    </tr>
  `).join('');

  tableBody.querySelectorAll('.btn-delete-review').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (confirm('Remove this devotee review?')) {
        await deleteReview(id);
        renderReviewsTable();
        renderMetrics();
      }
    });
  });
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

  const btnModeUrl = document.getElementById('btn-mode-url');
  const btnModeFile = document.getElementById('btn-mode-file');
  const boxUrl = document.getElementById('img-input-url-box');
  const boxFile = document.getElementById('img-input-file-box');
  const inputUrl = document.getElementById('pkg-form-image');
  const inputFile = document.getElementById('pkg-form-image-file');
  const previewContainer = document.getElementById('pkg-img-preview-container');
  const previewImg = document.getElementById('pkg-img-preview');
  const btnSaveDraft = document.getElementById('btn-save-draft');

  // Mode switching
  btnModeUrl?.addEventListener('click', () => {
    btnModeUrl.classList.add('active');
    btnModeFile?.classList.remove('active');
    if (boxUrl) boxUrl.style.display = 'block';
    if (boxFile) boxFile.style.display = 'none';
  });

  btnModeFile?.addEventListener('click', () => {
    btnModeFile.classList.add('active');
    btnModeUrl?.classList.remove('active');
    if (boxFile) boxFile.style.display = 'block';
    if (boxUrl) boxUrl.style.display = 'none';
  });

  // URL input live preview
  inputUrl?.addEventListener('input', () => {
    const val = inputUrl.value.trim();
    if (val) {
      if (previewImg) previewImg.src = val;
      if (previewContainer) previewContainer.style.display = 'flex';
    } else {
      if (previewContainer) previewContainer.style.display = 'none';
    }
  });

  // File upload live preview & base64 reader
  inputFile?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        if (inputUrl) inputUrl.value = dataUrl;
        if (previewImg) previewImg.src = dataUrl;
        if (previewContainer) previewContainer.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    }
  });

  const savePackage = async (targetStatus) => {
    const id = document.getElementById('pkg-form-id').value;
    const title = document.getElementById('pkg-form-title').value.trim();
    const location = document.getElementById('pkg-form-location').value.trim();
    const price = document.getElementById('pkg-form-price').value.trim();
    const duration = document.getElementById('pkg-form-duration').value.trim();
    const image = inputUrl ? inputUrl.value.trim() || '/assets/images/pkg_chardham_1782374096140.png' : '/assets/images/pkg_chardham_1782374096140.png';
    const badge = document.getElementById('pkg-form-badge').value.trim();
    const groupSize = document.getElementById('pkg-form-group')?.value.trim() || '12-15 Pilgrims';
    const description = document.getElementById('pkg-form-desc')?.value.trim() || '';

    if (!title || !location || !price || !duration) {
      alert('Please fill in Title, Location, Price and Duration.');
      return;
    }

    if (id) {
      const idx = packages.findIndex(p => p.id === id);
      if (idx >= 0) {
        packages[idx] = { 
          ...packages[idx], 
          title, location, price, duration, image, badge, groupSize, description,
          status: targetStatus 
        };
      }
    } else {
      const newPkg = {
        id: 'pkg-' + Date.now(),
        title, location, price, duration, image, badge, groupSize, description,
        status: targetStatus,
        rating: 5.0,
        reviewsCount: 1
      };
      packages.push(newPkg);
    }

    await savePackagesToCloud(packages);
    closeAdminModal();
    renderPackagesList();
    renderMetrics();
  };

  btnSaveDraft?.addEventListener('click', () => {
    savePackage('draft');
  });

  const form = document.getElementById('admin-package-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await savePackage('published');
  });
}

function openPackageFormModal(pkg) {
  const modal = document.getElementById('admin-pkg-modal');
  const overlay = document.getElementById('modal-overlay');
  const titleEl = document.getElementById('admin-pkg-modal-title');
  const inputUrl = document.getElementById('pkg-form-image');
  const previewContainer = document.getElementById('pkg-img-preview-container');
  const previewImg = document.getElementById('pkg-img-preview');
  const inputFile = document.getElementById('pkg-form-image-file');

  if (titleEl) titleEl.innerText = pkg ? 'Edit Yatra Package' : 'Add New Yatra Package';

  document.getElementById('pkg-form-id').value = pkg ? pkg.id : '';
  document.getElementById('pkg-form-title').value = pkg ? pkg.title : '';
  document.getElementById('pkg-form-location').value = pkg ? pkg.location : '';
  document.getElementById('pkg-form-price').value = pkg ? pkg.price : '';
  document.getElementById('pkg-form-duration').value = pkg ? pkg.duration : '';
  if (inputUrl) inputUrl.value = pkg ? pkg.image : '';
  if (inputFile) inputFile.value = '';
  document.getElementById('pkg-form-badge').value = pkg ? pkg.badge || '' : '';
  if (document.getElementById('pkg-form-group')) document.getElementById('pkg-form-group').value = pkg ? pkg.groupSize || '' : '';
  if (document.getElementById('pkg-form-desc')) document.getElementById('pkg-form-desc').value = pkg ? pkg.description || '' : '';

  // Show live preview if editing an existing package
  if (pkg && pkg.image) {
    if (previewImg) previewImg.src = pkg.image;
    if (previewContainer) previewContainer.style.display = 'flex';
  } else {
    if (previewContainer) previewContainer.style.display = 'none';
  }

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
