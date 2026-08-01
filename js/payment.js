import { addRecord } from "./database.js";
import { generateReceipt } from "./pdf.js";

// ===============================
// AKR AMS Payment Module
// ===============================

// Record Offline Payment

export async function recordPayment(payment){

try{

const id = await addRecord("payments",{

...payment,

status:"Paid",

paymentDate:new Date().toISOString()

});

return id;

}

catch(error){

console.error(error);

throw error;

}

}

// Generate Receipt

export function downloadReceipt(payment){

generateReceipt(payment);

}

// UPI Payment (Placeholder)

export function payViaUPI(

upiId,

amount,

note="Maintenance Payment"

){

const url=

`upi://pay?pa=${upiId}&pn=AKR House Apartments&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

window.location.href=url;

}

// Razorpay Payment (Structure)

export function payWithRazorpay(options){

if(typeof Razorpay==="undefined"){

alert("Razorpay SDK not loaded.");

return;

}

const razorpay = new Razorpay(options);

razorpay.open();

}

// Payment Status

export function getPaymentStatus(payment){

if(payment.status==="Paid"){

return "✅ Paid";

}

if(payment.status==="Pending"){

return "⏳ Pending";

}

if(payment.status==="Failed"){

return "❌ Failed";

}

return "Unknown";

}

// Calculate Due Amount

export function calculateDue(

monthlyMaintenance,

paidAmount

){

return Number(monthlyMaintenance)-Number(paidAmount);

}
