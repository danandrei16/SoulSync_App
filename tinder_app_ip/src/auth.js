import firebase from 'firebase/compat/app'; // Import firebase namespace
import { auth } from "./firebase";
import "firebase/compat/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user data to Firestore using add method
      const newUserRef = await firebase.firestore().collection('people').add({
        email: user.email,
        // Add other user data as needed
      });
  
      // Retrieve the user ID from the newly created document reference
      const userId = newUserRef.id;
  
      console.log('User successfully created with email/password:', user);
      console.log('User added to Firestore with ID:', userId);
  
      return { ...user, id: userId }; // Return the user object with the added ID
    } catch (error) {
      console.error('Error creating user with email/password:', error);
      throw error; // Rethrow the error to propagate it up to the caller
    }
  };
  

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Add user data to Firestore using add method
      const newUserRef = await firebase.firestore().collection('people').add({
        email: user.email,
        // Add other user data as needed
      });
  
      // Retrieve the user ID from the newly created document reference
      const userId = newUserRef.id;
  
      console.log('User successfully signed in with Google:', user);
      console.log('User added to Firestore with ID:', userId);
  
      return { ...user, id: userId }; // Return the user object with the added ID
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error; // Rethrow the error to propagate it up to the caller
    }
  };
  
  
  

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
