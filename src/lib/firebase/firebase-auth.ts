// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL_4Qgg2pqtLgYiHunyKze_BLMHNQV3u4",
  authDomain: "oauth.action-tokens.com",
  projectId: "auth-29d94",
  storageBucket: "auth-29d94.appspot.com",
  messagingSenderId: "443284916220",
  appId: "1:443284916220:web:3be7d960eab4c329969479",
};

// Initialize Firebase
const authApp = initializeApp(firebaseConfig, "authApp");
export const auth = getAuth(authApp);
