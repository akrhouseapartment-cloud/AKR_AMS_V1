/* ==========================================
   AKR House Apartments
   Session Service
   Version 3.0
========================================== */

import {

auth

} from "./firebase-config.js";

import {

onAuthStateChanged,
signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ==========================================
   Get Current User
========================================== */

export function getCurrentUser(){

return auth.currentUser;

}

/* ==========================================
   Auto Login Check
========================================== */

export function checkSession(callback){

onAuthStateChanged(

auth,

(user)=>{

callback(user);

}

);

}

/* ==========================================
   Session Timeout
========================================== */

let sessionTimer=null;

export function startSessionTimeout(

minutes=30

){

clearTimeout(sessionTimer);

sessionTimer=setTimeout(

async()=>{

alert(

"Session expired. Please login again."

);

await signOut(auth);

window.location.href="../login.html";

},

minutes*60*1000

);

}

/* ==========================================
   Refresh Session
========================================== */

export function refreshSession(

minutes=30

){

startSessionTimeout(minutes);

}

/* ==========================================
   Auto Logout
========================================== */

export async function logoutSession(){

try{

await signOut(auth);

window.location.href="../login.html";

}catch(error){

console.error(error);

}

}

/* ==========================================
   User Activity Listener
========================================== */

export function monitorActivity(

minutes=30

){

const reset=()=>{

refreshSession(minutes);

};

document.addEventListener(

"click",

reset

);

document.addEventListener(

"keydown",

reset

);

document.addEventListener(

"mousemove",

reset

);

document.addEventListener(

"touchstart",

reset

);

startSessionTimeout(minutes);

}

/* ==========================================
   End
========================================== */
