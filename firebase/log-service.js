/* ==========================================
   AKR House Apartments
   Log Service
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
serverTimestamp,
where

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Create Log
========================================== */

export async function createLog(

type,

user,

action,

status="Success"

){

try{

await addDoc(

collection(db,"logs"),

{

type,

user,

action,

status,

createdAt:serverTimestamp()

}

);

}catch(error){

console.error(error);

}

}

/* ==========================================
   User Activity Log
========================================== */

export async function userLog(

user,

action

){

await createLog(

"User",

user,

action,

"Success"

);

}

/* ==========================================
   Security Log
========================================== */

export async function securityLog(

user,

action

){

await createLog(

"Security",

user,

action,

"Success"

);

}

/* ==========================================
   Error Log
========================================== */

export async function errorLog(

user,

action

){

await createLog(

"Error",

user,

action,

"Failed"

);

}

/* ==========================================
   System Log
========================================== */

export async function systemLog(

action

){

await createLog(

"System",

"System",

action,

"Success"

);

}

/* ==========================================
   Get All Logs
========================================== */

export async function getLogs(){

const logs=[];

const q=query(

collection(db,"logs"),

orderBy("createdAt","desc")

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

logs.push({

id:doc.id,

...doc.data()

});

});

return logs;

}

/* ==========================================
   Get Logs By Type
========================================== */

export async function getLogsByType(

type

){

const logs=[];

const q=query(

collection(db,"logs"),

where("type","==",type)

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

logs.push({

id:doc.id,

...doc.data()

});

});

return logs;

}

/* ==========================================
   End
========================================== */
