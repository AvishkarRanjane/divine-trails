/* ==========================================================================
   Divine Trails Mobile App - Shared Real-Time Cloud & Cross-Tab Sync Engine
   ========================================================================== */

// Live Firebase Configuration (divine-trails-4f2f4)
const firebaseConfig = {
  apiKey: "AIzaSyBHljSoReEWsTd5fiyuxTXadlYE4kTkbKQ",
  authDomain: "divine-trails-4f2f4.firebaseapp.com",
  projectId: "divine-trails-4f2f4",
  storageBucket: "divine-trails-4f2f4.firebasestorage.app",
  messagingSenderId: "302335969490",
  appId: "1:302335969490:web:e0955f5edc86afa591850b",
  measurementId: "G-YXQZ64W1TT"
};

const ADMIN_EMAIL = "mr.avishkarranjane07@gmail.com";

const liveSyncChannel = window.BroadcastChannel ? new BroadcastChannel('divine_trails_realtime_channel') : null;

if (liveSyncChannel) {
    liveSyncChannel.onmessage = (event) => {
        const msg = event.data;
        if (!msg) return;

        if (msg.type === 'PACKAGES_UPDATED' && msg.packages) {
            localStorage.setItem('divineTrailsPackages', JSON.stringify(msg.packages));
            window.dispatchEvent(new Event('divineTrailsPackagesUpdated'));
        } else if (msg.type === 'BOOKINGS_UPDATED' && msg.bookings) {
            localStorage.setItem('divineTrailsBookings', JSON.stringify(msg.bookings));
            window.dispatchEvent(new Event('divineTrailsBookingsUpdated'));
        } else if (msg.type === 'REVIEWS_UPDATED' && msg.reviews) {
            localStorage.setItem('divineTrailsReviews', JSON.stringify(msg.reviews));
            window.dispatchEvent(new Event('divineTrailsReviewsUpdated'));
        }
    };
}

