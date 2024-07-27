import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB6Q5YNBmAw6sfNhFfg4awc2L0jRcSp9ck",
  authDomain: "netfix-clone-38be2.firebaseapp.com",
  projectId: "netfix-clone-38be2",
  storageBucket: "netfix-clone-38be2.appspot.com",
  messagingSenderId: "141133172578",
  appId: "1:141133172578:web:28e381527a1f93b7d7a63b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };

// This file sets up Firebase configuration and authentication functions
//use: npm install firebase react-firebase-hooks

// Import necessary Firebase functions
// initializeApp: Initializes Firebase app
// createUserWithEmailAndPassword: Creates a new user account
// getAuth: Gets the Auth instance
// signInWithEmailAndPassword: Signs in an existing user
// signOut: Signs out the current user
// addDoc, collection, getFirestore: Firestore functions for database operations

// Firebase configuration object
// Contains API keys and identifiers for the project

// Initialize Firebase app with the configuration
// Get Auth and Firestore instances

// Signup function
// Creates a new user with email and password
// Adds user details to Firestore database
// Handles errors and displays alerts

// Login function
// Signs in a user with email and password
// Handles errors and displays alerts

// Logout function
// Signs out the current user

// Export auth instance, database instance, and authentication functions
// These can be imported and used in other parts of the application
