/* ==========================================
   AKR House Apartments
   Firestore Module
   Version 1.0.0
========================================== */

import {

db,

COLLECTIONS

} from "./firebase-config.js";

import {

collection,

doc,

setDoc,

getDoc,

getDocs,

updateDoc,

deleteDoc,

query,

where,

orderBy,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ==========================================
   Save Resident
========================================== */

export async function saveResident(resident){

try{

await setDoc(

doc(db,COLLECTIONS.RESIDENTS,resident.uid),

{

...resident,

createdAt:serverTimestamp(),

updatedAt:serverTimestamp()

}

);

return{

success:true,

message:"Resident saved successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Get Resident
========================================== */

export async function getResident(uid){

try{

const residentRef=

doc(db,COLLECTIONS.RESIDENTS,uid);

const residentSnap=

await getDoc(residentRef);

if(!residentSnap.exists()){

return null;

}

return residentSnap.data();

}catch(error){

console.error(error);

return null;

}

}


/* ==========================================
   Update Resident
========================================== */

export async function updateResident(uid,data){

try{

const residentRef=

doc(db,COLLECTIONS.RESIDENTS,uid);

await updateDoc(

residentRef,

{

...data,

updatedAt:serverTimestamp()

}

);

return{

success:true,

message:"Resident updated successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Delete Resident
========================================== */

export async function deleteResident(uid){

try{

await deleteDoc(

doc(db,COLLECTIONS.RESIDENTS,uid)

);

return{

success:true,

message:"Resident deleted successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Get All Residents
========================================== */

export async function getAllResidents(){

try{

const residentsQuery=query(

collection(db,COLLECTIONS.RESIDENTS),

orderBy("flat")

);

const snapshot=await getDocs(residentsQuery);

const residents=[];

snapshot.forEach(doc=>{

residents.push({

id:doc.id,

...doc.data()

});

});

return residents;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Search By Flat
========================================== */

export async function searchResidentByFlat(flat){

try{

const residentQuery=query(

collection(db,COLLECTIONS.RESIDENTS),

where("flat","==",flat)

);

const snapshot=await getDocs(residentQuery);

const result=[];

snapshot.forEach(doc=>{

result.push({

id:doc.id,

...doc.data()

});

});

return result;

}catch(error){

console.error(error);

return[];

}

}




/* ==========================================
   Search Resident By Mobile
========================================== */

export async function searchResidentByMobile(mobile){

try{

const residentQuery=query(

collection(db,COLLECTIONS.RESIDENTS),

where("mobile","==",mobile)

);

const snapshot=await getDocs(residentQuery);

const residents=[];

snapshot.forEach(doc=>{

residents.push({

id:doc.id,

...doc.data()

});

});

return residents;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Search Resident By Role
========================================== */

export async function searchResidentByRole(role){

try{

const residentQuery=query(

collection(db,COLLECTIONS.RESIDENTS),

where("role","==",role)

);

const snapshot=await getDocs(residentQuery);

const residents=[];

snapshot.forEach(doc=>{

residents.push({

id:doc.id,

...doc.data()

});

});

return residents;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Get Pending Approvals
========================================== */

export async function getPendingApprovals(){

try{

const residentQuery=query(

collection(db,COLLECTIONS.RESIDENTS),

where("approved","==",false)

);

const snapshot=await getDocs(residentQuery);

const pending=[];

snapshot.forEach(doc=>{

pending.push({

id:doc.id,

...doc.data()

});

});

return pending;

}catch(error){

console.error(error);

return[];

}

}

/* ==========================================
   Approve Resident
========================================== */

export async function approveResident(uid){

try{

await updateResident(uid,{

approved:true,

status:"Approved"

});

return{

success:true,

message:"Resident approved successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

/* ==========================================
   Reject Resident
========================================== */

export async function rejectResident(uid){

try{

await updateResident(uid,{

approved:false,

status:"Rejected"

});

return{

success:true,

message:"Resident rejected successfully."

};

}catch(error){

return{

success:false,

message:error.message

};

}

}




/* ==========================================
   Resident Statistics
========================================== */

export async function getResidentStatistics(){

try{

const residents=await getAllResidents();

const stats={

totalResidents:residents.length,

approvedResidents:0,

pendingResidents:0,

rejectedResidents:0,

admins:0,

primaryResidents:0,

familyMembers:0,

securityStaff:0

};

residents.forEach(resident=>{

if(resident.status==="Approved"){

stats.approvedResidents++;

}

if(resident.status==="Pending"){

stats.pendingResidents++;

}

if(resident.status==="Rejected"){

stats.rejectedResidents++;

}

switch(resident.role){

case "admin":

stats.admins++;

break;

case "resident":

stats.primaryResidents++;

break;

case "family":

stats.familyMembers++;

break;

case "security":

stats.securityStaff++;

break;

}

});

return stats;

}catch(error){

console.error(error);

return null;

}

}

/* ==========================================
   Flat Occupancy
========================================== */

export async function getFlatOccupancy(){

try{

const residents=await getAllResidents();

const occupancy={};

residents.forEach(resident=>{

const flat=resident.flat;

if(!occupancy[flat]){

occupancy[flat]=0;

}

occupancy[flat]++;

});

return occupancy;

}catch(error){

console.error(error);

return {};

}

}

/* ==========================================
   Firestore Initialization
========================================== */

export function initializeFirestore(){

console.log("================================");

console.log("AKR AMS Firestore");

console.log("Status : Ready");

console.log("Residents : Enabled");

console.log("Approvals : Enabled");

console.log("Reports : Enabled");

console.log("================================");

}

initializeFirestore();

/* ==========================================
   End of File
========================================== */
















