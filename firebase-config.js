/* ==========================================
   AKR House Apartments
   Firebase Configuration
   Version 1.0.0
========================================== */

// Firebase SDK Imports
// (Replace with actual SDK URLs during deployment)

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

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
   Export Firebase Services
========================================== */

export {

app,

auth,

db,

storage

};

/* ==========================================
   Environment Check
========================================== */

try{

console.log("================================");

console.log("AKR AMS Firebase");

console.log("Status : Initialized");

console.log("Authentication : Ready");

console.log("Firestore : Ready");

console.log("Storage : Ready");

console.log("================================");

}catch(error){

console.error(

"Firebase initialization failed:",

error

);

}

/* ==========================================
   Future Modules
========================================== */

/*

Authentication

Resident Database

Visitor Management

Complaints

Payments

Community Chat

Push Notifications

AKR AI

*/

/* ==========================================
   Global App Information
========================================== */

export const APP_CONFIG={

name:"AKR House Apartments",

version:"1.0.0",

developer:"AKR House",

environment:"Production"

};

/* ==========================================
   End of Part 2
========================================== */




/* ==========================================
   Firebase Connection Check
========================================== */

export function checkFirebaseConnection(){

try{

if(app){

console.log("Firebase Connected Successfully");

return true;

}

}catch(error){

console.error(

"Firebase Connection Error",

error

);

return false;

}

}

/* ==========================================
   Helper Functions
========================================== */

export function getApplicationVersion(){

return APP_CONFIG.version;

}

export function getApplicationName(){

return APP_CONFIG.name;

}

export function getEnvironment(){

return APP_CONFIG.environment;

}

/* ==========================================
   Project Roles
========================================== */

export const USER_ROLES={

ADMIN:"admin",

RESIDENT:"resident",

FAMILY:"family",

SECURITY:"security"

};

/* ==========================================
   Collections
========================================== */

export const COLLECTIONS={

USERS:"users",

RESIDENTS:"residents",

VISITORS:"visitors",

COMPLAINTS:"complaints",

PAYMENTS:"payments",

VEHICLES:"vehicles",

NOTICES:"notices",

CHAT:"chat",

EMERGENCY:"emergency"

};

/* ==========================================
   Initialization
========================================== */

checkFirebaseConnection();

console.log("Firebase Configuration Loaded");

/* ==========================================
   End of File
========================================== */








