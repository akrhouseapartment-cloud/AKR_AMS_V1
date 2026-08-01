import { db } from "./firebase.js";

import {

collection,

onSnapshot

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Dashboard Collections

const collections=[

"residents",

"flats",

"vehicles",

"parcels",

"complaints",

"service_requests",

"payments"

];

// Count Documents

function watchCount(

collectionName,

elementId

){

onSnapshot(

collection(db,collectionName),

(snapshot)=>{

const element=

document.getElementById(elementId);

if(element){

element.textContent=snapshot.size;

}

}

);

}

// Residents

watchCount(

"residents",

"residentCount"

);

// Flats

watchCount(

"flats",

"flatCount"

);

// Vehicles

watchCount(

"vehicles",

"vehicleCount"

);

// Parcels

watchCount(

"parcels",

"parcelCount"

);

// Complaints

watchCount(

"complaints",

"complaintCount"

);

// Service Requests

watchCount(

"service_requests",

"serviceCount"

);

// Maintenance Payments

onSnapshot(

collection(db,"payments"),

(snapshot)=>{

let total=0;

snapshot.forEach(doc=>{

const data=doc.data();

total+=Number(

data.amount||0

);

});

const element=

document.getElementById(

"maintenanceCollection"

);

if(element){

element.textContent=

"₹"+total.toLocaleString("en-IN");

}

}

// Dashboard Ready

);

console.log(

"AKR AMS Dashboard Loaded"

);
