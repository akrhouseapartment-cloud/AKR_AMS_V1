/* ==========================================
   AKR House Apartments
   Firebase Authentication
   Version 1.0.0
========================================== */

import { auth } from "./firebase-config.js";

import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

sendPasswordResetEmail,

signOut,

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ==========================================
   Resident Registration
========================================== */

export async function registerUser(email,password){

try{

const userCredential=

await createUserWithEmailAndPassword(

auth,

email,

password

);

alert("Registration Successful");

return userCredential.user;

}catch(error){

alert(error.message);

}

}

/* ==========================================
   Login
========================================== */

export async function loginUser(email,password){

try{

const userCredential=

await signInWithEmailAndPassword(

auth,

email,

password

);

alert("Login Successful");

return userCredential.user;

}catch(error){

alert(error.message);

}

}

/* ==========================================
   Forgot Password
========================================== */

export async function resetPassword(email){

try{

await sendPasswordResetEmail(

auth,

email

);

alert("Password Reset Email Sent");

}catch(error){

alert(error.message);

}

}

/* ==========================================
   Logout
========================================== */

export async function logoutUser(){

try{

await signOut(auth);

alert("Logged Out Successfully");

}catch(error){

alert(error.message);

}

}

/* ==========================================
   Authentication Status
========================================== */

export function checkUser(){

onAuthStateChanged(

auth,

(user)=>{

if(user){

console.log("Logged In :",user.email);

}else{

console.log("No Active User");

}

}

);

}

/* ==========================================
   End
========================================== */
