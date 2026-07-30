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

// Default Packages List with exact App UI/UX Images
export const DEFAULT_PACKAGES = [
  {
    id: "pkg-1",
    title: "Char Dham Yatra (Kedarnath & Badrinath)",
    location: "Uttarakhand",
    duration: "10 Days / 9 Nights",
    groupSize: "12-15 Pilgrims",
    price: "₹24,500",
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 156,
    image: "/assets/images/pkg_chardham_1782374096140.png",
    description: "Experience the ultimate spiritual journey to Yamunotri, Gangotri, Kedarnath, and Badrinath in the Himalayas.",
    itinerary: ["Day 1: Haridwar to Barkot", "Day 2: Yamunotri Darshan", "Day 3: Uttarkashi", "Day 4: Gangotri Darshan", "Day 5: Guptkashi", "Day 6: Kedarnath Trek", "Day 7: Kedarnath Darshan", "Day 8: Badrinath", "Day 9: Rudraprayag", "Day 10: Haridwar Drop"]
  },
  {
    id: "pkg-2",
    title: "Varanasi Ganga Aarti & Kashi Vishwanath",
    location: "Uttar Pradesh",
    duration: "4 Days / 3 Nights",
    groupSize: "10-20 Pilgrims",
    price: "₹12,999",
    badge: "Sacred",
    rating: 4.8,
    reviewsCount: 112,
    image: "/assets/images/pkg_varanasi_1782374079347.png",
    description: "Immerse yourself in the eternal city of Light, Kashi Vishwanath VIP Darshan, Ganga Aarti, and Sarnath excursion.",
    itinerary: ["Day 1: Arrival Varanasi & Evening Aarti", "Day 2: Morning Sunrise Boat Ride & Temple Tour", "Day 3: Sarnath Heritage Excursion", "Day 4: Shopping & Departure"]
  },
  {
    id: "pkg-3",
    title: "Tirupati Balaji VIP Darshan Yatra",
    location: "Andhra Pradesh",
    duration: "3 Days / 2 Nights",
    groupSize: "Small Group",
    price: "₹9,500",
    badge: "VIP Darshan",
    rating: 4.9,
    reviewsCount: 230,
    image: "/assets/images/pkg_tirupati_1782374069785.png",
    description: "Hassle-free special entry darshan at Tirumala Venkateswara Temple with premium accommodation and transportation.",
    itinerary: ["Day 1: Arrival Tirupati", "Day 2: Tirumala Temple VIP Darshan", "Day 3: Padmavathi Temple & Departure"]
  },
  {
    id: "pkg-4",
    title: "Ashtavinayak Ganesha Circuit",
    location: "Maharashtra",
    duration: "4 Days / 3 Nights",
    groupSize: "15-25 Pilgrims",
    price: "₹8,999",
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 88,
    image: "/assets/images/pkg_ashtavinayak_1782374042038.png",
    description: "Complete pilgrimage tour of the eight sacred Ganesha temples across Maharashtra with AC coach and sattvic meals.",
    itinerary: ["Day 1: Mayureshwar, Siddhivinayak & Ballaleshwar", "Day 2: Varadavinayak, Chintamani & Girijatmaj", "Day 3: Vighnahar & Mahaganapati", "Day 4: Return Pune/Mumbai"]
  },
  {
    id: "pkg-5",
    title: "South India Grand Temple Circuit",
    location: "Tamil Nadu & Kerala",
    duration: "7 Days / 6 Nights",
    groupSize: "10-15 Pilgrims",
    price: "₹19,800",
    badge: "Sacred",
    rating: 4.9,
    reviewsCount: 142,
    image: "/assets/images/pkg_southindia_1782374059257.png",
    description: "Explore the architectural marvels of Madurai Meenakshi, Rameshwaram Jyotirlinga, Tanjore, and Kanchipuram.",
    itinerary: ["Day 1: Chennai to Kanchipuram", "Day 2: Tanjore Brihadisvara Temple", "Day 3: Madurai Meenakshi Temple", "Day 4: Rameshwaram Darshan", "Day 5: Kanyakumari", "Day 6: Trivandrum Padmanabhaswamy", "Day 7: Departure"]
  }
];

// --- PACKAGES ---
export const getPackages = () => {
  const local = localStorage.getItem('divineTrailsPackages');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      // Ensure we use new image paths if cached version had old unsplash URLs
      if (parsed && parsed.length > 0 && parsed[0].image && parsed[0].image.includes('unsplash')) {
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
