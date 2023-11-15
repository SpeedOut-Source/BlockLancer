// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA51llFTagii-ZYMyLciudRp6kgz0P2zs4",
  authDomain: "blocklancer-auth.firebaseapp.com",
  projectId: "blocklancer-auth",
  storageBucket: "blocklancer-auth.appspot.com",
  messagingSenderId: "110202717338",
  appId: "1:110202717338:web:5add93cbc9050482844b23",
};

// Initialize Firebase
const authApp = initializeApp(firebaseConfig, "authApp");
export const auth = getAuth(authApp);

