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
