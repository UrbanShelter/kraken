import { auth, googleProvider } from "./firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignInWithGoogle = () => {
  auth.signInWithRedirect(googleProvider);
};

export const getRedirectResult = () => {
  return auth.getRedirectResult();
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);
