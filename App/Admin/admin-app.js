/* ==========================================================================
   Divine Trails Mobile Admin - Controller & Real-Time Sync Engine
   ========================================================================== */

let adminPackages = [];
let pendingChanges = 0;
let uploadedBase64Image = null;

document.addEventListener('DOMContentLoaded', () => {
    // Security Guard: Only admin email can access this page
    if (!DivineTrailsSDK.isAdminUser()) {
        window.location.replace('/');
        return;
    }
    initClock();
    initTheme();
    loadAdminData();
    initBottomSheetBackdrop();
});

// Real-time synchronization listeners across Web & Mobile App
window.addEventListener('divineTrailsPackagesUpdated', () => {
    adminPackages = DivineTrailsSDK.getPackages();
    renderStats();
    renderPackagesList();
});
window.addEventListener('divineTrailsBookingsUpdated', () => {
    renderBookingsList();
    renderStats();
});
window.addEventListener('divineTrailsReviewsUpdated', () => {
    renderReviewsList();
});
window.addEventListener('storage', (e) => {
    if (e.key === 'divineTrailsPackages') {
        adminPackages = DivineTrailsSDK.getPackages();
        renderStats();
        renderPackagesList();
    } else if (e.key === 'divineTrailsBookings') {
        renderBookingsList();
        renderStats();
    } else if (e.key === 'divineTrailsReviews') {
        renderReviewsList();
    }
});

