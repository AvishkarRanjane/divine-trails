/* ==========================================================================
   Data Model: Packages & Temples
   ========================================================================== */
   const packagesData = [
    {
        id: "pkg-jyotirlinga",
        title: "Jyotirlinga Darshan Tour",
        badge: "Best Seller",
        price: "₹15,000",
        duration: "4 Days / 3 Nights",
        daysNights: { days: 4, nights: 3 },
        route: "Indore - Ujjain - Omkareshwar - Maheshwar",
        hotelStars: 4,
        meals: "Breakfast & Dinner Included",
        accommodation: "Premium AC Rooms",
        transport: "Private AC Vehicle",
        templesCovered: ["Mahakaleshwar", "Omkareshwar"],
        inclusions: [
            "Accommodation in 4-star hotels",
            "Private AC Transportation",
            "Breakfast and Dinner",
            "VIP Darshan assistance",
            "Toll & Parking fees"
        ],
        exclusions: [
            "Flights/Train fare",
            "Personal expenses",
            "Lunch",
            "Camera fees"
        ],
        image: "assets/images/gal_2_1782373954072.png",
        category: "north",
        templeDetails: {
            name: "Mahakaleshwar & Omkareshwar",
            history: "Ancient shrines dedicated to Lord Shiva. Mahakaleshwar is known for its unique Bhasma Aarti, while Omkareshwar is situated on the Om-shaped Mandhata island in the Narmada river.",
            significance: "These form two of the 12 sacred Jyotirlingas in India, highly revered in Hinduism.",
            architecture: "Maratha, Bhumija, and Chalukya architectural styles featuring towering spires and intricate carvings.",
            bestTime: "October to March; Maha Shivaratri",
            dressCode: "Traditional Indian attire. Men must wear Dhoti for Bhasma Aarti. Women should wear Saree or Salwar suit.",
            nearby: ["Harsiddhi Mata Temple", "Kal Bhairav Temple", "Maheshwar Fort"],
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
        route: "Haridwar - Yamunotri - Gangotri - Kedarnath - Badrinath",
        hotelStars: 3,
        meals: "All Meals Included",
        accommodation: "Comfortable AC/Non-AC Rooms",
        transport: "Pushback AC Coach",
        templesCovered: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
        inclusions: [
            "Accommodation in neat & clean hotels",
            "Transportation from Haridwar",
            "All veg meals (Breakfast, Lunch, Dinner)",
            "Helicopter booking assistance (Kedarnath)",
            "Tour Manager"
        ],
        exclusions: [
            "Helicopter tickets",
            "Pony/Palanquin charges",
            "Special pooja tickets"
        ],
        image: "assets/images/dest_kedarnath_1782373896529.png",
        category: "north",
        templeDetails: {
            name: "The Sacred Himalayas",
            history: "Established by Adi Shankaracharya in the 8th century, these four shrines define the most revered pilgrimage circuit in Hinduism.",
            significance: "Believed to wash away sins and help achieve Moksha (salvation).",
            architecture: "Traditional Himalayan stone and wood architecture capable of withstanding extreme weather.",
            bestTime: "May to June and September to October. Closed during winter.",
            dressCode: "Warm clothing required. Modest attire covering shoulders and knees.",
            nearby: ["Rishikesh", "Mana Village", "Valley of Flowers (detour)"],
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
        route: "Chennai - Kanchipuram - Mahabalipuram - Madurai - Rameswaram",
        hotelStars: 4,
        meals: "Breakfast Included",
        accommodation: "Premium AC Hotels",
        transport: "Private AC Sedan/SUV",
        templesCovered: ["Meenakshi Amman", "Ramanathaswamy", "Kamakshi Amman"],
        inclusions: [
            "Premium accommodation",
            "Daily Breakfast",
            "Private vehicle for entire trip",
            "English speaking guide",
            "All taxes and tolls"
        ],
        exclusions: [
            "Entry tickets",
            "Lunch and Dinner",
            "Flight tickets"
        ],
        image: "assets/images/pkg_southindia_1782374059257.png",
        category: "south",
        templeDetails: {
            name: "Dravidian Masterpieces",
            history: "Centuries-old temples patronized by Chola, Pandya, and Pallava dynasties.",
            significance: "Showcases the pinnacle of South Indian devotion and architectural brilliance. Rameswaram is one of the Char Dham and a Jyotirlinga.",
            architecture: "Dravidian style with massive Gopurams (gateway towers), intricately carved pillared halls, and vast temple tanks.",
            bestTime: "November to February",
            dressCode: "Strict. Men must remove shirts and wear Dhotis in many Kerala/TN temples. Women must wear Sarees or Salwar suits with dupattas.",
            nearby: ["Vivekananda Rock Memorial", "Dhanushkodi"],
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
        route: "Pune - Morgaon - Siddhatek - Pali - Mahad - Theur - Lenyadri - Ozar - Ranjangaon",
        hotelStars: 3,
        meals: "Breakfast & Dinner",
        accommodation: "Standard AC Rooms",
        transport: "AC Tempo Traveller",
        templesCovered: ["8 Ganesha Temples"],
        inclusions: [
            "Accommodation",
            "Transportation from Pune",
            "Breakfast & Dinner",
            "Group Guide"
        ],
        exclusions: [
            "Pooja Samagri",
            "Lunch"
        ],
        image: "assets/images/pkg_ashtavinayak_1782374042038.png",
        category: "weekend",
        templeDetails: {
            name: "Eight Ganeshas of Maharashtra",
            history: "The Ashtavinayaka yatra refers to a pilgrimage to the eight Hindu temples in Maharashtra state of India that house eight distinct idols of Ganesha, in a pre-ascertained sequence.",
            significance: "All the eight Ashtavinayak temples are Swayambhu (self-originated) and Jagrut.",
            architecture: "Traditional Maharashtrian Peshwa style architecture, mostly built of stone with wooden sabhamandapas.",
            bestTime: "August to February; Maghi Ganeshotsav",
            dressCode: "Modest Indian casual wear.",
            nearby: ["Shivneri Fort", "Pune City attractions"],
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
        route: "Chennai - Tirupati - Tirumala - Chennai",
        hotelStars: 4,
        meals: "Breakfast Included",
        accommodation: "Premium AC Hotel in Tirupati",
        transport: "Private AC Car",
        templesCovered: ["Sri Venkateswara Temple", "Padmavathi Temple"],
        inclusions: [
            "1 Night stay in Tirupati",
            "Special Entry Darshan tickets",
            "Pick up & Drop from Chennai",
            "Toll & State Permits"
        ],
        exclusions: [
            "Tonsure (Mundan) charges",
            "Extra Laddu Prasadam"
        ],
        image: "assets/images/pkg_tirupati_1782374069785.png",
        category: "south",
        templeDetails: {
            name: "Sri Venkateswara Swami Temple",
            history: "Dating back to 300 AD, it has been patronized by various dynasties including Pallavas, Cholas, and Vijayanagara empire.",
            significance: "Considered the earthly abode of Lord Vishnu (Venkateswara) in Kali Yuga. One of the richest and most visited religious centers in the world.",
            architecture: "Dravidian architecture with a gold-plated Ananda Nilayam (sanctum sanctorum).",
            bestTime: "September to February; Brahmotsavam",
            dressCode: "Very Strict. Men: Dhoti/Kurta or Pyjama. Women: Saree, Half-Saree or Churidar with Dupatta. Western wear like jeans/t-shirts not allowed.",
            nearby: ["Sri Kalahasti Temple", "Silathoranam"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5160351717366!2d79.90483831530342!3d13.683272990391809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d455a29c1b921%3A0x67db2ccdfaf2e104!2sSri%20Venkateswara%20Swamy%20Vaari%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    },
    {
        id: "pkg-varanasi",
        title: "Varanasi Spiritual Tour",
        badge: "Senior Citizen Friendly",
        price: "₹12,500",
        duration: "3 Days / 2 Nights",
        daysNights: { days: 3, nights: 2 },
        route: "Varanasi - Sarnath - Prayagraj (Optional)",
        hotelStars: 4,
        meals: "Breakfast & Dinner",
        accommodation: "Ghat-view Boutique Hotel",
        transport: "Private AC Sedan",
        templesCovered: ["Kashi Vishwanath", "Sankat Mochan", "Annapurna Temple"],
        inclusions: [
            "Hotel stay",
            "Morning boat ride on Ganges",
            "VIP Darshan at Kashi Vishwanath",
            "Reserved seating for Evening Aarti",
            "Transfers"
        ],
        exclusions: [
            "Flights/Trains",
            "Personal offerings (Pooja Samagri)"
        ],
        image: "assets/images/pkg_varanasi_1782374079347.png",
        category: "north",
        templeDetails: {
            name: "Kashi Vishwanath & The Ghats",
            history: "Varanasi is one of the oldest continuously inhabited cities in the world. The current Kashi Vishwanath temple was built by Ahilyabai Holkar in 1780.",
            significance: "The holiest of the 12 Jyotirlingas. Bathing in the Ganges here is believed to grant liberation (Moksha).",
            architecture: "Nagara style architecture. The temple spires are plated with gold donated by Maharaja Ranjit Singh.",
            bestTime: "October to March; Dev Deepawali",
            dressCode: "Modest attire. Avoid shorts and sleeveless clothes. Traditional wear is encouraged.",
            nearby: ["Dashashwamedh Ghat", "Sarnath Buddhist Site", "Ramnagar Fort"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3155823549646!2d83.00760461546876!3d25.30948958384358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2fa5e01bd80b%3A0xc6a8274d812328ba!2sShri%20Kashi%20Vishwanath%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    }
];

/* ==========================================================================
   DOM Elements & Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme first to prevent flash
    initThemeToggle();
    // Render initial packages
    filterAndRenderPackages();
    // Component initializations
    initNavbar();
    initScrollAnimations();
    initCounters();
    initFilters();
    initPackageControls();
    initAccordion();
    initForm();
    initModals();
    initBookingsModal();
    initGalleryLightbox();
    initFloatingContact();
    initBackToTop();
    initAuth();
    initFeedback();
});

/* ==========================================================================
   State & Filter Management
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';
let sortOption = 'default';

const packagesContainer = document.getElementById('packages-container');

// Listen for real-time live package updates published by Admin
window.addEventListener('divineTrailsPackagesUpdated', () => {
    filterAndRenderPackages();
});
window.addEventListener('storage', (e) => {
    if (e.key === 'divineTrailsPackages' || e.key === 'divineTrailsBookings') {
        filterAndRenderPackages();
    }
});

function filterAndRenderPackages() {
    if (!packagesContainer) return;
    
    // Fetch dynamic packages live from SDK
    const dynamicData = DivineTrailsSDK ? DivineTrailsSDK.getPackages() : packagesData;
    let result = [...dynamicData];
    
    // Category Filter
    if (activeCategory !== 'all') {
        result = result.filter(pkg => pkg.category === activeCategory);
    }
    
    // Search Query Filter
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        result = result.filter(pkg => 
            pkg.title.toLowerCase().includes(query) ||
            pkg.route.toLowerCase().includes(query) ||
            (pkg.templeDetails && pkg.templeDetails.name && pkg.templeDetails.name.toLowerCase().includes(query))
        );
    }
    
    // Sorting
    if (sortOption === 'price-asc') {
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === 'price-desc') {
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === 'duration-asc') {
        result.sort((a, b) => (a.daysNights ? a.daysNights.days : 0) - (b.daysNights ? b.daysNights.days : 0));
    } else if (sortOption === 'duration-desc') {
        result.sort((a, b) => (b.daysNights ? b.daysNights.days : 0) - (a.daysNights ? a.daysNights.days : 0));
    }

    renderPackages(result);
}

function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
}

/* ==========================================================================
   Package Rendering
   ========================================================================== */
function renderPackages(data) {
    if (!packagesContainer) return;
    
    packagesContainer.innerHTML = '';
    
    if (data.length === 0) {
        packagesContainer.innerHTML = `
            <div class="no-results-msg">
                <i class="fa-solid fa-compass"></i>
                <h3>No Yatras Found</h3>
                <p>Try searching for a different temple, city, or reset filters.</p>
            </div>
        `;
        return;
    }

    data.forEach((pkg, index) => {
        const delay = index % 3;
        const card = document.createElement('div');
        card.className = `package-card reveal active delay-${delay}`;
        card.setAttribute('data-category', pkg.category);
        
        card.innerHTML = `
            ${pkg.badge ? `<div class="package-badge">${pkg.badge}</div>` : ''}
            <div class="package-img-wrapper">
                <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
            </div>
            <div class="package-content">
                <h3 class="package-title">${pkg.title}</h3>
                <div class="package-info-grid">
                    <div class="package-info-item">
                        <i class="fa-solid fa-clock"></i>
                        <span>${pkg.duration}</span>
                    </div>
                    <div class="package-info-item">
                        <i class="fa-solid fa-hotel"></i>
                        <span>${pkg.hotelStars}-Star Stay</span>
                    </div>
                    <div class="package-info-item">
                        <i class="fa-solid fa-utensils"></i>
                        <span>${pkg.meals.split(' ')[0]}</span>
                    </div>
                    <div class="package-info-item">
                        <i class="fa-solid fa-car"></i>
                        <span>AC Vehicle</span>
                    </div>
                </div>
                <div class="package-footer">
                    <div class="package-price">
                        ${pkg.price} <span>/ person</span>
                    </div>
                    <button class="btn btn-outline view-details-btn" data-id="${pkg.id}">View Details</button>
                </div>
            </div>
        `;
        packagesContainer.appendChild(card);
    });

    // Attach modal listeners
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkgId = e.target.getAttribute('data-id');
            const pkgData = packagesData.find(p => p.id === pkgId);
            openModal(pkgData);
        });
    });
}

/* ==========================================================================
   Filters, Search & Sort
   ========================================================================== */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-filter');
            filterAndRenderPackages();
        });
    });
}

