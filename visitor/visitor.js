/* ==========================================
   AKR House Apartments
   Visitor Management Module
   Version 1.0.0
========================================== */

import {

db,

COLLECTIONS

} from "../firebase/firebase-config.js";

import {

collection,

doc,

setDoc,

getDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ==========================================
   Register Visitor
========================================== */

export async function registerVisitor(visitor){

try{

const visitorRef=

doc(

collection(db,COLLECTIONS.VISITORS)

);

await setDoc(

visitorRef,

{

visitorId:visitorRef.id,

residentId:visitor.residentId,

visitorName:visitor.visitorName,

mobile:visitor.mobile,

purpose:visitor.purpose,

vehicleNumber:visitor.vehicleNumber,

photoUrl:visitor.photoUrl,

status:"Pending",

checkIn:null,

checkOut:null,

createdAt:serverTimestamp()

}

);

return{

success:true,

visitorId:visitorRef.id

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Get Visitor
========================================== */

export async function getVisitor(visitorId){

try{

const visitorRef=

doc(db,COLLECTIONS.VISITORS,visitorId);

const visitorSnap=

await getDoc(visitorRef);

if(!visitorSnap.exists()){

return null;

}

return visitorSnap.data();

}catch(error){

console.error(error);

return null;

}

}


/* ==========================================
   Approve Visitor
========================================== */

export async function approveVisitor(visitorId){

try{

const visitorRef=

doc(db,COLLECTIONS.VISITORS,visitorId);

await setDoc(

visitorRef,

{

status:"Approved",

approvedAt:serverTimestamp()

},

{merge:true}

);

return{

success:true,

message:"Visitor approved successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Reject Visitor
========================================== */

export async function rejectVisitor(visitorId,reason=""){

try{

const visitorRef=

doc(db,COLLECTIONS.VISITORS,visitorId);

await setDoc(

visitorRef,

{

status:"Rejected",

rejectionReason:reason,

rejectedAt:serverTimestamp()

},

{merge:true}

);

return{

success:true,

message:"Visitor rejected successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Visitor Check-In
========================================== */

export async function visitorCheckIn(visitorId,securityId){

try{

const visitorRef=

doc(db,COLLECTIONS.VISITORS,visitorId);

await setDoc(

visitorRef,

{

status:"Checked In",

securityId:securityId,

checkIn:serverTimestamp()

},

{merge:true}

);

return{

success:true,

message:"Visitor checked in."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Visitor Check-Out
========================================== */

export async function visitorCheckOut(visitorId){

try{

const visitorRef=

doc(db,COLLECTIONS.VISITORS,visitorId);

await setDoc(

visitorRef,

{

status:"Checked Out",

checkOut:serverTimestamp()

},

{merge:true}

);

return{

success:true,

message:"Visitor checked out."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}



/* ==========================================
   Get All Visitors
========================================== */

export async function getAllVisitors(){

try{

const visitorsRef=collection(

db,

COLLECTIONS.VISITORS

);

const visitorsQuery=query(

visitorsRef,

orderBy("createdAt","desc")

);

const snapshot=await getDocs(visitorsQuery);

const visitors=[];

snapshot.forEach(doc=>{

visitors.push({

id:doc.id,

...doc.data()

});

});

return visitors;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Get Today's Visitors
========================================== */

export async function getTodaysVisitors(){

const visitors=await getAllVisitors();

const today=new Date().toDateString();

return visitors.filter(visitor=>{

if(!visitor.createdAt) return false;

const date=visitor.createdAt.toDate().toDateString();

return date===today;

});

}

/* ==========================================
   Get Resident Visitors
========================================== */

export async function getResidentVisitors(residentId){

try{

const visitorsRef=collection(

db,

COLLECTIONS.VISITORS

);

const visitorsQuery=query(

visitorsRef,

where("residentId","==",residentId)

);

const snapshot=await getDocs(visitorsQuery);

const visitors=[];

snapshot.forEach(doc=>{

visitors.push({

id:doc.id,

...doc.data()

});

});

return visitors;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Search By Status
========================================== */

export async function getVisitorsByStatus(status){

try{

const visitorsRef=collection(

db,

COLLECTIONS.VISITORS

);

const visitorsQuery=query(

visitorsRef,

where("status","==",status)

);

const snapshot=await getDocs(visitorsQuery);

const visitors=[];

snapshot.forEach(doc=>{

visitors.push({

id:doc.id,

...doc.data()

});

});

return visitors;

}catch(error){

console.error(error);

return[];

}

}






/* ==========================================
   Search Visitor By Mobile
========================================== */

export async function getVisitorsByMobile(mobile){

try{

const visitorsRef=collection(

db,

COLLECTIONS.VISITORS

);

const visitorsQuery=query(

visitorsRef,

where("mobile","==",mobile)

);

const snapshot=await getDocs(visitorsQuery);

const visitors=[];

snapshot.forEach(doc=>{

visitors.push({

id:doc.id,

...doc.data()

});

});

return visitors;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Visitor Statistics
========================================== */

export async function getVisitorStatistics(){

const visitors=await getAllVisitors();

const stats={

total:visitors.length,

pending:0,

approved:0,

rejected:0,

checkedIn:0,

checkedOut:0

};

visitors.forEach(visitor=>{

switch(visitor.status){

case "Pending":

stats.pending++;

break;

case "Approved":

stats.approved++;

break;

case "Rejected":

stats.rejected++;

break;

case "Checked In":

stats.checkedIn++;

break;

case "Checked Out":

stats.checkedOut++;

break;

}

});

return stats;

}

/* ==========================================
   Module Initialization
========================================== */

export function initializeVisitorModule(){

console.log("================================");

console.log("AKR AMS Visitor Module");

console.log("Status : Ready");

console.log("Visitor Registration : Enabled");

console.log("Visitor Approval : Enabled");

console.log("Check-In / Check-Out : Enabled");

console.log("================================");

}

initializeVisitorModule();

/* ==========================================
   End of File
========================================== */












