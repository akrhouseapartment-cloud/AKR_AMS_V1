/* ==========================================
   AKR House Apartments
   Resident Registration Service
   Version 2.0
========================================== */

import {

auth,
db

} from "./firebase-config.js";

import {

createUserWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

doc,
setDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Register Resident
========================================== */

export async function registerResident(data){

try{

const credential=

await createUserWithEmailAndPassword(

auth,

data.email,

data.password

);

const uid=credential.user.uid;

await setDoc(
doc(db,"residents",uid),
{
uid: uid,
name: data.name,
mobile: data.mobile,
email: data.email,
floor: data.floor,
flat: data.flat,
vehicle: data.vehicle,
emergencyContact: data.emergencyContact,
photo: data.photo || "",
role: data.role || "Primary Resident",
primaryResidentMobile: data.primaryResidentMobile || "",
relationship: data.relationship || "",
status: "Pending",
createdAt: serverTimestamp()
}
);

alert("Registration Successful. Waiting for Admin Approval.");

}catch(error){

alert(error.message);

console.error(error);

}

}

/* ==========================================
   End
========================================== */
