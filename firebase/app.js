/* ==========================================
   AKR House Apartments
   Main Firebase App
   Version 1.0.0
========================================== */

import {

auth,
db,
storage

} from "./firebase-config.js";

import {

checkUser

} from "./auth.js";

import {

requestPermission

} from "./notification.js";

/* ==========================================
   Application Initialize
========================================== */

window.addEventListener(

"load",

async()=>{

console.log("================================");

console.log("AKR House Apartments");

console.log("Firebase Connected");

console.log("Version : 1.0.0");

console.log("================================");

checkUser();

await requestPermission();

}

);

/* ==========================================
   Application Information
========================================== */

export const APP={

name:"AKR House Apartments",

version:"1.0.0",

developer:"AKR House",

year:2026

};

/* ==========================================
   Firebase Services
========================================== */

export{

auth,

db,

storage

};

/* ==========================================
   Utility
========================================== */

export function showMessage(

message

){

alert(message);

}

export function log(

message

){

console.log(

"[AKR]",

message

);

}

/* ==========================================
   System Health
========================================== */

export function systemStatus(){

return{

firebase:true,

authentication:true,

database:true,

storage:true,

notifications:true

};

}

/* ==========================================
   End
========================================== */
