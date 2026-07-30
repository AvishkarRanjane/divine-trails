import { db } from '../config/firebase.js';
import { 
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

// Default Packages List with exact App UI/UX Images & Complete Details
export const DEFAULT_PACKAGES = [
  {
    id: "pkg-1",
    title: "Char Dham Yatra (Kedarnath & Badrinath)",
    location: "Uttarakhand, India",
    duration: "10 Days / 9 Nights",
    groupSize: "12-15 Pilgrims",
    price: "₹24,500",
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 156,
    totalSpots: "12 Sacred Places",
    transport: "AC Deluxe Coach / Private SUV",
    meals: "Pure Vegetarian Sattvic Meals",
    vipEntry: "Included (Kedarnath & Badrinath)",
    image: "/assets/images/pkg_chardham_1782374096140.png",
    description: "Experience the ultimate Himalayan pilgrimage across the revered shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath. Meticulously organized with helicopter pass assistance, deluxe hotels, and experienced yatra guides.",
    inclusions: [
      "Special VIP Darshan Assistance at Kedarnath & Badrinath",
      "Deluxe Hotel Accommodation (Double/Triple Sharing)",
      "Daily Sattvic Breakfast, Lunch & Dinner",
      "Transfers & Sightseeing in AC Coach",
      "Trek Support & Oxygen Cylinder Assistance",
      "Experienced Tour Manager & Spiritual Guide"
    ],
    itinerary: [
      { day: "Day 1", title: "Haridwar to Barkot", desc: "Drive via Mussoorie and Kempty Falls. Arrive Barkot for evening relaxation." },
      { day: "Day 2", title: "Barkot to Yamunotri & back", desc: "Early morning trek to Yamunotri Temple. Take holy dip in Surya Kund and offer prayers." },
      { day: "Day 3", title: "Barkot to Uttarkashi", desc: "Drive to Uttarkashi. Visit ancient Kashi Vishwanath Temple on the banks of Bhagirathi." },
      { day: "Day 4", title: "Uttarkashi to Gangotri & back", desc: "Excursion to Gangotri Temple. Holy dip in Bhagirathi River and Puja rituals." },
      { day: "Day 5", title: "Uttarkashi to Guptkashi", desc: "Drive along Mandakini river to Guptkashi. Pre-trek medical briefing." },
      { day: "Day 6", title: "Guptkashi to Kedarnath Trek", desc: "Scenic trek or helicopter ride to Kedarnath Dham. Evening Aarti at Kedarnath Temple." },
      { day: "Day 7", title: "Kedarnath Darshan to Guptkashi", desc: "Early morning Abhishekam Puja. Return trek to Gaurikund and night stay at Guptkashi." },
      { day: "Day 8", title: "Guptkashi to Badrinath Dham", desc: "Drive via Joshimath. Holy bath at Tapt Kund and evening Badrinath Maha Aarti." },
      { day: "Day 9", title: "Badrinath to Rudraprayag", desc: "Morning Mana Village excursion (Vyas Gufa, Saraswati River). Drive to Rudraprayag." },
      { day: "Day 10", title: "Rudraprayag to Haridwar Drop", desc: "Enroute visit Devprayag (Alaknanda & Bhagirathi Confluence) and Rishikesh Ram Jhula." }
    ]
  },
  {
    id: "pkg-2",
    title: "Varanasi Ganga Aarti & Kashi Vishwanath",
    location: "Uttar Pradesh, India",
    duration: "4 Days / 3 Nights",
    groupSize: "10-20 Pilgrims",
    price: "₹12,999",
    badge: "Sacred",
    rating: 4.8,
    reviewsCount: 112,
    totalSpots: "8 Sacred Spots",
    transport: "AC Traveller / Private Car",
    meals: "Breakfast & Traditional Banarasi Dinners",
    vipEntry: "Included (Kashi Vishwanath Sparsh Darshan)",
    image: "/assets/images/pkg_varanasi_1782374079347.png",
    description: "Immerse yourself in the eternal city of Light. Experience VIP Sparsh Darshan at Kashi Vishwanath Temple, private boat ride during sunrise, mesmerising Ganga Aarti at Dashashwamedh Ghat, and Sarnath Buddhist heritage.",
    inclusions: [
      "Kashi Vishwanath VIP Ticket & Sugam Darshan",
      "Private Sunrise & Evening Boat Ride on River Ganges",
      "3 Nights Heritage Hotel Stay near Ghats",
      "Excursion to Sarnath Stupa & Museum",
      "Dedicated Local Scholar & Guide"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival Varanasi & Evening Ganga Aarti", desc: "Airport/Station pickup. Check-in hotel. Grand evening Ganga Aarti on private boat." },
      { day: "Day 2", title: "Kashi Vishwanath & Ghats Tour", desc: "Morning holy dip at Dashashwamedh Ghat, VIP Kashi Vishwanath Darshan, Annapurna Temple & Manikarnika Ghat." },
      { day: "Day 3", title: "Sarnath Heritage Excursion", desc: "Visit Dhamek Stupa, Ashoka Pillar, Mulagandha Kuti Vihar & Sarnath Archaeological Museum." },
      { day: "Day 4", title: "Banaras Local Culture & Departure", desc: "Morning visit to Sankat Mochan & BHU Vishwanath Temple. Banarasi Silk shopping and departure." }
    ]
  },
  {
    id: "pkg-3",
    title: "Tirupati Balaji VIP Darshan Yatra",
    location: "Andhra Pradesh, India",
    duration: "3 Days / 2 Nights",
    groupSize: "Small Group",
    price: "₹9,500",
    badge: "VIP Darshan",
    rating: 4.9,
    reviewsCount: 230,
    totalSpots: "5 Sacred Temples",
    transport: "AC Private Vehicle",
    meals: "South Indian Sattvic Meals + Tirupati Laddu Prasadam",
    vipEntry: "Guaranteed TTD Special Entry Pass (₹300)",
    image: "/assets/images/pkg_tirupati_1782374069785.png",
    description: "Enjoy a smooth, hassle-free pilgrimage to Lord Venkateswara Temple in Tirumala with official TTD Special Entry passes, tonsure assistance, Tirupati Laddu prasadam, and surrounding sacred temples.",
    inclusions: [
      "Official TTD ₹300 Special Entry Darshan Pass",
      "Complimentary Tirupati Laddu Prasadam (2 per person)",
      "4-Star Rated AC Accommodation in Tirupati",
      "Private AC Car Transfers Tirupati Airport/Station to Hill",
      "Guide Assistance for Head Tonsure & Rituals"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival Tirupati & Hotel Check-in", desc: "Pickup from Tirupati Airport/Station. Check-in hotel. Evening visit to Kapila Theertham Temple." },
      { day: "Day 2", title: "Tirumala Venkateswara VIP Darshan", desc: "Drive up Tirumala Hills. Head tonsure rituals, VIP Darshan of Lord Balaji, and prasadam collection." },
      { day: "Day 3", title: "Padmavathi Temple & Departure", desc: "Morning Darshan of Goddess Padmavathi at Tiruchanur and Sri Kalahasti Temple visit before drop." }
    ]
  },
  {
    id: "pkg-4",
    title: "Ashtavinayak Ganesha Circuit",
    location: "Maharashtra, India",
    duration: "4 Days / 3 Nights",
    groupSize: "15-25 Pilgrims",
    price: "₹8,999",
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 88,
    totalSpots: "8 Ganesha Temples",
    transport: "AC Bus / Pushback Coach",
    meals: "Pure Veg Breakfast, Lunch & Dinner",
    vipEntry: "Direct Entry Assistance",
    image: "/assets/images/pkg_ashtavinayak_1782374042038.png",
    description: "Complete traditional circuit of the eight swayambhu (self-manifested) Ganesha temples in Maharashtra in sequence: Morgaon, Siddhatek, Pali, Mahad, Theur, Lenyadri, Ozar, and Ranjangaon.",
    inclusions: [
      "Complete 8 Temples Tour in Correct Traditional Sequence",
      "Comfortable Hotel Accommodation in Pune & Ozar",
      "Freshly Cooked Veg Meals (Breakfast, Lunch, Dinner)",
      "Pushback AC Bus Transportation",
      "Experienced Tour Coordinator"
    ],
    itinerary: [
      { day: "Day 1", title: "Morgaon, Siddhatek & Theur", desc: "Departure Pune/Mumbai. Visit Mayureshwar (Morgaon), Siddhivinayak (Siddhatek) and Chintamani (Theur)." },
      { day: "Day 2", title: "Mahad & Pali Temples", desc: "Visit Varadavinayak at Mahad and Ballaleshwar at Pali in the scenic Konkan foothills." },
      { day: "Day 3", title: "Lenyadri Caves & Ozar", desc: "Climb 283 steps to Girijatmaj at Lenyadri Cave Temple and visit Vighnahar at Ozar." },
      { day: "Day 4", title: "Ranjangaon & Return", desc: "Visit Mahaganapati at Ranjangaon. Final blessing rituals and return drop to Pune/Mumbai." }
    ]
  },
  {
    id: "pkg-5",
    title: "South India Grand Temple Circuit",
    location: "Tamil Nadu & Kerala, India",
    duration: "7 Days / 6 Nights",
    groupSize: "10-15 Pilgrims",
    price: "₹19,800",
    badge: "Sacred",
    rating: 4.9,
    reviewsCount: 142,
    totalSpots: "10 Heritage Shrines",
    transport: "AC Tempo Traveller / Bus",
    meals: "Traditional South Indian Thali Meals",
    vipEntry: "Special Entry Passes at Madurai & Rameshwaram",
    image: "/assets/images/pkg_southindia_1782374059257.png",
    description: "Journey through Dravidian architectural wonders: Madurai Meenakshi, Tanjore Brihadisvara, Rameshwaram Ramanathaswamy (22 Holy Wells), Kanyakumari temple, and Trivandrum Padmanabhaswamy.",
    inclusions: [
      "Special Entry Passes at Madurai Meenakshi & Rameshwaram",
      "22 Holy Well Teerth Snanam Assistance at Rameshwaram",
      "3-Star Deluxe Hotel Accommodations",
      "AC Vehicle Transfers & Monument Sightseeing",
      "Daily South Indian Breakfast & Dinners"
    ],
    itinerary: [
      { day: "Day 1", title: "Chennai to Kanchipuram & Tanjore", desc: "Visit Kamakshi Amman & Ekambareswarar Temples. Drive to Tanjore." },
      { day: "Day 2", title: "Tanjore Great Living Chola Temple", desc: "Darshan at UNESCO heritage Brihadisvara Temple. Proceed to Madurai." },
      { day: "Day 3", title: "Madurai Meenakshi Temple", desc: "Grand morning Darshan at Meenakshi Sundareswarar Temple and Tirumalai Nayak Palace." },
      { day: "Day 4", title: "Madurai to Rameshwaram Jyotirlinga", desc: "Drive across Pamban Bridge. 22 Holy Wells Bath and Ramanathaswamy Temple Darshan." },
      { day: "Day 5", title: "Rameshwaram to Kanyakumari", desc: "Visit Dhanushkodi. Drive to Kanyakumari. Sunset view at Triveni Sangam." },
      { day: "Day 6", title: "Kanyakumari to Trivandrum", desc: "Sunrise view. Visit Kumari Amman Temple & Vivekananda Rock. Drive to Trivandrum." },
      { day: "Day 7", title: "Padmanabhaswamy Temple & Departure", desc: "Morning Darshan at world-famous Sree Padmanabhaswamy Temple and airport/station drop." }
    ]
  }
];

// --- PACKAGES ---
export const getPackages = () => {
  const local = localStorage.getItem('divineTrailsPackages');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      // Refresh cache if totalSpots field is missing in cached version
      if (parsed && parsed.length > 0 && !parsed[0].totalSpots) {
        localStorage.setItem('divineTrailsPackages', JSON.stringify(DEFAULT_PACKAGES));
        return DEFAULT_PACKAGES;
      }
      return parsed;
    } catch {
      return DEFAULT_PACKAGES;
    }
  }
  return DEFAULT_PACKAGES;
};

