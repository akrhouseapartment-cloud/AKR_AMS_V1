/* ==========================================
   AKR House Apartments
   Notification Service
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
orderBy,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Save Notification
========================================== */

export async function saveNotification(

type,

title,

message,

recipient="All"

){

try{

await addDoc(

collection(db,"notifications"),

{

type,

title,

message,

recipient,

status:"Sent",

createdAt:serverTimestamp()

}

);

}catch(error){

console.error(error);

}

}

/* ==========================================
   Push Notification
========================================== */

export async function sendPushNotification(

title,

message

){

await saveNotification(

"Push",

title,

message

);

alert("Push Notification Sent");

}

/* ==========================================
   Email Notification
========================================== */

export async function sendEmailNotification(

subject,

message,

recipient

){

await saveNotification(

"Email",

subject,

message,

recipient

);

alert("Email Queued");

}

/* ==========================================
   SMS Notification
========================================== */

export async function sendSMSNotification(

message,

recipient

){

await saveNotification(

"SMS",

"SMS Notification",

message,

recipient

);

alert("SMS Queued");

}

/* ==========================================
   WhatsApp Notification
========================================== */

export async function sendWhatsAppNotification(

message,

recipient

){

await saveNotification(

"WhatsApp",

"WhatsApp Notification",

message,

recipient

);

alert("WhatsApp Queued");

}

/* ==========================================
   Broadcast Notification
========================================== */

export async function broadcastNotification(

title,

message

){

await saveNotification(

"Broadcast",

title,

message,

"All Residents"

);

alert("Broadcast Notification Sent");

}

/* ==========================================
   Notification History
========================================== */

export async function getNotificationHistory(){

const history=[];

const q=query(

collection(db,"notifications"),

orderBy("createdAt","desc")

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

history.push({

id:doc.id,

...doc.data()

});

});

return history;

}

/* ==========================================
   End
========================================== */
