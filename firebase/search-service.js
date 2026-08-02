/* ==========================================
   AKR House Apartments
   Search Service
   Version 3.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Generic Collection Search
========================================== */

async function searchCollection(

collectionName,

keyword

){

const results=[];

const snapshot=

await getDocs(

collection(db,collectionName)

);

const search=

keyword.toLowerCase();

snapshot.forEach(doc=>{

const data=doc.data();

const values=

Object.values(data)

.join(" ")

.toLowerCase();

if(values.includes(search)){

results.push({

id:doc.id,

...data

});

}

});

return results;

}

/* ==========================================
   Search Residents
========================================== */

export async function searchResidents(

keyword

){

return await searchCollection(

"residents",

keyword

);

}

/* ==========================================
   Search Flats
========================================== */

export async function searchFlats(

keyword

){

return await searchCollection(

"flats",

keyword

);

}

/* ==========================================
   Search Payments
========================================== */

export async function searchPayments(

keyword

){

return await searchCollection(

"payments",

keyword

);

}

/* ==========================================
   Search Complaints
========================================== */

export async function searchComplaints(

keyword

){

return await searchCollection(

"complaints",

keyword

);

}

/* ==========================================
   Search Visitors
========================================== */

export async function searchVisitors(

keyword

){

return await searchCollection(

"visitors",

keyword

);

}

/* ==========================================
   Universal Search
========================================== */

export async function universalSearch(

keyword

){

return{

residents:

await searchResidents(keyword),

flats:

await searchFlats(keyword),

payments:

await searchPayments(keyword),

complaints:

await searchComplaints(keyword),

visitors:

await searchVisitors(keyword)

};

}

/* ==========================================
   End
========================================== */
