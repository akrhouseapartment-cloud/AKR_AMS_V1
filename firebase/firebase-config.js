/* ==========================================
   AKR House Apartments
   Firebase Configuration
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

/* ==========================================
   Firebase Configuration
========================================== */

const firebaseConfig = {
  apiKey: "AIzaSyCpnDAAgivJNSHauGftN0xd9oed2vqXNFA",
  authDomain: "akr-house-apartments.firebaseapp.com",
  projectId: "akr-house-apartments",
  storageBucket: "akr-house-apartments.firebasestorage.app",
  messagingSenderId: "49078938153",
  appId: "1:49078938153:web:54144db767a86ba9db8a38",
  measurementId: "G-693DBNK9Z8"
};

/* ==========================================
   Initialize Firebase
========================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

/* ==========================================
   Export
========================================== */

export {
  app,
  auth,
  db,
  storage
};

console.log("Firebase Connected Successfully");
