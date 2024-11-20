// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATDy3MARxXMeddxLTNSli2VGH-c9Hfnfo",
  authDomain: "api-test-6abb7.firebaseapp.com",
  projectId: "api-test-6abb7",
  storageBucket: "api-test-6abb7.firebasestorage.app",
  messagingSenderId: "681703775769",
  appId: "1:681703775769:web:832db83932f2e97ff6d488"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
