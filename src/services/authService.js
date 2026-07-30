import { auth, ADMIN_EMAIL } from '../config/firebase.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

export const getCurrentUser = () => {
  const localUser = localStorage.getItem('divineTrailsUser');
  if (localUser) {
    try {
      return JSON.parse(localUser);
    } catch {
      return null;
    }
  }
  return auth.currentUser;
};

export const isAdminUser = (user = getCurrentUser()) => {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userObj = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || email.split('@')[0],
    };
    localStorage.setItem('divineTrailsUser', JSON.stringify(userObj));
    return userObj;
  } catch (err) {
    // Local fallback support for legacy users registered locally
    const registered = JSON.parse(localStorage.getItem('divineTrailsUsers') || '[]');
    const matched = registered.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched && (matched.pass === password || !matched.pass)) {
      const userObj = { name: matched.name || email.split('@')[0], email: email };
      localStorage.setItem('divineTrailsUser', JSON.stringify(userObj));
      return userObj;
    }
    throw err;
  }
};

export const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    const userObj = {
      uid: userCredential.user.uid,
      email: email,
      name: name,
    };
    localStorage.setItem('divineTrailsUser', JSON.stringify(userObj));
    return userObj;
  } catch (err) {
    // Save locally as fallback if offline or config issue
    const registered = JSON.parse(localStorage.getItem('divineTrailsUsers') || '[]');
    const existingIndex = registered.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    const newUser = { name, email, pass: password };
    if (existingIndex >= 0) {
      registered[existingIndex] = newUser;
    } else {
      registered.push(newUser);
    }
    localStorage.setItem('divineTrailsUsers', JSON.stringify(registered));
    localStorage.setItem('divineTrailsUser', JSON.stringify({ name, email }));
    return { name, email };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch {
    // ignore
  }
  localStorage.removeItem('divineTrailsUser');
};

export const subscribeAuth = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userObj = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
      };
      localStorage.setItem('divineTrailsUser', JSON.stringify(userObj));
      callback(userObj);
    } else {
      callback(getCurrentUser());
    }
  });
};

/**
 * Map Firebase auth error codes to user-friendly messages
 */
export const getFirebaseErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred.';

  const code = error.code || '';
  const map = {
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid email or password. Please check and try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/email-already-in-use': 'An account with this email already exists. Try logging in.',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Contact support.',
    'auth/user-disabled': 'This account has been disabled. Contact support.',
    'auth/requires-recent-login': 'Please log in again to complete this action.',
  };

  return map[code] || error.message || 'Authentication failed. Please try again.';
};
