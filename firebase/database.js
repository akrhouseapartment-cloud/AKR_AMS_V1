/* ==========================================
   AKR House Apartments
   Firebase Firestore Database
   Version 1.0.0
========================================== */

import { db } from "./firebase-config.js";

import {

collection,

addDoc,

getDocs,

getDoc,

doc,

updateDoc,

deleteDoc,

onSnapshot

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Add Record
========================================== */

export async function addRecord(

collectionName,

data

){

try{

const docRef=

await addDoc(

collection(db,collectionName),

data

);

console.log(

"Record Added:",

docRef.id

);

return docRef.id;

}catch(error){

console.error(error);

}

}

/* ==========================================
   Get All Records
========================================== */

export async function getRecords(

collectionName

){

try{

const querySnapshot=

await getDocs(

collection(db,collectionName)

);

const records=[];

querySnapshot.forEach(doc=>{

records.push({

id:doc.id,

...doc.data()

});

});

return records;

}catch(error){

console.error(error);

}

}

/* ==========================================
   Get Single Record
========================================== */

export async function getRecord(

collectionName,

id

){

try{

const document=

await getDoc(

doc(db,collectionName,id)

);

if(document.exists()){

return {

id:document.id,

...document.data()

};

}

return null;

}catch(error){

console.error(error);

}

}

/* ==========================================
   Update Record
========================================== */

export async function updateRecord(

collectionName,

id,

data

){

try{

await updateDoc(

doc(db,collectionName,id),

data

);

console.log(

"Record Updated"

);

}catch(error){

console.error(error);

}

}

/* ==========================================
   Delete Record
========================================== */

export async function deleteRecord(

collectionName,

id

){

try{

await deleteDoc(

doc(db,collectionName,id)

);

console.log(

"Record Deleted"

);

}catch(error){

console.error(error);

}

}

/* ==========================================
   Real-Time Listener
========================================== */

export function listenRecords(

collectionName,

callback

){

return onSnapshot(

collection(db,collectionName),

(snapshot)=>{

const data=[];

snapshot.forEach(doc=>{

data.push({

id:doc.id,

...doc.data()

});

});

callback(data);

}

);

}

/* ==========================================
   End
========================================== */