function initPackageControls() {
    const searchInput = document.getElementById('package-search-input');
    const sortSelect = document.getElementById('package-sort-select');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndRenderPackages();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortOption = e.target.value;
            filterAndRenderPackages();
        });
    }
}

/* ==========================================================================
   Modal System (Package Details)
   ========================================================================== */
const modalOverlay = document.getElementById('modal-overlay');
const packageModal = document.getElementById('package-modal');
const modalBody = document.getElementById('modal-body');

function initModals() {
    if (!modalOverlay || !packageModal) return;

    const closeBtns = document.querySelectorAll('.modal-close');
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modalOverlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(pkg) {
    if (!pkg) return;
    
    const inclusionsHtml = pkg.inclusions.map(inc => `<li><i class="fa-solid fa-check"></i> ${inc}</li>`).join('');
    const exclusionsHtml = pkg.exclusions.map(exc => `<li><i class="fa-solid fa-xmark"></i> ${exc}</li>`).join('');
    const nearbyHtml = pkg.templeDetails.nearby.map(n => `<li><i class="fa-solid fa-location-dot"></i> ${n}</li>`).join('');

    const weathers = ['24°C, Pleasant', '28°C, Sunny', '22°C, Light Rain', '26°C, Clear'];
    const crowds = ['Light Crowd Today', 'Moderate Crowd', 'Heavy Crowd Expected', 'Perfect Time to Visit'];
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const randomCrowd = crowds[Math.floor(Math.random() * crowds.length)];

    const liveBadgesHtml = `
        <div class="live-badges">
            <span class="live-badge badge-weather"><i class="fa-solid fa-cloud-sun"></i> ${randomWeather}</span>
            <span class="live-badge badge-crowd"><i class="fa-solid fa-users"></i> ${randomCrowd}</span>
        </div>
    `;

    modalBody.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.title}" class="modal-header-img">
        <div class="modal-inner">
            <div class="modal-title-row">
                <div>
                    <h2>${pkg.title}</h2>
                    <p>${pkg.route}</p>
                    ${liveBadgesHtml}
                </div>
                <div class="modal-price">${pkg.price} <span>/ person</span></div>
            </div>
            
            <div class="modal-grid">
                <div>
                    <div class="modal-section">
                        <h4>About ${pkg.templeDetails.name}</h4>
                        <p><strong>History:</strong> ${pkg.templeDetails.history}</p>
                        <p><strong>Significance:</strong> ${pkg.templeDetails.significance}</p>
                        <p><strong>Architecture:</strong> ${pkg.templeDetails.architecture}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Package Details</h4>
                        <ul class="info-list">
                            <li><i class="fa-solid fa-calendar-days"></i> <strong>Duration:</strong> ${pkg.duration}</li>
                            <li><i class="fa-solid fa-hotel"></i> <strong>Accommodation:</strong> ${pkg.accommodation} (${pkg.hotelStars} Star)</li>
                            <li><i class="fa-solid fa-utensils"></i> <strong>Meals:</strong> ${pkg.meals}</li>
                            <li><i class="fa-solid fa-car"></i> <strong>Transport:</strong> ${pkg.transport}</li>
                        </ul>
                    </div>

                    <div class="modal-section">
                        <h4>Inclusions & Exclusions</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <h5>Included</h5>
                                <ul class="inclusion-list">${inclusionsHtml}</ul>
                            </div>
                            <div>
                                <h5>Not Included</h5>
                                <ul class="exclusion-list">${exclusionsHtml}</ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="modal-section">
                        <h4>Traveler Guidelines</h4>
                        <ul class="info-list">
                            <li><i class="fa-solid fa-sun"></i> <strong>Best Time:</strong> ${pkg.templeDetails.bestTime}</li>
                            <li><i class="fa-solid fa-shirt"></i> <strong>Dress Code:</strong> ${pkg.templeDetails.dressCode}</li>
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Nearby Attractions</h4>
                        <ul class="info-list" style="margin-bottom: 0;">${nearbyHtml}</ul>
                    </div>

                    <div class="modal-section">
                        <h4>Location</h4>
                        <div class="map-container">
                            <iframe src="${pkg.templeDetails.mapUrl}" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary full-width" onclick="scrollToBooking('${pkg.id}')" style="margin-top: 16px;">
                        Book This Package
                    </button>
                </div>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    packageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    if (packageModal) packageModal.classList.remove('active');
    const bookingsModal = document.getElementById('bookings-modal');
    if (bookingsModal) bookingsModal.classList.remove('active');
    document.body.style.overflow = '';
}

