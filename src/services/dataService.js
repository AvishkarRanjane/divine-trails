import { db } from '../config/firebase.js';
import { 
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Default Packages List
export const DEFAULT_PACKAGES = [
  {
    id: "pkg-1",
    title: "Kedarnath Temple Yatra",
    location: "Uttarakhand",
    duration: "5 Days / 4 Nights",
    groupSize: "12-15 Pilgrims",
    price: "₹18,500",
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1626714494113-498506165824?auto=format&fit=crop&w=800&q=80",
    description: "Experience the ultimate spiritual journey to Kedarnath Temple located in the serene Himalayas.",
    itinerary: ["Day 1: Haridwar to Guptkashi", "Day 2: Trek to Kedarnath", "Day 3: Temple Darshan", "Day 4: Return Trek to Guptkashi", "Day 5: Haridwar Drop"]
  },
  {
    id: "pkg-2",
    title: "Varanasi & Sarnath Tour",
    location: "Uttar Pradesh",
    duration: "4 Days / 3 Nights",
    groupSize: "10-20 Pilgrims",
    price: "₹12,999",
    badge: "Sacred",
    rating: 4.8,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    description: "Immerse yourself in the eternal city of Light, Ganga Aarti, and ancient Buddhist heritage in Sarnath.",
    itinerary: ["Day 1: Arrival Varanasi & Evening Aarti", "Day 2: Morning Boat Ride & Temple Tour", "Day 3: Sarnath Excursion", "Day 4: Shopping & Departure"]
  },
  {
    id: "pkg-3",
    title: "Tirupati Balaji Darshan",
    location: "Andhra Pradesh",
    duration: "3 Days / 2 Nights",
    groupSize: "Small Group",
    price: "₹9,500",
    badge: "VIP Darshan",
    rating: 4.9,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
    description: "Hassle-free special entry darshan at Tirumala Venkateswara Temple with seamless travel arrangements.",
    itinerary: ["Day 1: Arrival Tirupati", "Day 2: Tirumala Temple VIP Darshan", "Day 3: Local Temples & Departure"]
  }
];

// --- PACKAGES ---
export const getPackages = () => {
  const local = localStorage.getItem('divineTrailsPackages');
  if (local) {
    try {
      return JSON.parse(local);
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
    await addDoc(collection(db, 'bookings'), {
      ...newBooking,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Cloud booking sync failed:', err);
  }

  return newBooking;
};

export const subscribeBookings = (callback) => {
  const bookingsCol = collection(db, 'bookings');
  return onSnapshot(bookingsCol, (snapshot) => {
    const cloudBookings = [];
    snapshot.forEach(doc => cloudBookings.push({ docId: doc.id, ...doc.data() }));
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
    await addDoc(collection(db, 'reviews'), newRev);
  } catch (err) {
    console.warn('Cloud review sync warning:', err);
  }

  return newRev;
};