export const subscribePackages = (callback) => {
  const pkgDocRef = doc(db, 'settings', 'packages');
  return onSnapshot(pkgDocRef, (docSnap) => {
    if (docSnap.exists() && docSnap.data().list) {
      const list = docSnap.data().list;
      localStorage.setItem('divineTrailsPackages', JSON.stringify(list));
      callback(list);
    } else {
      callback(getPackages());
    }
  }, (err) => {
    console.warn('Firestore packages sync warning:', err);
    callback(getPackages());
  });
};

export const savePackagesToCloud = async (packagesList) => {
  localStorage.setItem('divineTrailsPackages', JSON.stringify(packagesList));
  try {
    const pkgDocRef = doc(db, 'settings', 'packages');
    await setDoc(pkgDocRef, { list: packagesList, updatedAt: serverTimestamp() });
  } catch (err) {
    console.warn('Could not sync packages to cloud:', err);
  }
};

// --- BOOKINGS ---
export const getBookings = () => {
  const local = localStorage.getItem('divineTrailsBookings');
  return local ? JSON.parse(local) : [];
};

export const createBooking = async (bookingData) => {
  const current = getBookings();
  const newBooking = {
    id: 'BK-' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    ...bookingData,
  };
  current.unshift(newBooking);
  localStorage.setItem('divineTrailsBookings', JSON.stringify(current));

  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...newBooking,
      timestamp: serverTimestamp(),
    });
    newBooking.docId = docRef.id;
  } catch (err) {
    console.warn('Cloud booking sync failed:', err);
  }

  return newBooking;
};

