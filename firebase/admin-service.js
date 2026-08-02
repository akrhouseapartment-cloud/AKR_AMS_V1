/* ==========================================
   AKR House Apartments
   Admin Service
   Version 2.0
========================================== */

import {

auth,
db

} from "./firebase-config.js";

import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

doc,
getDoc,
getDocs,
collection,
updateDoc,
deleteDoc,
query,
where

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Admin Login
========================================== */

export async function loginAdmin(

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

const adminRef=

doc(

db,

"admins",

uid

);

const adminSnap=

await getDoc(

adminRef

);

if(!adminSnap.exists()){

alert("Admin account not found.");

return;

}

alert("Welcome Administrator");

window.location.href="../admin/admin.html";

}catch(error){

alert(error.message);

console.error(error);

}

}

/* ==========================================
   Pending Residents
========================================== */

export async function getPendingResidents(){

const residents=[];

const q=query(

collection(db,"residents"),

where("status","==","Pending")

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

residents.push({

id:doc.id,

...doc.data()

});

});

return residents;

}

/* ==========================================
   Approve Resident
========================================== */

export async function approveResident(id){

await updateDoc(

doc(db,"residents",id),

{

status:"Approved"

}

);

alert("Resident Approved");

}

/* ==========================================
   Reject Resident
========================================== */

export async function rejectResident(id){

await updateDoc(

doc(db,"residents",id),

{

status:"Rejected"

}

);

alert("Resident Rejected");

}

/* ==========================================
   Suspend Resident
========================================== */

export async function suspendResident(id){

await updateDoc(

doc(db,"residents",id),

{

status:"Suspended"

}

);

alert("Resident Suspended");

}

/* ==========================================
   Delete Resident
========================================== */

export async function deleteResident(id){

await deleteDoc(

doc(db,"residents",id)

);

alert("Resident Deleted");

}

/* ==========================================
   End
========================================== */
