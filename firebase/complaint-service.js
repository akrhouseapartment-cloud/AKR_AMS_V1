/* ==========================================
   AKR House Apartments
   Complaint Service
   Version 2.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
addDoc,
updateDoc,
doc,
getDocs,
query,
where,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Register Complaint
========================================== */

export async function registerComplaint(

complaint

){

try{

await addDoc(

collection(db,"complaints"),

{

...complaint,

status:"Open",

priority:"Normal",

assignedTo:"",

createdAt:serverTimestamp()

}

);

alert("Complaint Registered Successfully");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Assign Complaint
========================================== */

export async function assignComplaint(

complaintId,

staffName

){

try{

await updateDoc(

doc(db,"complaints",complaintId),

{

assignedTo:staffName,

status:"Assigned"

}

);

alert("Complaint Assigned");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Resolve Complaint
========================================== */

export async function resolveComplaint(

complaintId

){

try{

await updateDoc(

doc(db,"complaints",complaintId),

{

status:"Resolved",

resolvedAt:serverTimestamp()

}

);

alert("Complaint Resolved");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Complaint History
========================================== */

export async function getComplaintHistory(

residentId

){

const complaints=[];

const q=query(

collection(db,"complaints"),

where("residentId","==",residentId)

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

complaints.push({

id:doc.id,

...doc.data()

});

});

return complaints;

}

/* ==========================================
   Complaint Statistics
========================================== */

export async function getComplaintStatistics(){

const snapshot=

await getDocs(

collection(db,"complaints")

);

let total=0;

let open=0;

let assigned=0;

let resolved=0;

snapshot.forEach(doc=>{

total++;

const status=doc.data().status;

if(status==="Open") open++;

if(status==="Assigned") assigned++;

if(status==="Resolved") resolved++;

});

return{

total,

open,

assigned,

resolved

};

}

/* ==========================================
   Upload Complaint Image
========================================== */

export function uploadComplaintImage(

file

){

console.log(

"Upload using uploadComplaint() from storage.js",

file

);

}

/* ==========================================
   End
========================================== */
