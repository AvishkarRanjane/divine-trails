/* ==========================================================================
   Divine Trails - Web Admin Controller & Real-Time Sync Engine
   ========================================================================== */

let adminPackages = [];
let pendingChangesCount = 0;
let activeTab = 'packages';
let uploadedBase64Image = null;

document.addEventListener('DOMContentLoaded', () => {
    // Security Guard: Only admin email can access this page
    if (!DivineTrailsSDK.isAdminUser()) {
        window.location.replace('/');
        return;
    }
    initTheme();
    loadAdminData();
    initSearch();
});

// Real-time synchronization listeners across Web & Mobile App
window.addEventListener('divineTrailsPackagesUpdated', () => {
    adminPackages = DivineTrailsSDK.getPackages();
    renderMetrics();
    renderPackagesList();
});
window.addEventListener('divineTrailsBookingsUpdated', () => {
    renderBookingsTable();
    renderMetrics();
});
window.addEventListener('divineTrailsReviewsUpdated', () => {
    renderReviewsList();
});
window.addEventListener('storage', (e) => {
    if (e.key === 'divineTrailsPackages') {
        adminPackages = DivineTrailsSDK.getPackages();
        renderMetrics();
        renderPackagesList();
    } else if (e.key === 'divineTrailsBookings') {
        renderBookingsTable();
        renderMetrics();
    } else if (e.key === 'divineTrailsReviews') {
        renderReviewsList();
    }
});

// Load All Admin Data
function loadAdminData() {
    adminPackages = DivineTrailsSDK.getPackages();
    renderMetrics();
    renderPackagesList();
    renderBookingsTable();
    renderReviewsList();
}

// Theme Switcher
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('divineTrailsTheme') || 'light';
    root.setAttribute('data-theme', saved);
    if (themeBtn) {
        themeBtn.querySelector('i').className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        themeBtn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem('divineTrailsTheme', next);
            themeBtn.querySelector('i').className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });
    }
}

// Render Metrics
function renderMetrics() {
    const pkgs = DivineTrailsSDK.getPackages();
    const bookings = DivineTrailsSDK.getAllBookings();
    const users = JSON.parse(localStorage.getItem('divineTrailsUsers') || '[]');

    document.getElementById('stat-active-packages').innerText = pkgs.length;
    document.getElementById('stat-total-bookings').innerText = bookings.length;
    document.getElementById('stat-total-users').innerText = Math.max(1, users.length);

    let rev = 0;
    bookings.forEach(b => {
        const pkg = pkgs.find(p => p.title === b.packageName);
        if (pkg) {
            const val = parseInt(pkg.price.replace(/[^\d]/g, ''), 10) || 0;
            rev += val * (parseInt(b.travelers, 10) || 1);
        } else {
            rev += 15000 * (parseInt(b.travelers, 10) || 1);
        }
    });
    document.getElementById('stat-revenue').innerText = '₹' + rev.toLocaleString('en-IN');
}

// Admin Tab Switching
window.switchAdminTab = function(tabName) {
    activeTab = tabName;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));

    const btn = document.getElementById(`tab-btn-${tabName}`);
    const content = document.getElementById(`admin-tab-${tabName}`);
    if (btn) btn.classList.add('active');
    if (content) content.classList.add('active');

    if (tabName === 'bookings') renderBookingsTable();
};

