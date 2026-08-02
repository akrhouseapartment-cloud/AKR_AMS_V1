/* ==========================================
   AKR House Apartments
   Visitor Service
   Version 2.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
addDoc,
updateDoc,
doc,
getDocs,
query,
where,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Visitor Check-In
========================================== */

export async function checkInVisitor(

visitor

){

try{

await addDoc(

collection(db,"visitors"),

{

...visitor,

status:"Checked In",

checkInTime:serverTimestamp(),

checkOutTime:null

}

);

alert("Visitor Checked In");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Visitor Check-Out
========================================== */

export async function checkOutVisitor(

visitorId

){

try{

await updateDoc(

doc(db,"visitors",visitorId),

{

status:"Checked Out",

checkOutTime:serverTimestamp()

}

);

alert("Visitor Checked Out");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Visitor History
========================================== */

export async function getVisitorHistory(

flatNumber

){

const visitors=[];

const q=query(

collection(db,"visitors"),

where("flat","==",flatNumber)

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

visitors.push({

id:doc.id,

...doc.data()

});

});

return visitors;

}

/* ==========================================
   Vehicle Entry
========================================== */

export async function registerVehicle(

vehicle

){

try{

await addDoc(

collection(db,"vehicles"),

{

...vehicle,

entryTime:serverTimestamp(),

status:"Inside"

}

);

alert("Vehicle Entry Recorded");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Visitor Statistics
========================================== */

export async function getVisitorStatistics(){

const snapshot=

await getDocs(

collection(db,"visitors")

);

let total=0;

let inside=0;

let checkedOut=0;

snapshot.forEach(doc=>{

total++;

const status=doc.data().status;

if(status==="Checked In") inside++;

if(status==="Checked Out") checkedOut++;

});

return{

total,

inside,

checkedOut

};

}

/* ==========================================
   Visitor Photo
========================================== */

export function uploadVisitorPhoto(

file

){

console.log(

"Upload using uploadDocument() or create a visitor image upload method.",

file

);

}

/* ==========================================
   End
========================================== */
