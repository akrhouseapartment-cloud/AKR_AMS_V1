/* ==========================================
   AKR House Apartments
   Dashboard Service
   Version 2.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Collection Count
========================================== */

async function getCollectionCount(

collectionName

){

const snapshot=

await getDocs(

collection(db,collectionName)

);

return snapshot.size;

}

/* ==========================================
   Dashboard Statistics
========================================== */

export async function getDashboardStatistics(){

try{

const residents=

await getCollectionCount("residents");

const flats=

await getCollectionCount("flats");

const complaints=

await getCollectionCount("complaints");

const visitors=

await getCollectionCount("visitors");

const notices=

await getCollectionCount("notices");

const payments=

await getCollectionCount("payments");

const inventory=

await getCollectionCount("inventory");

const assets=

await getCollectionCount("assets");

return{

residents,

flats,

complaints,

visitors,

notices,

payments,

inventory,

assets

};

}catch(error){

console.error(error);

}

}

/* ==========================================
   Maintenance Summary
========================================== */

export async function getMaintenanceSummary(){

const total=

await getCollectionCount(

"maintenance"

);

return{

total

};

}

/* ==========================================
   Complaint Summary
========================================== */

export async function getComplaintSummary(){

const total=

await getCollectionCount(

"complaints"

);

return{

total

};

}

/* ==========================================
   Visitor Summary
========================================== */

export async function getVisitorSummary(){

const total=

await getCollectionCount(

"visitors"

);

return{

total

};

}

/* ==========================================
   Asset Summary
========================================== */

export async function getAssetSummary(){

const total=

await getCollectionCount(

"assets"

);

return{

total

};

}

/* ==========================================
   Inventory Summary
========================================== */

export async function getInventorySummary(){

const total=

await getCollectionCount(

"inventory"

);

return{

total

};

}

/* ==========================================
   Dashboard Loader
========================================== */

export async function loadDashboard(){

const dashboard=

await getDashboardStatistics();

console.log(

"Dashboard Loaded",

dashboard

);

return dashboard;

}

/* ==========================================
   End
========================================== */