window.scrollToBooking = function(pkgId) {
    closeModal();
    const contactSection = document.getElementById('contact');
    const select = document.getElementById('packageSelect');
    
    if (select && pkgId) {
        const valueToSelect = pkgId.replace('pkg-', '');
        const option = Array.from(select.options).find(opt => opt.value === valueToSelect);
        if (option) option.selected = true;
    }
    
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
};

/* ==========================================================================
   My Bookings Modal & Manager
   ========================================================================== */
function initBookingsModal() {
    const bookingsModal = document.getElementById('bookings-modal');
    const closeBtn = document.querySelector('.bookings-modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            bookingsModal.classList.remove('active');
            if (modalOverlay) modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

window.openMyBookingsModal = function() {
    const bookingsModal = document.getElementById('bookings-modal');
    const bookingsBody = document.getElementById('bookings-modal-body');
    if (!bookingsModal || !bookingsBody) return;

    const userStr = localStorage.getItem('divineTrailsUser');
    const user = userStr ? JSON.parse(userStr) : null;
    const allBookingsStr = localStorage.getItem('divineTrailsBookings');
    const allBookings = allBookingsStr ? JSON.parse(allBookingsStr) : [];

    const userBookings = user ? allBookings.filter(b => b.userEmail === user.email) : [];

    if (userBookings.length === 0) {
        bookingsBody.innerHTML = `
            <div class="no-bookings">
                <i class="fa-solid fa-calendar-xmark"></i>
                <h3>No Bookings Found</h3>
                <p>You have not booked any yatras yet. Select a package and begin your divine journey!</p>
            </div>
        `;
    } else {
        bookingsBody.innerHTML = `
            <div class="bookings-list">
                ${userBookings.map(b => `
                    <div class="booking-card">
                        <div class="booking-card-header">
                            <span class="booking-ref"><i class="fa-solid fa-ticket"></i> Ref: ${b.ref}</span>
                            <span class="booking-badge"><i class="fa-solid fa-circle-check"></i> ${b.status}</span>
                        </div>
                        <h3 style="margin-bottom: 4px; font-size: 1.1rem;">${b.packageName}</h3>
                        <div class="booking-details-grid">
                            <div class="booking-detail-item"><i class="fa-solid fa-calendar-day"></i> Travel Date: ${b.date}</div>
                            <div class="booking-detail-item"><i class="fa-solid fa-users"></i> Travelers: ${b.travelers}</div>
                            <div class="booking-detail-item"><i class="fa-solid fa-user"></i> Lead: ${b.name}</div>
                            <div class="booking-detail-item"><i class="fa-solid fa-phone"></i> ${b.phone}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (modalOverlay) modalOverlay.classList.add('active');
    bookingsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

/* ==========================================================================
   Gallery Lightbox System
   ========================================================================== */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item img');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightboxModal || galleryItems.length === 0) return;

    let currentIndex = 0;

    function updateLightbox(index) {
        currentIndex = index;
        const img = galleryItems[currentIndex];
        lightboxImg.src = img.src;
        lightboxCaption.innerText = img.alt || "Divine Moment";
    }

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            updateLightbox(index);
            lightboxModal.classList.add('active');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => lightboxModal.classList.remove('active'));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const nextIdx = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox(nextIdx);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIdx = (currentIndex + 1) % galleryItems.length;
            updateLightbox(nextIdx);
        });
    }

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') {
            const nextIdx = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox(nextIdx);
        } else if (e.key === 'ArrowRight') {
            const nextIdx = (currentIndex + 1) % galleryItems.length;
            updateLightbox(nextIdx);
        } else if (e.key === 'Escape') {
            lightboxModal.classList.remove('active');
        }
    });
}