export const updateBookingStatus = async (docIdOrId, newStatus) => {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.docId === docIdOrId || b.id === docIdOrId);
  if (idx >= 0) {
    bookings[idx].status = newStatus;
    localStorage.setItem('divineTrailsBookings', JSON.stringify(bookings));
  }

  try {
    if (docIdOrId) {
      const bDocRef = doc(db, 'bookings', docIdOrId);
      await updateDoc(bDocRef, { status: newStatus });
    }
  } catch (err) {
    console.warn('Cloud booking status update warning:', err);
  }
};

export const deleteBooking = async (docIdOrId) => {
  const bookings = getBookings().filter(b => b.docId !== docIdOrId && b.id !== docIdOrId);
  localStorage.setItem('divineTrailsBookings', JSON.stringify(bookings));

  try {
    if (docIdOrId) {
      const bDocRef = doc(db, 'bookings', docIdOrId);
      await deleteDoc(bDocRef);
    }
  } catch (err) {
    console.warn('Cloud booking deletion warning:', err);
  }
};

export const subscribeBookings = (callback) => {
  const bookingsCol = collection(db, 'bookings');
  return onSnapshot(bookingsCol, (snapshot) => {
    const cloudBookings = [];
    snapshot.forEach(docSnap => cloudBookings.push({ docId: docSnap.id, ...docSnap.data() }));
    if (cloudBookings.length > 0) {
      localStorage.setItem('divineTrailsBookings', JSON.stringify(cloudBookings));
      callback(cloudBookings);
    } else {
      callback(getBookings());
    }
  }, (err) => {
    console.warn('Bookings sync error:', err);
    callback(getBookings());
  });
};

