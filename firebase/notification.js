/* ==========================================
   AKR House Apartments
   Notification Module
   Version 1.0.0
========================================== */

/* ==========================================
   Browser Notification Permission
========================================== */

export async function requestPermission(){

if(!("Notification" in window)){

alert("Notifications are not supported.");

return;

}

if(Notification.permission==="default"){

await Notification.requestPermission();

}

}

/* ==========================================
   Show Notification
========================================== */

export function showNotification(

title,

message

){

if(Notification.permission==="granted"){

new Notification(

title,

{

body:message,

icon:"../assets/logo.png"

}

);

}

}

/* ==========================================
   Payment Reminder
========================================== */

export function paymentReminder(

resident,

amount

){

showNotification(

"Maintenance Reminder",

resident+

" - Pending Amount ₹"+

amount

);

}

/* ==========================================
   Complaint Notification
========================================== */

export function complaintNotification(

complaint

){

showNotification(

"Complaint Update",

complaint

);

}

/* ==========================================
   Notice Notification
========================================== */

export function noticeNotification(

title

){

showNotification(

"New Notice",

title

);

}

/* ==========================================
   Visitor Notification
========================================== */

export function visitorNotification(

visitor

){

showNotification(

"Visitor Arrived",

visitor

);

}

/* ==========================================
   Document Notification
========================================== */

export function documentNotification(

documentName

){

showNotification(

"New Document",

documentName

);

}

/* ==========================================
   Emergency Notification
========================================== */

export function emergencyNotification(

message

){

showNotification(

"🚨 Emergency Alert",

message

);

}

/* ==========================================
   End
========================================== */