/* ==========================================================================
   Theme Toggle (Persistent)
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Read from localStorage
    const savedTheme = localStorage.getItem('divineTrailsTheme') || 'light';
    root.setAttribute('data-theme', savedTheme);

    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', nextTheme);
        localStorage.setItem('divineTrailsTheme', nextTheme);
        
        if (icon) {
            icon.className = nextTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });
}

/* ==========================================================================
   Navbar & Scroll Behavior
   ========================================================================== */
function initNavbar() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const backdrop = document.getElementById('navbar-backdrop');
    
    function closeMobileNavbar() {
        if (hamburger) hamburger.classList.remove('active');
        if (navbar) navbar.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
            if (backdrop) backdrop.classList.toggle('active');
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobileNavbar);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNavbar);
    });

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Scroll Animations & Counters
   ========================================================================== */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString('en-IN');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString('en-IN');
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) counterObserver.observe(statsSection);
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            accordionHeaders.forEach(h => {
                if (h !== header && h.classList.contains('active')) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });

            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

/* ==========================================================================
   Form Validation & Booking Preservation
   ========================================================================== */
function initForm() {
    const form = document.getElementById('bookingForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    const toast = document.getElementById('toast');
    const dateInput = document.getElementById('date');

    // Prevent selecting past dates
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Single time event listener attachment to avoid duplicate listener leaks
    if (form) {
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group) group.classList.remove('error');
            });
        });
    }

    if (newsletterForm && toast) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                const btn = newsletterForm.querySelector('button');
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                    newsletterForm.reset();
                    toast.querySelector('span').innerText = 'Subscribed successfully to Divine Trails!';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 4000);
                }, 800);
            }
        });
    }

    if (!form || !toast) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredInputs = form.querySelectorAll('input[required]');
        
        requiredInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (!input.value.trim()) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }

            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    formGroup.classList.add('error');
                    isValid = false;
                }
            }
        });

        if (isValid) {
            const userStr = localStorage.getItem('divineTrailsUser');
            
            const bookingData = {
                ref: 'DT-' + Math.floor(10000 + Math.random() * 90000),
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                packageName: document.getElementById('packageSelect').options[document.getElementById('packageSelect').selectedIndex].text || 'Custom Yatra',
                date: document.getElementById('date').value || 'To be decided',
                travelers: document.getElementById('travelers').value || '1',
                message: document.getElementById('message').value.trim(),
                status: 'Confirmed',
                timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            };

            if (!userStr) {
                // Save draft in sessionStorage and redirect cleanly
                sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData));
                window.location.href = 'auth.html?redirect=booking';
                return;
            }

            const user = JSON.parse(userStr);
            bookingData.userEmail = user.email;

            // Save booking to localStorage
            const existingBookingsStr = localStorage.getItem('divineTrailsBookings');
            const bookingsList = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
            bookingsList.unshift(bookingData);
            localStorage.setItem('divineTrailsBookings', JSON.stringify(bookingsList));

            // Submit loading animation
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
                
                toast.querySelector('span').innerText = `Yatra booked successfully! Booking Ref: ${bookingData.ref}`;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 5000);
            }, 1200);
        }
    });
}

