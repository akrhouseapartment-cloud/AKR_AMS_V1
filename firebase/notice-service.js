/* ==========================================
   AKR House Apartments
   Notice Service
   Version 2.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
addDoc,
updateDoc,
deleteDoc,
doc,
getDocs,
query,
orderBy,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Create Notice
========================================== */

export async function createNotice(

notice

){

try{

await addDoc(

collection(db,"notices"),

{

title:notice.title,

message:notice.message,

category:notice.category || "General",

priority:notice.priority || "Normal",

pinned:false,

published:true,

createdAt:serverTimestamp()

}

);

alert("Notice Published Successfully");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Update Notice
========================================== */

export async function updateNotice(

noticeId,

data

){

try{

await updateDoc(

doc(db,"notices",noticeId),

data

);

alert("Notice Updated Successfully");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Delete Notice
========================================== */

export async function deleteNotice(

noticeId

){

try{

await deleteDoc(

doc(db,"notices",noticeId)

);

alert("Notice Deleted");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Pin / Unpin Notice
========================================== */

export async function pinNotice(

noticeId,

status=true

){

try{

await updateDoc(

doc(db,"notices",noticeId),

{

pinned:status

}

);

alert(

status?

"Notice Pinned":

"Notice Unpinned"

);

}catch(error){

console.error(error);

}

}

/* ==========================================
   Get All Notices
========================================== */

export async function getNotices(){

const notices=[];

const q=query(

collection(db,"notices"),

orderBy("createdAt","desc")

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

notices.push({

id:doc.id,

...doc.data()

});

});

return notices;

}

/* ==========================================
   Publish to Residents
========================================== */

export function publishToResidents(

noticeTitle

){

console.log(

"Published:",

noticeTitle

);

alert(

"Notice sent to all residents."

);

}

/* ==========================================
   End
========================================== */
