/* ==========================================================================
   Divine Trails Mobile App - Apple iOS Logic & Firebase Client Controller
   ========================================================================== */

// Tour Packages Data Model
const packagesData = [
    {
        id: "pkg-jyotirlinga",
        title: "Jyotirlinga Darshan Tour",
        badge: "Best Seller",
        price: "₹15,000",
        duration: "4 Days / 3 Nights",
        daysNights: { days: 4, nights: 3 },
        route: "Indore - Ujjain - Omkareshwar",
        hotelStars: 4,
        meals: "Breakfast & Dinner",
        accommodation: "Premium AC Rooms",
        transport: "Private AC Vehicle",
        image: "assets/images/gal_2_1782373954072.png",
        category: "north",
        templeDetails: {
            name: "Mahakaleshwar & Omkareshwar",
            history: "Ancient Jyotirlinga shrines dedicated to Lord Shiva. Mahakaleshwar is famed for its unique morning Bhasma Aarti.",
            significance: "Two of the 12 sacred Jyotirlingas, granting divine blessing and spiritual peace.",
            architecture: "Maratha and Bhumija architectural styles with towering spires.",
            bestTime: "October to March; Maha Shivaratri",
            dressCode: "Traditional Indian attire. Men: Dhoti for Bhasma Aarti.",
            nearby: ["Harsiddhi Mata Temple", "Kal Bhairav Temple"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117466.86438072973!2d75.70425026046896!3d23.153775191295966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39637469de00ff23%3A0x7f82abdf7899d412!2sShri%20Mahakaleshwar%20Jyotirlinga%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    },
    {
        id: "pkg-chardham",
        title: "Char Dham Yatra",
        badge: "Spiritual Epic",
        price: "₹35,000",
        duration: "12 Days / 11 Nights",
        daysNights: { days: 12, nights: 11 },
        route: "Haridwar - Kedarnath - Badrinath",
        hotelStars: 3,
        meals: "All Veg Meals",
        accommodation: "Clean AC/Non-AC Stay",
        transport: "AC Coach",
        image: "assets/images/dest_kedarnath_1782373896529.png",
        category: "north",
        templeDetails: {
            name: "The Sacred Himalayan Shrines",
            history: "Established by Adi Shankaracharya in 8th Century, defining the most revered pilgrimage in the Himalayas.",
            significance: "Washes away sins and grants ultimate Moksha.",
            architecture: "Himalayan stone and timber architecture built to endure extreme weather.",
            bestTime: "May to June & September to October",
            dressCode: "Warm modest clothing required.",
            nearby: ["Rishikesh", "Mana Village"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110188.75661601614!2d79.00693006456008!3d30.734626154625295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39083ee051e628b1%3A0x167ce4efaf440f1e!2sKedarnath%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    },
    {
        id: "pkg-southindia",
        title: "South India Temple Circuit",
        badge: "Heritage Tour",
        price: "₹22,500",
        duration: "7 Days / 6 Nights",
        daysNights: { days: 7, nights: 6 },
        route: "Chennai - Madurai - Rameswaram",
        hotelStars: 4,
        meals: "Breakfast Included",
        accommodation: "Premium AC Hotels",
        transport: "Private AC SUV",
        image: "assets/images/pkg_southindia_1782374059257.png",
        category: "south",
        templeDetails: {
            name: "Dravidian Architectural Marvels",
            history: "Patronized by Chola, Pandya and Pallava kings over a thousand years.",
            significance: "Showcases majestic Gopurams and sacred ocean bathing at Rameswaram.",
            architecture: "Massive pillared halls and intricate multi-colored temple towers.",
            bestTime: "November to February",
            dressCode: "Strict traditional attire (Dhoti / Saree).",
            nearby: ["Dhanushkodi", "Vivekananda Memorial"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9575825316223!2d78.11718831526462!3d9.91950269290562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c586b02a969b%3A0xc3910c71bf9e6a9!2sMeenakshi%20Amman%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    },
    {
        id: "pkg-ashtavinayak",
        title: "Ashtavinayak Tour",
        badge: "Family Friendly",
        price: "₹8,500",
        duration: "3 Days / 2 Nights",
        daysNights: { days: 3, nights: 2 },
        route: "Pune - 8 Ganesha Shrines - Pune",
        hotelStars: 3,
        meals: "Breakfast & Dinner",
        accommodation: "Standard AC Rooms",
        transport: "AC Tempo Traveller",
        image: "assets/images/pkg_ashtavinayak_1782374042038.png",
        category: "weekend",
        templeDetails: {
            name: "Eight Swayambhu Ganeshas of Maharashtra",
            history: "A sacred pilgrimage sequence visiting 8 self-manifested Lord Ganesha temples.",
            significance: "Fulfills wishes and grants prosperity and obstacle removal.",
            architecture: "Peshwa style Maharashtrian stone architecture.",
            bestTime: "August to February; Ganeshotsav",
            dressCode: "Modest Indian casual wear.",
            nearby: ["Shivneri Fort", "Pune Shrines"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434316!2d73.78056555!3d18.52460355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    },
    {
        id: "pkg-tirupati",
        title: "Tirupati Balaji Pilgrimage",
        badge: "Short Tour",
        price: "₹6,000",
        duration: "2 Days / 1 Night",
        daysNights: { days: 2, nights: 1 },
        route: "Chennai - Tirupati - Tirumala",
        hotelStars: 4,
        meals: "Breakfast Included",
        accommodation: "Premium AC Hotel",
        transport: "Private AC Sedan",
        image: "assets/images/pkg_tirupati_1782374069785.png",
        category: "south",
        templeDetails: {
            name: "Sri Venkateswara Swami Temple",
            history: "Dating to 300 AD, patronized by Pallava and Chola emperors.",
            significance: "Earthly abode of Lord Vishnu in Kali Yuga.",
            architecture: "Gold-plated Ananda Nilayam dome in Dravidian style.",
            bestTime: "September to February",
            dressCode: "Strict Traditional (Dhoti/Kurta for Men, Saree/Churidar for Women).",
            nearby: ["Padmavathi Temple", "Silathoranam"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5160351717366!2d79.90483831530342!3d13.683272990391809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d455a29c1b921%3A0x67db2ccdfaf2e104!2sSri%20Venkateswara%20Swamy%20Vaari%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    },
    {
        id: "pkg-varanasi",
        title: "Varanasi Spiritual Tour",
        badge: "Senior Friendly",
        price: "₹12,500",
        duration: "3 Days / 2 Nights",
        daysNights: { days: 3, nights: 2 },
        route: "Varanasi - Sarnath - Ghats",
        hotelStars: 4,
        meals: "Breakfast & Dinner",
        accommodation: "Ghat-view Boutique Stay",
        transport: "Private AC Sedan",
        image: "assets/images/pkg_varanasi_1782374079347.png",
        category: "north",
        templeDetails: {
            name: "Kashi Vishwanath & Ganga Ghats",
            history: "Varanasi is one of the world's oldest continuously inhabited cities.",
            significance: "Holiest Jyotirlinga. Ganges bath grants spiritual purification.",
            architecture: "Gold-plated spires built by Ahilyabai Holkar in 1780.",
            bestTime: "October to March",
            dressCode: "Modest Indian attire.",
            nearby: ["Dashashwamedh Ghat", "Sarnath Site"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3155823549646!2d83.00760461546876!3d25.30948958384358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2fa5e01bd80b%3A0xc6a8274d812328ba!2sShri%20Kashi%20Vishwanath%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    }
];

// Active State
let currentTab = 'home';
let currentFilter = 'all';
let searchQuery = '';
let sortOption = 'default';

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initTheme();
    renderAppPackages();
    initFilterControls();
    initBottomSheetBackdrop();
    refreshProfileView();
});

// Clock Updater
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

// iOS Tab Switcher
window.switchToTab = function(tabName) {
    currentTab = tabName;
    
    // Update Views
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.remove('active');
    });
    const targetView = document.getElementById(`tab-${tabName}`);
    if (targetView) targetView.classList.add('active');

    // Update Tab Bar Buttons
    document.querySelectorAll('.ios-tab-item').forEach(btn => {
        btn.classList.remove('active');
    });
    const targetBtn = document.getElementById(`tab-btn-${tabName}`);
    if (targetBtn) targetBtn.classList.add('active');

    // Scroll to top of view
    const container = document.querySelector('.ios-views-container');
    if (container) container.scrollTop = 0;

    // View specific updates
    if (tabName === 'bookings') {
        refreshBookingsView();
    } else if (tabName === 'profile') {
        refreshProfileView();
    }
};

// Theme Switcher
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

// Listen for real-time live package, booking, and review updates published by Admin
window.addEventListener('divineTrailsPackagesUpdated', () => {
    renderAppPackages();
});
window.addEventListener('divineTrailsBookingsUpdated', () => {
    if (typeof refreshBookingsView === 'function') refreshBookingsView();
});
window.addEventListener('divineTrailsReviewsUpdated', () => {
    if (typeof renderReviews === 'function') renderReviews();
});
window.addEventListener('storage', (e) => {
    if (e.key === 'divineTrailsPackages') {
        renderAppPackages();
    } else if (e.key === 'divineTrailsBookings') {
        if (typeof refreshBookingsView === 'function') refreshBookingsView();
    } else if (e.key === 'divineTrailsReviews') {
        if (typeof renderReviews === 'function') renderReviews();
    }
});

// Package Filter & Render
function renderAppPackages() {
    const listEl = document.getElementById('ios-packages-list');
    const countEl = document.getElementById('ios-pkg-count');
    if (!listEl) return;

    const dynamicData = DivineTrailsSDK ? DivineTrailsSDK.getPackages() : packagesData;
    let result = [...dynamicData];

    if (currentFilter !== 'all') {
        result = result.filter(pkg => pkg.category === currentFilter);
    }

    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        result = result.filter(pkg => 
            pkg.title.toLowerCase().includes(q) ||
            pkg.route.toLowerCase().includes(q) ||
            (pkg.templeDetails && pkg.templeDetails.name && pkg.templeDetails.name.toLowerCase().includes(q))
        );
    }

    if (sortOption === 'price-asc') {
        result.sort((a,b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === 'price-desc') {
        result.sort((a,b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === 'duration-asc') {
        result.sort((a,b) => a.daysNights.days - b.daysNights.days);
    }

    if (countEl) countEl.innerText = `Showing ${result.length} Yatras`;

    if (result.length === 0) {
        listEl.innerHTML = `
            <div class="ios-card" style="text-align: center; padding: 40px 20px;">
                <i class="fa-solid fa-compass" style="font-size: 2.5rem; color: var(--ios-primary); margin-bottom: 10px;"></i>
                <h3 style="font-size: 1.1rem; margin-bottom: 6px;">No Yatras Found</h3>
                <p style="font-size: 0.85rem; color: var(--ios-text-secondary);">Try another search term or reset filters.</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = result.map(pkg => `
        <div class="ios-pkg-card" onclick="openPackageSheet('${pkg.id}')">
            <div class="ios-pkg-img">
                <img src="${pkg.image}" alt="${pkg.title}">
                <span class="ios-pkg-badge">${pkg.badge}</span>
            </div>
            <div class="ios-pkg-body">
                <h3 class="ios-pkg-title">${pkg.title}</h3>
                <p class="ios-pkg-route">${pkg.route}</p>
                <div class="ios-pkg-meta-row">
                    <span><i class="fa-solid fa-clock"></i> ${pkg.duration}</span>
                    <span><i class="fa-solid fa-hotel"></i> ${pkg.hotelStars}-Star</span>
                    <span><i class="fa-solid fa-car"></i> AC Car</span>
                </div>
                <div class="ios-pkg-footer">
                    <div class="ios-pkg-price">${pkg.price} <span>/ person</span></div>
                    <button class="ios-btn ios-btn-primary" onclick="event.stopPropagation(); openPackageSheet('${pkg.id}')">
                        Details <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function parsePrice(str) {
    return parseInt(str.replace(/[^\d]/g, ''), 10) || 0;
}

function initFilterControls() {
    const searchInput = document.getElementById('ios-search-input');
    const sortSelect = document.getElementById('ios-sort-select');
    const filterBtns = document.querySelectorAll('.ios-pills-row .ios-pill');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderAppPackages();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortOption = e.target.value;
            renderAppPackages();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderAppPackages();
        });
    });
}

// iOS Bottom Sheet Controller
function initBottomSheetBackdrop() {
    const backdrop = document.getElementById('ios-sheet-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeBottomSheet);
    }
}

window.closeBottomSheet = function() {
    const sheet = document.getElementById('ios-bottom-sheet');
    const backdrop = document.getElementById('ios-sheet-backdrop');
    if (sheet) sheet.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
};

window.openPackageSheet = function(pkgId) {
    const dynamicData = DivineTrailsSDK ? DivineTrailsSDK.getPackages() : packagesData;
    const pkg = dynamicData.find(p => p.id === pkgId);
    if (!pkg) return;

    const sheetBody = document.getElementById('ios-sheet-body');
    const sheet = document.getElementById('ios-bottom-sheet');
    const backdrop = document.getElementById('ios-sheet-backdrop');

    sheetBody.innerHTML = `
        <img src="${pkg.image}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 20px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
                <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--ios-text);">${pkg.title}</h2>
                <p style="font-size: 0.88rem; color: var(--ios-text-secondary);">${pkg.route}</p>
            </div>
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--ios-primary);">${pkg.price}</span>
        </div>

        <div class="ios-card" style="padding: 14px; margin-bottom: 14px;">
            <h4 style="color: var(--ios-primary); font-size: 0.95rem; margin-bottom: 6px;">About Shrine</h4>
            <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-bottom: 6px;"><strong>History:</strong> ${pkg.templeDetails.history}</p>
            <p style="font-size: 0.85rem; color: var(--ios-text-secondary);"><strong>Dress Code:</strong> ${pkg.templeDetails.dressCode}</p>
        </div>

        <div class="ios-card" style="padding: 14px; margin-bottom: 16px;">
            <h4 style="color: var(--ios-primary); font-size: 0.95rem; margin-bottom: 8px;">Package Details</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85rem; color: var(--ios-text-secondary);">
                <div><i class="fa-solid fa-clock" style="color: var(--ios-primary);"></i> ${pkg.duration}</div>
                <div><i class="fa-solid fa-hotel" style="color: var(--ios-primary);"></i> ${pkg.hotelStars}-Star Hotel</div>
                <div><i class="fa-solid fa-utensils" style="color: var(--ios-primary);"></i> ${pkg.meals}</div>
                <div><i class="fa-solid fa-car" style="color: var(--ios-primary);"></i> Private AC Car</div>
            </div>
        </div>

        <button class="ios-btn ios-btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;" onclick="openBookingSheet('${pkg.id}')">
            Book Yatra Now
        </button>
    `;

    backdrop.classList.add('active');
    sheet.classList.add('active');
};

window.openBookingSheet = function(pkgId) {
    const pkg = packagesData.find(p => p.id === pkgId);
    const user = DivineTrailsSDK.getActiveUser();
    
    if (!user) {
        openAuthSheet('login', pkgId);
        return;
    }

    const sheetBody = document.getElementById('ios-sheet-body');
    const today = new Date().toISOString().split('T')[0];

    sheetBody.innerHTML = `
        <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 4px;">Book ${pkg ? pkg.title : 'Yatra'}</h2>
        <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-bottom: 16px;">Synced with Firebase Cloud Storage</p>

        <form id="ios-booking-form">
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Full Name</label>
                <input type="text" id="ios-book-name" value="${user.name}" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
            </div>
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Contact Phone</label>
                <input type="tel" id="ios-book-phone" placeholder="9372889465" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
            </div>
            <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                <div style="flex: 1;">
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Travel Date</label>
                    <input type="date" id="ios-book-date" min="${today}" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
                </div>
                <div style="width: 100px;">
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Travelers</label>
                    <input type="number" id="ios-book-count" min="1" value="2" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
                </div>
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Special Requests</label>
                <textarea id="ios-book-msg" rows="2" placeholder="Senior citizen access, dietary preferences..." style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);"></textarea>
            </div>
            <button type="submit" class="ios-btn ios-btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">
                Confirm & Sync Booking
            </button>
        </form>
    `;

    document.getElementById('ios-booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookingData = {
            userEmail: user.email,
            name: document.getElementById('ios-book-name').value.trim(),
            phone: document.getElementById('ios-book-phone').value.trim(),
            packageName: pkg ? pkg.title : 'Custom Yatra',
            date: document.getElementById('ios-book-date').value,
            travelers: document.getElementById('ios-book-count').value,
            message: document.getElementById('ios-book-msg').value.trim()
        };

        const res = await DivineTrailsSDK.createBooking(bookingData);
        closeBottomSheet();
        showToast(`Booking ${res.ref} confirmed! Saved in Firebase.`);
        switchToTab('bookings');
    });
};

window.openAuthSheet = function(mode, pendingPkgId) {
    const sheetBody = document.getElementById('ios-sheet-body');
    const sheet = document.getElementById('ios-bottom-sheet');
    const backdrop = document.getElementById('ios-sheet-backdrop');

    sheetBody.innerHTML = `
        <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 4px;">${mode === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
        <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-bottom: 16px;">Synced across Divine Trails Web & App</p>

        <form id="ios-auth-form">
            ${mode === 'signup' ? `
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Full Name</label>
                    <input type="text" id="ios-auth-name" placeholder="Ramesh Sharma" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
                </div>
            ` : ''}
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Email Address</label>
                <input type="email" id="ios-auth-email" placeholder="your@email.com" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px;">Password</label>
                <input type="password" id="ios-auth-pass" placeholder="••••••••" required style="width: 100%; padding: 12px; border-radius: 12px; background: var(--ios-bg-secondary); border: none; color: var(--ios-text); font-family: var(--font-apple);">
            </div>
            <button type="submit" class="ios-btn ios-btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">
                ${mode === 'signup' ? 'Sign Up' : 'Login'}
            </button>
            
            <p style="text-align: center; margin-top: 14px; font-size: 0.85rem; color: var(--ios-text-secondary);">
                ${mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                <a href="#" onclick="event.preventDefault(); openAuthSheet('${mode === 'signup' ? 'login' : 'signup'}', '${pendingPkgId || ''}')" style="color: var(--ios-primary); font-weight: 600;">
                    ${mode === 'signup' ? 'Login' : 'Sign Up'}
                </a>
            </p>
        </form>
    `;

    backdrop.classList.add('active');
    sheet.classList.add('active');

    document.getElementById('ios-auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('ios-auth-email').value.trim();
        const pass = document.getElementById('ios-auth-pass').value.trim();

        if (mode === 'signup') {
            const name = document.getElementById('ios-auth-name').value.trim();
            await DivineTrailsSDK.registerUser(name, email, pass);
            showToast(`Welcome ${name}! Account created.`);
        } else {
            const u = await DivineTrailsSDK.loginUser(email, pass);
            showToast(`Welcome back, ${u.name}!`);
        }

        closeBottomSheet();
        refreshProfileView();

        if (email.toLowerCase() === 'mr.avishkarranjane07@gmail.com') {
            setTimeout(() => {
                window.location.href = '/admin';
            }, 600);
            return;
        }

        if (pendingPkgId) {
            setTimeout(() => openBookingSheet(pendingPkgId), 500);
        }
    });
};

// Render Synced Bookings
async function refreshBookingsView() {
    const listEl = document.getElementById('ios-bookings-list');
    if (!listEl) return;

    const user = DivineTrailsSDK.getActiveUser();
    if (!user) {
        listEl.innerHTML = `
            <div class="ios-card" style="text-align: center; padding: 40px 20px;">
                <i class="fa-solid fa-lock" style="font-size: 2.5rem; color: var(--ios-primary); margin-bottom: 12px;"></i>
                <h3 style="font-size: 1.15rem; margin-bottom: 6px;">Login to View Bookings</h3>
                <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-bottom: 16px;">Sign in to sync yatras booked on Web or App.</p>
                <button class="ios-btn ios-btn-primary" onclick="openAuthSheet('login')">Login / Sign Up</button>
            </div>
        `;
        return;
    }

    const bookings = await DivineTrailsSDK.getUserBookings(user.email);

    if (bookings.length === 0) {
        listEl.innerHTML = `
            <div class="ios-card" style="text-align: center; padding: 40px 20px;">
                <i class="fa-solid fa-calendar-xmark" style="font-size: 2.5rem; color: var(--ios-text-tertiary); margin-bottom: 12px;"></i>
                <h3 style="font-size: 1.15rem; margin-bottom: 6px;">No Bookings Yet</h3>
                <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-bottom: 16px;">Explore tour packages and plan your first pilgrimage!</p>
                <button class="ios-btn ios-btn-primary" onclick="switchToTab('packages')">Explore Packages</button>
            </div>
        `;
        return;
    }

    listEl.innerHTML = bookings.map(b => `
        <div class="ios-card">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--ios-card-border); padding-bottom: 8px; margin-bottom: 10px;">
                <strong style="color: var(--ios-primary); font-size: 0.9rem;"><i class="fa-solid fa-ticket"></i> Ref: ${b.ref}</strong>
                <span style="background: rgba(52,199,89,0.15); color: var(--ios-green); padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">Confirmed</span>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${b.packageName}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.82rem; color: var(--ios-text-secondary);">
                <div><i class="fa-solid fa-calendar-day" style="color: var(--ios-primary);"></i> Date: ${b.dateFormatted || b.date}</div>
                <div><i class="fa-solid fa-users" style="color: var(--ios-primary);"></i> Travelers: ${b.travelers}</div>
                <div><i class="fa-solid fa-user" style="color: var(--ios-primary);"></i> Lead: ${b.name}</div>
                <div><i class="fa-solid fa-phone" style="color: var(--ios-primary);"></i> ${b.phone}</div>
            </div>
        </div>
    `).join('');
}

// Render Profile View
function refreshProfileView() {
    const cardEl = document.getElementById('ios-profile-card');
    if (!cardEl) return;

    const user = DivineTrailsSDK.getActiveUser();
    const isAdmin = DivineTrailsSDK.isAdminUser();

    if (user) {
        cardEl.innerHTML = `
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--ios-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 800;">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 style="font-size: 1.15rem; font-weight: 800;">${user.name} ${isAdmin ? '👑' : ''}</h3>
                    <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin: 0;">${user.email}</p>
                </div>
            </div>
            ${isAdmin ? `
                <a href="/admin" class="ios-btn ios-btn-primary" style="width: 100%; text-align: center; display: block; text-decoration: none; margin-bottom: 10px;">
                    <i class="fa-solid fa-crown"></i> Open Mobile Admin Panel
                </a>
            ` : ''}
            <button class="ios-btn ios-btn-secondary" style="width: 100%; color: var(--ios-red);" onclick="logoutUserSession()">
                <i class="fa-solid fa-right-from-bracket"></i> Logout Account
            </button>
        `;
    } else {
        cardEl.innerHTML = `
            <div style="text-align: center; padding: 10px 0;">
                <i class="fa-solid fa-user-circle" style="font-size: 3rem; color: var(--ios-text-tertiary); margin-bottom: 8px;"></i>
                <h3 style="font-size: 1.1rem; margin-bottom: 4px;">Guest Traveler</h3>
                <p style="font-size: 0.85rem; color: var(--ios-text-secondary); margin-bottom: 14px;">Sign in to sync your Yatras across Web & App</p>
                <div style="display: flex; gap: 10px;">
                    <button class="ios-btn ios-btn-primary" style="flex: 1;" onclick="openAuthSheet('login')">Login</button>
                    <button class="ios-btn ios-btn-secondary" style="flex: 1;" onclick="openAuthSheet('signup')">Sign Up</button>
                </div>
            </div>
        `;
    }
}

window.logoutUserSession = function() {
    DivineTrailsSDK.logoutUser();
    showToast("Logged out successfully");
    refreshProfileView();
    refreshBookingsView();
};

// Lightbox Viewer
const galleryCaptions = [
    "Ancient Temple Architecture",
    "Sacred Evening Aarti",
    "Devotees Praying",
    "Majestic Dravidian Gopuram",
    "Ganga Aarti Ritual",
    "Himalayan Temple Shrine"
];

window.openLightbox = function(idx) {
    const images = [
        "assets/images/gal_1_1782373941988.png",
        "assets/images/gal_2_1782373954072.png",
        "assets/images/gal_3_1782373966236.png",
        "assets/images/gal_4_1782373977469.png",
        "assets/images/gal_5_1782373999741.png",
        "assets/images/gal_6_1782374012756.png"
    ];

    const modal = document.getElementById('ios-lightbox-modal');
    const img = document.getElementById('ios-lightbox-img');
    const cap = document.getElementById('ios-lightbox-caption');

    if (modal && img) {
        img.src = images[idx];
        if (cap) cap.innerText = galleryCaptions[idx] || "Sacred Moment";
        modal.classList.add('active');
    }
};

window.closeLightbox = function() {
    const modal = document.getElementById('ios-lightbox-modal');
    if (modal) modal.classList.remove('active');
};

// Toast Pill Helper
function showToast(msg) {
    const toast = document.getElementById('ios-toast');
    const msgEl = document.getElementById('ios-toast-msg');
    if (toast && msgEl) {
        msgEl.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}