// --- REVIEWS ---
export const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    name: "Ramesh Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "Kedarnath yatra was incredibly well organized. The guide was knowledgeable and helpful.",
    date: "2024-05-12",
    packageName: "Kedarnath Temple Yatra"
  },
  {
    id: "rev-2",
    name: "Priya Patel",
    location: "Ahmedabad",
    rating: 5,
    comment: "Seamless Tirupati VIP darshan! Saved us hours of waiting in line. Highly recommended!",
    date: "2024-06-01",
    packageName: "Tirupati Balaji Darshan"
  }
];

export const getReviews = () => {
  const local = localStorage.getItem('divineTrailsReviews');
  return local ? JSON.parse(local) : DEFAULT_REVIEWS;
};

export const addReview = async (reviewData) => {
  const reviews = getReviews();
  const newRev = {
    id: 'REV-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...reviewData,
  };
  reviews.unshift(newRev);
  localStorage.setItem('divineTrailsReviews', JSON.stringify(reviews));

  try {
    const docRef = await addDoc(collection(db, 'reviews'), newRev);
    newRev.docId = docRef.id;
  } catch (err) {
    console.warn('Cloud review sync warning:', err);
  }

  return newRev;
};

export const deleteReview = async (docIdOrId) => {
  const reviews = getReviews().filter(r => r.docId !== docIdOrId && r.id !== docIdOrId);
  localStorage.setItem('divineTrailsReviews', JSON.stringify(reviews));

  try {
    if (docIdOrId) {
      const rDocRef = doc(db, 'reviews', docIdOrId);
      await deleteDoc(rDocRef);
    }
  } catch (err) {
    console.warn('Cloud review deletion warning:', err);
  }
};

export const subscribeReviews = (callback) => {
  const reviewsCol = collection(db, 'reviews');
  return onSnapshot(reviewsCol, (snapshot) => {
    const cloudReviews = [];
    snapshot.forEach(docSnap => cloudReviews.push({ docId: docSnap.id, ...docSnap.data() }));
    if (cloudReviews.length > 0) {
      localStorage.setItem('divineTrailsReviews', JSON.stringify(cloudReviews));
      callback(cloudReviews);
    } else {
      callback(getReviews());
    }
  }, (err) => {
    console.warn('Reviews sync error:', err);
    callback(getReviews());
  });
};
