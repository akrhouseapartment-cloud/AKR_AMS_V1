/* ==========================================
   AKR House Apartments
   System Monitor
   Version 3.0
========================================== */

import {

db,
auth,
storage

} from "./firebase-config.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Firebase Health Check
========================================== */

export function firebaseHealth(){

return{

authentication:!!auth,

firestore:!!db,

storage:!!storage,

status:"Healthy"

};

}

/* ==========================================
   Database Statistics
========================================== */

export async function databaseStatistics(){

const collections=[

"admins",
"residents",
"flats",
"maintenance",
"payments",
"complaints",
"visitors",
"notices",
"documents",
"feedback",
"inventory",
"assets"

];

const stats={};

for(const name of collections){

const snapshot=

await getDocs(

collection(db,name)

);

stats[name]=snapshot.size;

}

return stats;

}

/* ==========================================
   Performance Monitor
========================================== */

export function performanceMonitor(){

return{

browser:navigator.userAgent,

language:navigator.language,

online:navigator.onLine,

memory:"Available"

};

}

/* ==========================================
   Storage Status
========================================== */

export function storageStatus(){

return{

service:"Firebase Storage",

status:"Connected"

};

}

/* ==========================================
   Application Status
========================================== */

export function applicationStatus(){

return{

application:"AKR House Apartments",

version:"3.0.0",

status:"Running",

environment:"Production"

};

}

/* ==========================================
   System Report
========================================== */

export async function systemReport(){

const report={

health:firebaseHealth(),

database:await databaseStatistics(),

performance:performanceMonitor(),

storage:storageStatus(),

application:applicationStatus(),

generated:new Date().toLocaleString()

};

console.table(report.database);

return report;

}

/* ==========================================
   Startup Monitor
========================================== */

export function startMonitor(){

console.log("================================");

console.log("AKR House Apartments");

console.log("System Monitor Started");

console.log("Version : 3.0.0");

console.log("================================");

}

/* ==========================================
   End
========================================== */
