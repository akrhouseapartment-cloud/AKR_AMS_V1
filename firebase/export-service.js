/* ==========================================
   AKR House Apartments
   Export Service
   Version 3.0
========================================== */

/* ==========================================
   Export CSV
========================================== */

export function exportCSV(

fileName,

rows

){

if(!rows || rows.length===0){

alert("No data available.");

return;

}

const headers=Object.keys(rows[0]);

let csv=headers.join(",")+"\n";

rows.forEach(row=>{

csv+=headers.map(key=>row[key] ?? "").join(",")+"\n";

});

const blob=new Blob(

[csv],

{

type:"text/csv"

}

);

const url=URL.createObjectURL(blob);

const link=document.createElement("a");

link.href=url;

link.download=fileName+".csv";

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

}

/* ==========================================
   Export JSON
========================================== */

export function exportJSON(

fileName,

data

){

const blob=new Blob(

[JSON.stringify(data,null,2)],

{

type:"application/json"

}

);

const url=URL.createObjectURL(blob);

const link=document.createElement("a");

link.href=url;

link.download=fileName+".json";

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

}

/* ==========================================
   Export PDF
========================================== */

export function exportPDF(

title,

data

){

console.log("PDF Export",title,data);

alert("PDF export will be integrated in a future update.");

}

/* ==========================================
   Export Excel
========================================== */

export function exportExcel(

title,

data

){

console.log("Excel Export",title,data);

alert("Excel export will be integrated using SheetJS.");

}

/* ==========================================
   Print
========================================== */

export function printPage(){

window.print();

}

/* ==========================================
   Download Backup
========================================== */

export function downloadBackup(

data

){

exportJSON(

"AKR_Backup_"+Date.now(),

data

);

}

/* ==========================================
   Share Report
========================================== */

export async function shareReport(

title,

text

){

if(navigator.share){

try{

await navigator.share({

title:title,

text:text

});

}catch(error){

console.error(error);

}

}else{

alert("Sharing is not supported on this device.");

}

}

/* ==========================================
   End
========================================== */
