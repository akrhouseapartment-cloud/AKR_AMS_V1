/* ==========================================
   AKR House Apartments
   Visitor Service
   Version 2.0
========================================== */

import { db, auth } from "./firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export async function createVisitor(visitor){

const user=auth.currentUser;

if(!user){

throw new Error("User not logged in.");

}

await addDoc(collection(db,"visitors"),{

visitorName:visitor.visitorName,

visitorMobile:visitor.visitorMobile,

purpose:visitor.purpose,

arrivalTime:visitor.arrivalTime,

residentUid:user.uid,

residentName:visitor.residentName,

flat:visitor.flat,

status:"Pending",

requestTime:serverTimestamp(),

approvedBy:"",

checkInTime:"",

checkOutTime:"",

remarks:""

});

}
