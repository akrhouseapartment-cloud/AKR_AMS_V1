/* ==========================================
   AKR House Apartments
   Firebase Configuration
   Version 1.0.0
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

/* ==========================================
   Firebase Configuration
========================================== */

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

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

console.log("================================");

console.log("Firebase Initialized");

console.log("AKR House Apartments");

console.log("================================");
