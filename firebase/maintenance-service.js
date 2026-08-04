import { db } from "./firebase-config.js";

import {

collection,
addDoc,
updateDoc,
doc,
getDocs,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export async function createMaintenance(data){

await addDoc(collection(db,"maintenance"),{

residentUid:data.residentUid,

residentName:data.residentName,

flat:data.flat,

month:data.month,

year:data.year,

amount:data.amount,

dueDate:data.dueDate,

paidDate:"",

status:"Pending",

paymentMode:"",

transactionId:"",

remarks:"",

createdAt:serverTimestamp()

});

}

export async function updatePayment(id,data){

await updateDoc(doc(db,"maintenance",id),data);

}

export async function getMaintenance(){

return await getDocs(collection(db,"maintenance"));

}
