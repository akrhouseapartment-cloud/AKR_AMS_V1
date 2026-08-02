/* ==========================================
   AKR House Apartments
   Resident Login Service
   Version 2.0
========================================== */

import {

auth,
db

} from "./firebase-config.js";

import {

signInWithEmailAndPassword,
signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

doc,
getDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Resident Login
========================================== */

export async function loginResident(

email,
password

){

try{

const credential=

await signInWithEmailAndPassword(

auth,

email,

password

);

const uid=

credential.user.uid;

const residentRef=

doc(

db,

"residents",

uid

);

const residentSnap=

await getDoc(

residentRef

);

if(!residentSnap.exists()){

alert(

"Resident record not found."

);

await signOut(auth);

return;

}

const resident=

residentSnap.data();

if(resident.status!=="Approved"){

alert(

"Your account is awaiting admin approval."

);

await signOut(auth);

return;

}

alert(

"Welcome "+resident.name

);

window.location.href=

"../dashboard.html";

}catch(error){

alert(error.message);

console.error(error);

}

}

/* ==========================================
   Resident Logout
========================================== */

export async function logoutResident(){

try{

await signOut(auth);

window.location.href="../login.html";

}catch(error){

console.error(error);

}

}

/* ==========================================
   End
========================================== */
