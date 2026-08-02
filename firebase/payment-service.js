/* ==========================================
   AKR House Apartments
   Payment Service
   Version 2.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
addDoc,
getDocs,
query,
where,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Create Maintenance Bill
========================================== */

export async function createBill(

bill

){

try{

await addDoc(

collection(db,"payments"),

{

...bill,

status:"Pending",

createdAt:serverTimestamp()

}

);

alert("Maintenance Bill Created");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Record Payment
========================================== */

export async function recordPayment(

payment

){

try{

await addDoc(

collection(db,"payment_history"),

{

...payment,

status:"Paid",

paidAt:serverTimestamp()

}

);

alert("Payment Recorded Successfully");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Payment History
========================================== */

export async function getPaymentHistory(

residentId

){

const history=[];

const q=query(

collection(db,"payment_history"),

where("residentId","==",residentId)

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

history.push({

id:doc.id,

...doc.data()

});

});

return history;

}

/* ==========================================
   Pending Dues
========================================== */

export async function getPendingPayments(

residentId

){

const dues=[];

const q=query(

collection(db,"payments"),

where("residentId","==",residentId),

where("status","==","Pending")

);

const snapshot=

await getDocs(q);

snapshot.forEach(doc=>{

dues.push({

id:doc.id,

...doc.data()

});

});

return dues;

}

/* ==========================================
   Payment Summary
========================================== */

export async function getPaymentSummary(

residentId

){

const history=

await getPaymentHistory(

residentId

);

let totalPaid=0;

history.forEach(item=>{

totalPaid+=Number(item.amount||0);

});

return{

payments:history.length,

totalPaid:totalPaid

};

}

/* ==========================================
   Generate Receipt
========================================== */

export function generateReceipt(

payment

){

return{

receiptNumber:

"AKR-"+Date.now(),

date:new Date().toLocaleDateString(),

resident:payment.residentName,

flat:payment.flat,

amount:payment.amount,

mode:payment.mode,

status:"Paid"

};

}

/* ==========================================
   End
========================================== */
