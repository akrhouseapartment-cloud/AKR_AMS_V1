import { db } from "./firebase.js";

import {

collection,

addDoc,

doc,

getDoc,

getDocs,

updateDoc,

deleteDoc,

onSnapshot,

query,

orderBy,

where

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Create

export async function addRecord(

collectionName,

data

){

try{

const ref=await addDoc(

collection(db,collectionName),

{

...data,

createdAt:new Date()

}

);

return ref.id;

}

catch(error){

console.error(error);

throw error;

}

}

// Read One

export async function getRecord(

collectionName,

id

){

const snap=await getDoc(

doc(db,collectionName,id)

);

if(snap.exists()){

return{

id:snap.id,

...snap.data()

};

}

return null;

}

// Read All

export async function getAllRecords(

collectionName

){

const snapshot=

await getDocs(

query(

collection(db,collectionName),

orderBy("createdAt","desc")

)

);

const data=[];

snapshot.forEach(doc=>{

data.push({

id:doc.id,

...doc.data()

});

});

return data;

}

// Update

export async function updateRecord(

collectionName,

id,

data

){

await updateDoc(

doc(db,collectionName,id),

{

...data,

updatedAt:new Date()

}

);

}

// Delete

export async function deleteRecord(

collectionName,

id

){

await deleteDoc(

doc(db,collectionName,id)

);

}

// Filter

export async function filterRecords(

collectionName,

field,

value

){

const q=query(

collection(db,collectionName),

where(field,"==",value)

);

const snapshot=

await getDocs(q);

const data=[];

snapshot.forEach(doc=>{

data.push({

id:doc.id,

...doc.data()

});

});

return data;

}

// Realtime Listener

export function watchCollection(

collectionName,

callback

){

const q=query(

collection(db,collectionName),

orderBy("createdAt","desc")

);

return onSnapshot(

q,

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
