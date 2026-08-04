/* ==========================================
   AKR House Apartments
   Notice Service
   Version 2.0
=============================================


import { db } from "./firebase-config.js";

import {
collection,
addDoc,
serverTimestamp,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export async function addNotice(data){

await addDoc(collection(db,"notices"),{

title:data.title,

description:data.description,

category:data.category,

priority:data.priority,

postedBy:"Admin",

postedDate:new Date().toLocaleDateString(),

expiryDate:data.expiryDate,

status:"Active",

createdAt:serverTimestamp()

});

}

export async function getNotices(){

return await getDocs(collection(db,"notices"));

}