/* ==========================================================================
   Back to Top & Floating Contact Widget
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initFloatingContact() {
    const floatingBtn = document.getElementById('floating-contact-btn');
    const floatingMenu = document.getElementById('floating-contact-menu');

    if (floatingBtn && floatingMenu) {
        floatingBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            floatingMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            floatingMenu.classList.remove('show');
        });
    }
}

/* ==========================================================================
   Authentication & Profile Dropdown State
   ========================================================================== */
function initAuth() {
    const userContainer = document.getElementById('user-nav-container');
    if (!userContainer) return;

    const userStr = localStorage.getItem('divineTrailsUser');
    
    if (userStr) {
        const user = JSON.parse(userStr);
        const firstName = user.name ? user.name.split(' ')[0] : 'Pilgrim';
        
        const isAdmin = DivineTrailsSDK.isAdminUser();
        
        userContainer.innerHTML = `
            <div class="user-dropdown-container">
                <button class="user-dropdown-toggle" id="user-dropdown-btn">
                    <span class="user-avatar-icon">${firstName.charAt(0).toUpperCase()}</span>
                    <span>Namaste, ${firstName} ${isAdmin ? '👑 (Admin)' : ''}</span>
                    <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>
                </button>
                <div class="user-dropdown-menu" id="user-dropdown-menu">
                    <div class="user-dropdown-header">
                        <strong>${user.name}</strong>
                        <small>${user.email}</small>
                    </div>
                    ${isAdmin ? `
                        <a href="/admin" class="dropdown-item" style="color: var(--primary-color); font-weight: 700;">
                            <i class="fa-solid fa-crown"></i> Open Admin Panel
                        </a>
                    ` : ''}
                    <button class="dropdown-item" onclick="openMyBookingsModal()">
                        <i class="fa-solid fa-suitcase-rolling"></i> My Bookings
                    </button>
                    <button class="dropdown-item logout-item" id="logout-btn">
                        <i class="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                </div>
            </div>
        `;

        const dropBtn = document.getElementById('user-dropdown-btn');
        const dropMenu = document.getElementById('user-dropdown-menu');
        const logoutBtn = document.getElementById('logout-btn');

        if (dropBtn && dropMenu) {
            dropBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                dropMenu.classList.remove('show');
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('divineTrailsUser');
                window.location.reload();
            });
        }
    }

    // Check for pending booking restored from sessionStorage after login
    const pendingStr = sessionStorage.getItem('pendingBooking');
    if (pendingStr && userStr) {
        const user = JSON.parse(userStr);
        const bookingData = JSON.parse(pendingStr);
        bookingData.userEmail = user.email;

        const existingBookingsStr = localStorage.getItem('divineTrailsBookings');
        const bookingsList = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
        bookingsList.unshift(bookingData);
        localStorage.setItem('divineTrailsBookings', JSON.stringify(bookingsList));
        sessionStorage.removeItem('pendingBooking');

        const toast = document.getElementById('toast');
        if (toast) {
            toast.querySelector('span').innerText = `Welcome back, ${user.name.split(' ')[0]}! Booking confirmed (Ref: ${bookingData.ref}).`;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 5000);
        }

        // Open My Bookings after a slight pause
        setTimeout(() => {
            openMyBookingsModal();
        }, 1000);
    }
}

