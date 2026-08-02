/* ==========================================
   AKR House Apartments
   Role Service
   Version 3.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

doc,
getDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Get User Role
========================================== */

export async function getUserRole(uid){

try{

const adminDoc=await getDoc(doc(db,"admins",uid));

if(adminDoc.exists()){

return "Administrator";

}

const residentDoc=await getDoc(doc(db,"residents",uid));

if(residentDoc.exists()){

return residentDoc.data().role || "Resident";

}

return null;

}catch(error){

console.error(error);

return null;

}

}

/* ==========================================
   Check Administrator
========================================== */

export async function isAdmin(uid){

const role=await getUserRole(uid);

return role==="Administrator";

}

/* ==========================================
   Check Committee
========================================== */

export async function isCommittee(uid){

const role=await getUserRole(uid);

return role==="Committee";

}

/* ==========================================
   Check Staff
========================================== */

export async function isStaff(uid){

const role=await getUserRole(uid);

return role==="Staff";

}

/* ==========================================
   Check Resident
========================================== */

export async function isResident(uid){

const role=await getUserRole(uid);

return role==="Resident";

}

/* ==========================================
   End
========================================== */