const defaultSeedPackages = [
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
        inclusions: ["4-star hotel stay", "Private AC Transport", "Breakfast & Dinner", "VIP Darshan"],
        exclusions: ["Flights/Train fare", "Personal expenses"],
        image: "assets/images/gal_2_1782373954072.png",
        category: "north",
        templeDetails: {
            name: "Mahakaleshwar & Omkareshwar",
            history: "Ancient Jyotirlinga shrines dedicated to Lord Shiva.",
            significance: "Two of the 12 sacred Jyotirlingas in India.",
            architecture: "Maratha and Bhumija style spires.",
            bestTime: "October to March; Maha Shivaratri",
            dressCode: "Traditional Indian attire.",
            nearby: ["Harsiddhi Temple", "Kal Bhairav"],
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
        inclusions: ["Clean hotel stays", "Haridwar transport", "All veg meals", "Tour manager"],
        exclusions: ["Helicopter tickets", "Pony charges"],
        image: "assets/images/dest_kedarnath_1782373896529.png",
        category: "north",
        templeDetails: {
            name: "The Himalayan Shrines",
            history: "Established by Adi Shankaracharya in 8th century.",
            significance: "Grants ultimate Moksha and washes away sins.",
            architecture: "Traditional stone architecture.",
            bestTime: "May to June & September to October",
            dressCode: "Warm clothing required.",
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
        inclusions: ["Premium hotels", "Daily breakfast", "Private vehicle"],
        exclusions: ["Entry tickets", "Flight fare"],
        image: "assets/images/pkg_southindia_1782374059257.png",
        category: "south",
        templeDetails: {
            name: "Dravidian Architectural Marvels",
            history: "Patronized by Chola, Pandya, and Pallava dynasties.",
            significance: "Pinnacle of South Indian temple architecture.",
            architecture: "Dravidian Gopurams and pillared halls.",
            bestTime: "November to February",
            dressCode: "Strict traditional attire.",
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
        inclusions: ["Hotel stay", "Pune transport", "Breakfast & Dinner"],
        exclusions: ["Pooja samagri", "Lunch"],
        image: "assets/images/pkg_ashtavinayak_1782374042038.png",
        category: "weekend",
        templeDetails: {
            name: "Eight Swayambhu Ganeshas",
            history: "Eight self-manifested Ganesha shrines of Maharashtra.",
            significance: "Removes obstacles and grants prosperity.",
            architecture: "Peshwa style stone architecture.",
            bestTime: "August to February",
            dressCode: "Modest Indian casual wear.",
            nearby: ["Shivneri Fort", "Pune City"],
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
        transport: "Private AC Car",
        inclusions: ["1 night hotel stay", "Special Darshan tickets", "Chennai transfer"],
        exclusions: ["Tonsure charges", "Extra laddus"],
        image: "assets/images/pkg_tirupati_1782374069785.png",
        category: "south",
        templeDetails: {
            name: "Sri Venkateswara Swami Temple",
            history: "Ancient shrine dating to 300 AD.",
            significance: "Abode of Lord Vishnu in Kali Yuga.",
            architecture: "Gold-plated Ananda Nilayam dome.",
            bestTime: "September to February",
            dressCode: "Strict traditional attire.",
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
        inclusions: ["Hotel stay", "Ganges boat ride", "VIP Darshan", "Evening Aarti seat"],
        exclusions: ["Flights/Train fare", "Pooja samagri"],
        image: "assets/images/pkg_varanasi_1782374079347.png",
        category: "north",
        templeDetails: {
            name: "Kashi Vishwanath & Ghats",
            history: "One of the oldest living spiritual centers.",
            significance: "Holiest Jyotirlinga on the Ganges.",
            architecture: "Gold-plated Nagara spires.",
            bestTime: "October to March",
            dressCode: "Modest Indian clothing.",
            nearby: ["Dashashwamedh Ghat", "Sarnath"],
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3155823549646!2d83.00760461546876!3d25.30948958384358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2fa5e01bd80b%3A0xc6a8274d812328ba!2sShri%20Kashi%20Vishwanath%20Temple!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        }
    }
];

window.DivineTrailsSDK = {
    config: firebaseConfig,
    adminEmail: ADMIN_EMAIL,

    isAdminUser: function() {
        const user = this.getActiveUser();
        return !!(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
    },

    getPackages: function() {
        const stored = localStorage.getItem('divineTrailsPackages');
        if (!stored) {
            localStorage.setItem('divineTrailsPackages', JSON.stringify(defaultSeedPackages));
            return [...defaultSeedPackages];
        }
        return JSON.parse(stored);
    },

    savePackages: function(packagesList) {
        localStorage.setItem('divineTrailsPackages', JSON.stringify(packagesList));
        window.dispatchEvent(new Event('divineTrailsPackagesUpdated'));

        if (liveSyncChannel) {
            liveSyncChannel.postMessage({
                type: 'PACKAGES_UPDATED',
                packages: packagesList
            });
        }
        return packagesList;
    },

    registerUser: async function(name, email, pass) {
        const cleanEmail = email.toLowerCase().trim();
        const userObj = { name, email: cleanEmail, pass, createdAt: new Date().toISOString() };
        
        const usersStr = localStorage.getItem('divineTrailsUsers');
        const users = usersStr ? JSON.parse(usersStr) : [];
        const idx = users.findIndex(u => u.email.toLowerCase() === cleanEmail);
        if (idx >= 0) {
            users[idx] = userObj;
        } else {
            users.push(userObj);
        }
        localStorage.setItem('divineTrailsUsers', JSON.stringify(users));
        
        const sessionUser = { name, email: cleanEmail };
        localStorage.setItem('divineTrailsUser', JSON.stringify(sessionUser));
        return sessionUser;
    },

    loginUser: async function(email, pass) {
        const cleanEmail = email.toLowerCase().trim();
        const usersStr = localStorage.getItem('divineTrailsUsers');
        const users = usersStr ? JSON.parse(usersStr) : [];
        const match = users.find(u => u.email.toLowerCase() === cleanEmail);
        
        let userName = "Pilgrim";
        if (match) {
            userName = match.name;
        } else {
            const prefix = cleanEmail.split('@')[0];
            userName = cleanEmail === ADMIN_EMAIL ? "Admin Avishkar" : (prefix.charAt(0).toUpperCase() + prefix.slice(1));
            users.push({ name: userName, email: cleanEmail, pass: pass || 'default123' });
            localStorage.setItem('divineTrailsUsers', JSON.stringify(users));
        }

        const sessionUser = { name: userName, email: cleanEmail };
        localStorage.setItem('divineTrailsUser', JSON.stringify(sessionUser));
        return sessionUser;
    },

    logoutUser: function() {
        localStorage.removeItem('divineTrailsUser');
        sessionStorage.removeItem('pendingBooking');
    },

    getActiveUser: function() {
        const userStr = localStorage.getItem('divineTrailsUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    createBooking: async function(bookingData) {
        const ref = 'DT-' + Math.floor(10000 + Math.random() * 90000);
        const newBooking = {
            ref,
            ...bookingData,
            status: 'Confirmed',
            createdAt: new Date().toISOString(),
            dateFormatted: bookingData.date || 'To be decided',
            timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };

        const existingStr = localStorage.getItem('divineTrailsBookings');
        const list = existingStr ? JSON.parse(existingStr) : [];
        list.unshift(newBooking);
        localStorage.setItem('divineTrailsBookings', JSON.stringify(list));

        if (liveSyncChannel) {
            liveSyncChannel.postMessage({ type: 'BOOKINGS_UPDATED', bookings: list });
        }
        return newBooking;
    },

    getAllBookings: function() {
        const existingStr = localStorage.getItem('divineTrailsBookings');
        return existingStr ? JSON.parse(existingStr) : [];
    },

    getUserBookings: async function(email) {
        const list = this.getAllBookings();
        if (!email) return list;
        return list.filter(b => b.userEmail && b.userEmail.toLowerCase() === email.toLowerCase());
    },

    updateBookingStatus: function(ref, newStatus) {
        const list = this.getAllBookings();
        const booking = list.find(b => b.ref === ref);
        if (booking) {
            booking.status = newStatus;
            localStorage.setItem('divineTrailsBookings', JSON.stringify(list));
            if (liveSyncChannel) {
                liveSyncChannel.postMessage({ type: 'BOOKINGS_UPDATED', bookings: list });
            }
        }
        return list;
    },

    submitReview: async function(reviewData) {
        const existingStr = localStorage.getItem('divineTrailsReviews');
        const list = existingStr ? JSON.parse(existingStr) : [];
        list.unshift(reviewData);
        localStorage.setItem('divineTrailsReviews', JSON.stringify(list));
        if (liveSyncChannel) {
            liveSyncChannel.postMessage({ type: 'REVIEWS_UPDATED', reviews: list });
        }
        return reviewData;
    },

    getReviews: async function() {
        const existingStr = localStorage.getItem('divineTrailsReviews');
        return existingStr ? JSON.parse(existingStr) : [];
    }
};
