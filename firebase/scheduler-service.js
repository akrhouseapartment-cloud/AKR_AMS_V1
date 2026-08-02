/* ==========================================
   AKR House Apartments
   Scheduler Service
   Version 3.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
addDoc,
getDocs,
query,
where,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Schedule Maintenance
========================================== */

export async function scheduleMaintenance(

task

){

try{

await addDoc(

collection(db,"maintenance_schedule"),

{

...task,

status:"Scheduled",

createdAt:serverTimestamp()

}

);

alert("Maintenance Scheduled");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Schedule Notice
========================================== */

export async function scheduleNotice(

notice

){

try{

await addDoc(

collection(db,"scheduled_notices"),

{

...notice,

status:"Pending",

createdAt:serverTimestamp()

}

);

alert("Notice Scheduled");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Monthly Bill Generator
========================================== */

export async function generateMonthlyBills(

month,

amount

){

try{

await addDoc(

collection(db,"billing_jobs"),

{

month,

amount,

status:"Generated",

generatedAt:serverTimestamp()

}

);

alert("Monthly Maintenance Bills Generated");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Reminder Scheduler
========================================== */

export async function scheduleReminder(

reminder

){

try{

await addDoc(

collection(db,"reminders"),

{

...reminder,

status:"Pending",

createdAt:serverTimestamp()

}

);

alert("Reminder Scheduled");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Get Pending Tasks
========================================== */

export async function getPendingTasks(){

const tasks=[];

const q=query(

collection(db,"maintenance_schedule"),

where("status","==","Scheduled")

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

tasks.push({

id:doc.id,

...doc.data()

});

});

return tasks;

}

/* ==========================================
   Due Date Monitor
========================================== */

export async function checkDueDates(){

console.log(

"Checking Upcoming Due Dates..."

);

}

/* ==========================================
   Recurring Tasks
========================================== */

export async function runRecurringTasks(){

console.log(

"Running Scheduled Maintenance Tasks..."

);

}

/* ==========================================
   End
========================================== */
