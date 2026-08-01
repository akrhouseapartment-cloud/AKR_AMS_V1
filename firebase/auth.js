/* ==========================================
   AKR House Apartments
   Authentication Module
   Version 1.0.0
========================================== */

import {

auth,

db,

USER_ROLES,

COLLECTIONS

} from "./firebase-config.js";

import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

sendPasswordResetEmail,

signOut,

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {

doc,

setDoc,

getDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ==========================================
   Register User
========================================== */

export async function registerUser(userData){

try{

const credential=

await createUserWithEmailAndPassword(

auth,

userData.email,

userData.password

);

const user=credential.user;

await setDoc(

doc(db,COLLECTIONS.USERS,user.uid),

{

uid:user.uid,

name:userData.name,

email:userData.email,

mobile:userData.mobile,

role:userData.role,

floor:userData.floor,

flat:userData.flat,

status:"Pending",

approved:false,

createdAt:serverTimestamp()

}

);

return{

success:true,

uid:user.uid

};

}catch(error){

return{

success:false,

message:error.message

};

}

}



/* ==========================================
   Login User
========================================== */

export async function loginUser(

email,

password,

selectedRole

){

try{

const credential=

await signInWithEmailAndPassword(

auth,

email,

password

);

const user=credential.user;

const userRef=doc(

db,

COLLECTIONS.USERS,

user.uid

);

const userSnap=await getDoc(userRef);

if(!userSnap.exists()){

return{

success:false,

message:"User profile not found."

};

}

const profile=userSnap.data();

if(profile.role!==selectedRole){

await signOut(auth);

return{

success:false,

message:"Incorrect login role selected."

};

}

if(profile.approved!==true){

await signOut(auth);

return{

success:false,

message:"Your account is awaiting approval."

};

}

return{

success:true,

user:profile

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Dashboard Redirect
========================================== */

export function getDashboard(role){

switch(role){

case USER_ROLES.ADMIN:

return "/admin/dashboard.html";

case USER_ROLES.RESIDENT:

return "/resident/dashboard.html";

case USER_ROLES.FAMILY:

return "/family/dashboard.html";

case USER_ROLES.SECURITY:

return "/security/dashboard.html";

default:

return "/login.html";

}

}


/* ==========================================
   Logout User
========================================== */

export async function logoutUser(){

try{

await signOut(auth);

return{

success:true,

message:"Logged out successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Password Reset
========================================== */

export async function resetPassword(email){

try{

await sendPasswordResetEmail(

auth,

email

);

return{

success:true,

message:"Password reset email sent."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Authentication State Listener
========================================== */

export function monitorAuthState(callback){

return onAuthStateChanged(

auth,

(user)=>{

callback(user);

}

);

}

/* ==========================================
   Current User
========================================== */

export function getCurrentUser(){

return auth.currentUser;

}




/* ==========================================
   Session Validation
========================================== */

export function isLoggedIn(){

return auth.currentUser!==null;

}

/* ==========================================
   Role Helpers
========================================== */

export function isAdmin(user){

return user?.role===USER_ROLES.ADMIN;

}

export function isResident(user){

return user?.role===USER_ROLES.RESIDENT;

}

export function isFamily(user){

return user?.role===USER_ROLES.FAMILY;

}

export function isSecurity(user){

return user?.role===USER_ROLES.SECURITY;

}

/* ==========================================
   Approval Status
========================================== */

export function isApproved(user){

return user?.approved===true;

}

/* ==========================================
   Authentication Initialization
========================================== */

export function initializeAuthentication(){

console.log("================================");

console.log("AKR AMS Authentication");

console.log("Status : Ready");

console.log("Login : Enabled");

console.log("Registration : Enabled");

console.log("Password Reset : Enabled");

console.log("================================");

}

initializeAuthentication();

/* ==========================================
   End of File
========================================== */



