/* ==========================================================================
   Feedback Form & Testimonials Persistence
   ========================================================================== */
function initFeedback() {
    const stars = document.querySelectorAll('.star-rating i');
    const ratingValue = document.getElementById('ratingValue');
    const ratingText = document.getElementById('rating-text');
    const form = document.getElementById('feedbackForm');
    const successMsg = document.getElementById('feedback-success');

    // Load saved persistent reviews into testimonials
    loadSavedReviews();

    if (!form) return;

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const val = this.getAttribute('data-rating');
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= val) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });

        star.addEventListener('click', function() {
            const val = this.getAttribute('data-rating');
            ratingValue.value = val;
            
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= val) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            const texts = ["Select your rating", "Poor", "Fair", "Good", "Very Good", "Divine Experience!"];
            ratingText.innerText = texts[val];
            ratingText.style.color = ''; // Reset color if previously errored
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rating = parseInt(ratingValue.value);
        const text = document.getElementById('reviewText').value.trim();

        if (rating === 0) {
            ratingText.innerText = "Please select a star rating first!";
            ratingText.style.color = "var(--accent-color)";
            return;
        }

        const userStr = localStorage.getItem('divineTrailsUser');
        let authorName = "Anonymous Pilgrim";
        if (userStr) {
            authorName = JSON.parse(userStr).name;
        }

        const newReview = {
            rating: rating,
            text: text,
            author: authorName,
            location: "Recent Pilgrim"
        };

        // Save review to localStorage
        const savedReviewsStr = localStorage.getItem('divineTrailsReviews');
        const reviewsList = savedReviewsStr ? JSON.parse(savedReviewsStr) : [];
        reviewsList.unshift(newReview);
        localStorage.setItem('divineTrailsReviews', JSON.stringify(reviewsList));

        // Render card
        addReviewCardToSlider(newReview);

        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
    });
}

function loadSavedReviews() {
    const savedReviewsStr = localStorage.getItem('divineTrailsReviews');
    if (!savedReviewsStr) return;

    const reviews = JSON.parse(savedReviewsStr);
    reviews.forEach(review => addReviewCardToSlider(review));
}

function addReviewCardToSlider(review) {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < review.rating) starsHtml += '<i class="fa-solid fa-star"></i>';
        else starsHtml += '<i class="fa-regular fa-star"></i>';
    }

    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <div class="stars">${starsHtml}</div>
        <p class="test-text">"${review.text}"</p>
        <div class="test-author">
            <h4>${review.author}</h4>
            <span>${review.location}</span>
        </div>
    `;

    slider.insertBefore(card, slider.firstChild);
}

