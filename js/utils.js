// ===============================
// AKR AMS Utility Functions
// ===============================

// Format Date

export function formatDate(date){

const d=new Date(date);

return d.toLocaleDateString("en-IN",{

day:"2-digit",

month:"short",

year:"numeric"

});

}

// Format Date & Time

export function formatDateTime(date){

const d=new Date(date);

return d.toLocaleString("en-IN");

}

// Generate Random ID

export function generateId(prefix="AKR"){

return `${prefix}-${Date.now()}-${Math.floor(Math.random()*1000)}`;

}

// Validate Email

export function isValidEmail(email){

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return regex.test(email);

}

// Validate Mobile Number

export function isValidMobile(number){

return /^[6-9]\d{9}$/.test(number);

}

// Required Field Validation

export function isEmpty(value){

return value.trim()==="";

}

// Toast Notification

export function showToast(

message,

type="success"

){

alert(`${type.toUpperCase()} : ${message}`);

}

// Loading Spinner

export function showLoader(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="block";

}

}

export function hideLoader(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

}

// Search Helper

export function searchData(

array,

keyword,

field

){

return array.filter(item=>

String(item[field])

.toLowerCase()

.includes(keyword.toLowerCase())

);

}

// Download JSON

export function downloadJSON(

filename,

data

){

const blob=new Blob(

[JSON.stringify(data,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download=filename;

a.click();

URL.revokeObjectURL(url);

}

// Download CSV

export function downloadCSV(

filename,

rows

){

if(rows.length===0)return;

const headers=Object.keys(rows[0]);

const csv=[headers.join(",")];

rows.forEach(row=>{

csv.push(

headers.map(h=>row[h]).join(",")

);

});

const blob=new Blob(

[csv.join("\n")],

{

type:"text/csv"

}

);

const url=

URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download=filename;

a.click();

URL.revokeObjectURL(url);

}

// Currency Formatter

export function formatCurrency(amount){

return new Intl.NumberFormat(

"en-IN",

{

style:"currency",

currency:"INR"

}

).format(amount);

  }
