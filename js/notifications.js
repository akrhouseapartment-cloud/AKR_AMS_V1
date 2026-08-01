// ===============================
// AKR AMS Notification Manager
// ===============================

// In-App Notification

export function showNotification(

title,

message,

type="info"

){

const notification=document.createElement("div");

notification.className=`notification ${type}`;

notification.innerHTML=`

<h4>${title}</h4>

<p>${message}</p>

`;

notification.style.position="fixed";

notification.style.top="20px";

notification.style.right="20px";

notification.style.background="#ffffff";

notification.style.padding="15px";

notification.style.borderRadius="10px";

notification.style.boxShadow="0 2px 10px rgba(0,0,0,0.2)";

notification.style.zIndex="9999";

notification.style.minWidth="280px";

document.body.appendChild(notification);

setTimeout(()=>{

notification.remove();

},5000);

}

// Browser Push Notification

export async function sendPushNotification(

title,

message

){

if(!("Notification" in window)){

alert("Notifications are not supported.");

return;

}

let permission=Notification.permission;

if(permission!=="granted"){

permission=await Notification.requestPermission();

}

if(permission==="granted"){

new Notification(title,{

body:message,

icon:"../assets/logo.png"

});

}

}

// Maintenance Reminder

export function maintenanceReminder(

flat,

amount

){

showNotification(

"💰 Maintenance Due",

`Flat ${flat} has ₹${amount} pending.`,

"warning"

);

}

// Parcel Notification

export function parcelNotification(

flat,

courier

){

showNotification(

"📦 Parcel Arrived",

`${courier} parcel has arrived for Flat ${flat}.`,

"success"

);

}

// Complaint Update

export function complaintNotification(

complaintId,

status

){

showNotification(

"📝 Complaint Update",

`Complaint ${complaintId} is now ${status}.`,

"info"

);

}

// Visitor Arrival

export function visitorNotification(

visitor,

flat

){

showNotification(

"🚶 Visitor Arrived",

`${visitor} is waiting for Flat ${flat}.`,

"success"

);

}

// Emergency Alert

export function emergencyAlert(message){

showNotification(

"🚨 Emergency Alert",

message,

"error"

);

sendPushNotification(

"Emergency Alert",

message

);

}

// Welcome Message

export function welcomeUser(name){

showNotification(

"👋 Welcome",

`Welcome back, ${name}!`,

"success"

);
  }