// Render Packages Grid
function renderPackagesList(filteredPkgs) {
    const grid = document.getElementById('admin-packages-grid');
    if (!grid) return;

    const list = filteredPkgs || adminPackages;

    grid.innerHTML = list.map(pkg => `
        <div class="admin-pkg-card">
            <div class="admin-pkg-img">
                <img src="${pkg.image}" alt="${pkg.title}">
                <span class="badge-admin" style="position: absolute; top: 10px; right: 10px; background: var(--primary-color);">${pkg.badge}</span>
            </div>
            <div class="admin-pkg-body">
                <div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">${pkg.title}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">${pkg.route}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary-color);">${pkg.price}</span>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);"><i class="fa-solid fa-clock"></i> ${pkg.duration}</span>
                    </div>
                </div>

                <div class="admin-pkg-actions">
                    <button class="btn btn-outline" onclick="openEditPackageModal('${pkg.id}')">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button class="btn btn-outline" style="color: #e03131; border-color: rgba(224,49,49,0.3);" onclick="deletePackage('${pkg.id}')">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Packages
function initSearch() {
    const input = document.getElementById('pkg-search-input');
    if (input) {
        input.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            const filtered = adminPackages.filter(p => 
                p.title.toLowerCase().includes(q) ||
                p.route.toLowerCase().includes(q) ||
                p.price.toLowerCase().includes(q)
            );
            renderPackagesList(filtered);
        });
    }
}

// Image File Upload Reader
window.handleImageFileUpload = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        uploadedBase64Image = evt.target.result;
        document.getElementById('form-pkg-image').value = uploadedBase64Image;
        
        const previewContainer = document.getElementById('image-preview-container');
        const previewImg = document.getElementById('image-preview-img');
        if (previewContainer && previewImg) {
            previewImg.src = uploadedBase64Image;
            previewContainer.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
};

// Modal Handlers
window.openAddPackageModal = function() {
    document.getElementById('modal-title').innerText = "Add New Yatra Package";
    document.getElementById('pkg-form').reset();
    document.getElementById('form-pkg-id').value = "";
    document.getElementById('image-preview-container').style.display = "none";
    uploadedBase64Image = null;
    document.getElementById('pkg-modal').classList.add('active');
};

window.openEditPackageModal = function(id) {
    const pkg = adminPackages.find(p => p.id === id);
    if (!pkg) return;

    document.getElementById('modal-title').innerText = "Edit " + pkg.title;
    document.getElementById('form-pkg-id').value = pkg.id;
    document.getElementById('form-pkg-title').value = pkg.title;
    document.getElementById('form-pkg-price').value = pkg.price;
    document.getElementById('form-pkg-duration').value = pkg.duration;
    document.getElementById('form-pkg-category').value = pkg.category || 'north';
    document.getElementById('form-pkg-badge').value = pkg.badge || 'Featured';
    document.getElementById('form-pkg-route').value = pkg.route;
    document.getElementById('form-pkg-image').value = pkg.image;
    document.getElementById('form-pkg-history').value = pkg.templeDetails ? pkg.templeDetails.history : '';

    const previewContainer = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('image-preview-img');
    if (previewContainer && previewImg) {
        previewImg.src = pkg.image;
        previewContainer.style.display = 'block';
    }

    document.getElementById('pkg-modal').classList.add('active');
};

window.closePkgModal = function() {
    document.getElementById('pkg-modal').classList.remove('active');
};

// Handle Package Form Submission
window.handlePkgFormSubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('form-pkg-id').value;
    const title = document.getElementById('form-pkg-title').value.trim();
    const price = document.getElementById('form-pkg-price').value.trim();
    const duration = document.getElementById('form-pkg-duration').value.trim();
    const category = document.getElementById('form-pkg-category').value;
    const badge = document.getElementById('form-pkg-badge').value.trim() || 'Featured';
    const route = document.getElementById('form-pkg-route').value.trim();
    const image = document.getElementById('form-pkg-image').value.trim() || 'assets/images/gal_1_1782373941988.png';
    const history = document.getElementById('form-pkg-history').value.trim();

    if (id) {
        // Edit existing
        const idx = adminPackages.findIndex(p => p.id === id);
        if (idx >= 0) {
            adminPackages[idx] = {
                ...adminPackages[idx],
                title, price, duration, category, badge, route, image,
                templeDetails: {
                    ...adminPackages[idx].templeDetails,
                    history: history || adminPackages[idx].templeDetails.history
                }
            };
        }
    } else {
        // Add new
        const newId = 'pkg-' + Date.now();
        adminPackages.unshift({
            id: newId,
            title, price, duration, category, badge, route, image,
            hotelStars: 4,
            meals: "Breakfast & Dinner",
            accommodation: "Premium AC Rooms",
            transport: "Private AC Vehicle",
            inclusions: ["Premium stay", "Private Transport", "Meals Included"],
            exclusions: ["Personal expenses"],
            templeDetails: {
                name: title,
                history: history || "Sacred pilgrimage shrine.",
                significance: "Divine spiritual center.",
                architecture: "Ancient temple architecture.",
                bestTime: "Year round",
                dressCode: "Modest Indian clothing.",
                nearby: ["Local Shrines"],
                mapUrl: "https://maps.google.com"
            }
        });
    }

    DivineTrailsSDK.savePackages(adminPackages);
    closePkgModal();
    renderPackagesList();
    renderMetrics();
    showToast("✅ Published Live! Website and Mobile App updated in real-time.");
};

window.deletePackage = function(id) {
    if (!confirm("Are you sure you want to delete this tour package?")) return;
    adminPackages = adminPackages.filter(p => p.id !== id);
    DivineTrailsSDK.savePackages(adminPackages);
    renderPackagesList();
    renderMetrics();
    showToast("✅ Deleted Live! Website and Mobile App updated in real-time.");
};

// Pending Changes State
function markChangesPending() {
    pendingChangesCount++;
    const badge = document.getElementById('pending-changes-badge');
    if (badge) {
        badge.innerText = pendingChangesCount;
        badge.style.display = 'inline-flex';
    }
}

// "Save All & Apply Live" Pop-up Modal Handlers
window.openSaveLiveModal = function() {
    document.getElementById('save-live-modal').classList.add('active');
};

window.closeSaveLiveModal = function() {
    document.getElementById('save-live-modal').classList.remove('active');
};

window.confirmSaveAllLive = function() {
    // Save to shared database engine
    DivineTrailsSDK.savePackages(adminPackages);
    pendingChangesCount = 0;
    
    const badge = document.getElementById('pending-changes-badge');
    if (badge) badge.style.display = 'none';

    closeSaveLiveModal();
    renderMetrics();
    showToast("✅ Published Live! Website and Mobile App updated in real-time.");
};

// Render Customer Bookings Table
function renderBookingsTable() {
    const tbody = document.getElementById('admin-bookings-tbody');
    if (!tbody) return;

    const bookings = DivineTrailsSDK.getAllBookings();

    if (bookings.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 30px;">
                    No customer bookings submitted yet.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = bookings.map(b => `
        <tr>
            <td><strong style="color: var(--primary-color);">${b.ref}</strong></td>
            <td><strong>${b.name}</strong><br><small style="color: var(--text-secondary);">${b.userEmail || 'Guest'}</small></td>
            <td>${b.packageName}</td>
            <td>${b.dateFormatted || b.date}</td>
            <td>${b.travelers} Persons</td>
            <td>${b.phone}</td>
            <td>
                <select class="status-select" onchange="changeBookingStatus('${b.ref}', this.value)">
                    <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="In Progress" ${b.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
        </tr>
    `).join('');
}

window.changeBookingStatus = function(ref, newStatus) {
    DivineTrailsSDK.updateBookingStatus(ref, newStatus);
    showToast(`Booking ${ref} status updated to ${newStatus}`);
};

// Render Reviews List
async function renderReviewsList() {
    const listEl = document.getElementById('admin-reviews-list');
    if (!listEl) return;

    const reviews = await DivineTrailsSDK.getReviews();

    if (reviews.length === 0) {
        listEl.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No pilgrim reviews posted yet.</p>`;
        return;
    }

    listEl.innerHTML = reviews.map(r => `
        <div class="metric-card" style="flex-direction: column; align-items: flex-start;">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <strong>${r.author}</strong>
                <span style="color: var(--primary-color);">★ ${r.rating || 5}.0</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 6px 0;">"${r.text}"</p>
            <small style="color: var(--text-secondary);">${r.date || 'Recent'}</small>
        </div>
    `).join('');
}

// Toast Helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');
    if (toast && msgEl) {
        msgEl.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}