// Clock
function initClock() {
    const clockEl = document.getElementById('ios-clock');
    if (!clockEl) return;
    const updateTime = () => {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    updateTime();
    setInterval(updateTime, 30000);
}

// Theme
function initTheme() {
    const themeBtn = document.getElementById('ios-theme-btn');
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

// Load Data
function loadAdminData() {
    adminPackages = DivineTrailsSDK.getPackages();
    renderStats();
    renderPackagesList();
    renderBookingsList();
    renderReviewsList();
}

// Tab Switcher
window.switchToAdminTab = function(tabName) {
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.ios-tab-item').forEach(b => b.classList.remove('active'));

    const targetView = document.getElementById(`tab-${tabName}`);
    const targetBtn = document.getElementById(`tab-btn-${tabName}`);
    if (targetView) targetView.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');

    if (tabName === 'bookings') renderBookingsList();
};

// Render Stats
function renderStats() {
    const pkgs = DivineTrailsSDK.getPackages();
    const bookings = DivineTrailsSDK.getAllBookings();

    document.getElementById('stat-active-pkgs').innerText = pkgs.length;
    document.getElementById('stat-bookings-count').innerText = bookings.length;
}

// Render Packages List
function renderPackagesList() {
    const listEl = document.getElementById('ios-pkg-admin-list');
    if (!listEl) return;

    listEl.innerHTML = adminPackages.map(pkg => `
        <div class="ios-card">
            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                <img src="${pkg.image}" style="width: 80px; height: 80px; border-radius: 16px; object-fit: cover;">
                <div style="flex: 1;">
                    <strong style="font-size: 1rem;">${pkg.title}</strong>
                    <p style="font-size: 0.8rem; color: var(--ios-text-secondary);">${pkg.route}</p>
                    <strong style="color: var(--ios-primary); font-size: 1rem;">${pkg.price}</strong>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="ios-btn ios-btn-secondary" style="flex: 1; font-size: 0.82rem;" onclick="openEditPackageSheet('${pkg.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button class="ios-btn ios-btn-secondary" style="flex: 1; font-size: 0.82rem; color: var(--ios-red);" onclick="deletePackage('${pkg.id}')">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Bottom Sheet Handlers
function initBottomSheetBackdrop() {
    const backdrop = document.getElementById('ios-sheet-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeBottomSheet);
}

window.closeBottomSheet = function() {
    document.getElementById('ios-bottom-sheet').classList.remove('active');
    document.getElementById('ios-sheet-backdrop').classList.remove('active');
};

// Image Upload Reader
window.handleImageFileUpload = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        uploadedBase64Image = evt.target.result;
        document.getElementById('ios-form-img').value = uploadedBase64Image;
    };
    reader.readAsDataURL(file);
};

window.openAddPackageSheet = function() {
    openPackageSheetModal(null);
};

window.openEditPackageSheet = function(id) {
    const pkg = adminPackages.find(p => p.id === id);
    openPackageSheetModal(pkg);
};

function openPackageSheetModal(pkg) {
    const sheetBody = document.getElementById('ios-sheet-body');
    const sheet = document.getElementById('ios-bottom-sheet');
    const backdrop = document.getElementById('ios-sheet-backdrop');

    sheetBody.innerHTML = `
        <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${pkg ? 'Edit Yatra' : 'Add Yatra Package'}</h2>

        <form id="ios-pkg-form">
            <input type="hidden" id="ios-form-id" value="${pkg ? pkg.id : ''}">

            <div style="margin-bottom: 10px;">
                <label style="font-size: 0.8rem; font-weight: 600;">Package Title</label>
                <input type="text" id="ios-form-title" value="${pkg ? pkg.title : ''}" required style="width: 100%; padding: 10px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text);">
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <div style="flex: 1;">
                    <label style="font-size: 0.8rem; font-weight: 600;">Price</label>
                    <input type="text" id="ios-form-price" value="${pkg ? pkg.price : ''}" required style="width: 100%; padding: 10px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text);">
                </div>
                <div style="flex: 1;">
                    <label style="font-size: 0.8rem; font-weight: 600;">Duration</label>
                    <input type="text" id="ios-form-duration" value="${pkg ? pkg.duration : ''}" required style="width: 100%; padding: 10px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text);">
                </div>
            </div>

            <div style="margin-bottom: 10px;">
                <label style="font-size: 0.8rem; font-weight: 600;">Route Circuit</label>
                <input type="text" id="ios-form-route" value="${pkg ? pkg.route : ''}" required style="width: 100%; padding: 10px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text);">
            </div>

            <div style="margin-bottom: 12px;">
                <label style="font-size: 0.8rem; font-weight: 600;">Upload Image or Paste URL</label>
                <input type="file" accept="image/*" onchange="handleImageFileUpload(event)" style="margin-bottom: 6px; font-size: 0.8rem;">
                <input type="text" id="ios-form-img" value="${pkg ? pkg.image : ''}" placeholder="assets/images/..." style="width: 100%; padding: 10px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text);">
            </div>

            <button type="submit" class="ios-btn ios-btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">
                Save Package
            </button>
        </form>
    `;

    backdrop.classList.add('active');
    sheet.classList.add('active');

    document.getElementById('ios-pkg-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('ios-form-id').value;
        const title = document.getElementById('ios-form-title').value.trim();
        const price = document.getElementById('ios-form-price').value.trim();
        const duration = document.getElementById('ios-form-duration').value.trim();
        const route = document.getElementById('ios-form-route').value.trim();
        const image = document.getElementById('ios-form-img').value.trim() || 'assets/images/gal_1_1782373941988.png';

        if (id) {
            const idx = adminPackages.findIndex(p => p.id === id);
            if (idx >= 0) {
                adminPackages[idx] = { ...adminPackages[idx], title, price, duration, route, image };
            }
        } else {
            adminPackages.unshift({
                id: 'pkg-' + Date.now(),
                title, price, duration, route, image,
                badge: 'New Yatra',
                category: 'north',
                daysNights: { days: 3, nights: 2 },
                hotelStars: 4,
                meals: "Breakfast & Dinner",
                accommodation: "Premium AC Stay",
                transport: "Private AC Vehicle",
                inclusions: ["Stay", "Transport", "Meals"],
                exclusions: ["Personal expenses"],
                templeDetails: { name: title, history: "Sacred shrine.", dressCode: "Traditional" }
            });
        }

        DivineTrailsSDK.savePackages(adminPackages);
        closeBottomSheet();
        renderPackagesList();
        renderStats();
        showToast("✅ Published Live! Website and Mobile App updated in real-time.");
    });
}

window.deletePackage = function(id) {
    if (!confirm("Delete package?")) return;
    adminPackages = adminPackages.filter(p => p.id !== id);
    DivineTrailsSDK.savePackages(adminPackages);
    renderPackagesList();
    renderStats();
    showToast("✅ Deleted Live! Website and Mobile App updated in real-time.");
};

function markPending() {
    pendingChanges++;
    const banner = document.getElementById('ios-pending-banner');
    if (banner) banner.style.display = 'block';
}

window.confirmSaveAllLive = function() {
    DivineTrailsSDK.savePackages(adminPackages);
    pendingChanges = 0;
    const banner = document.getElementById('ios-pending-banner');
    if (banner) banner.style.display = 'none';
    renderStats();
    showToast("✅ Published Live! Website and App updated.");
};

// Bookings
function renderBookingsList() {
    const listEl = document.getElementById('ios-bookings-admin-list');
    if (!listEl) return;

    const bookings = DivineTrailsSDK.getAllBookings();

    if (bookings.length === 0) {
        listEl.innerHTML = `<div class="ios-card" style="text-align: center; color: var(--ios-text-secondary);">No customer bookings yet.</div>`;
        return;
    }

    listEl.innerHTML = bookings.map(b => `
        <div class="ios-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: var(--ios-primary);">${b.ref}</strong>
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--ios-green);">${b.status}</span>
            </div>
            <strong style="font-size: 1rem;">${b.packageName}</strong>
            <p style="font-size: 0.82rem; color: var(--ios-text-secondary); margin-bottom: 10px;">Lead: ${b.name} (${b.phone})</p>
            <div style="display: flex; gap: 6px;">
                <button class="ios-btn ios-btn-secondary" style="flex: 1; font-size: 0.78rem;" onclick="updateStatus('${b.ref}', 'Confirmed')">Confirmed</button>
                <button class="ios-btn ios-btn-secondary" style="flex: 1; font-size: 0.78rem;" onclick="updateStatus('${b.ref}', 'Completed')">Completed</button>
                <button class="ios-btn ios-btn-secondary" style="flex: 1; font-size: 0.78rem; color: var(--ios-red);" onclick="updateStatus('${b.ref}', 'Cancelled')">Cancel</button>
            </div>
        </div>
    `).join('');
}

window.updateStatus = function(ref, status) {
    DivineTrailsSDK.updateBookingStatus(ref, status);
    renderBookingsList();
    showToast(`Booking ${ref} set to ${status}`);
};

// Reviews
async function renderReviewsList() {
    const listEl = document.getElementById('ios-reviews-admin-list');
    if (!listEl) return;

    const reviews = await DivineTrailsSDK.getReviews();
    if (reviews.length === 0) {
        listEl.innerHTML = `<div class="ios-card" style="text-align: center; color: var(--ios-text-secondary);">No reviews submitted yet.</div>`;
        return;
    }

    listEl.innerHTML = reviews.map(r => `
        <div class="ios-card">
            <strong>${r.author}</strong> <span style="color: var(--ios-primary);">★ ${r.rating || 5}.0</span>
            <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-top: 4px;">"${r.text}"</p>
        </div>
    `).join('');
}

// Toast
function showToast(msg) {
    const toast = document.getElementById('ios-toast');
    const msgEl = document.getElementById('ios-toast-msg');
    if (toast && msgEl) {
        msgEl.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}
