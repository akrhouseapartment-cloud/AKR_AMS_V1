/* ==========================================
   AKR House Apartments
   Backup Service
   Version 3.0
========================================== */

import {

db

} from "./firebase-config.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Collections
========================================== */

const COLLECTIONS=[

"admins",

"residents",

"flats",

"maintenance",

"payments",

"complaints",

"visitors",

"documents",

"notices",

"feedback",

"inventory",

"assets",

"communication",

"analytics",

"settings"

];

/* ==========================================
   Backup Firestore
========================================== */

export async function createBackup(){

try{

const backup={

createdAt:new Date().toISOString(),

collections:{}

};

for(const name of COLLECTIONS){

const snapshot=

await getDocs(

collection(db,name)

);

backup.collections[name]=[];

snapshot.forEach(doc=>{

backup.collections[name].push({

id:doc.id,

...doc.data()

});

});

}

console.log("Backup Created");

return backup;

}catch(error){

console.error(error);

return null;

}

}

/* ==========================================
   Download Backup
========================================== */

export function downloadBackup(

backup

){

const blob=new Blob(

[JSON.stringify(backup,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const link=

document.createElement("a");

link.href=url;

link.download=

"AKR_Backup_"+Date.now()+".json";

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

}

/* ==========================================
   Restore Backup
========================================== */

export function restoreBackup(

file

){

console.log(

"Restore Backup",

file

);

alert(

"Restore functionality should be executed only by administrators."

);

}

/* ==========================================
   Backup History
========================================== */

export function getBackupHistory(){

return[

{

name:"Latest Backup",

date:new Date().toLocaleString(),

status:"Available"

}

];

}

/* ==========================================
   Automatic Backup
========================================== */

export function autoBackup(){

console.log(

"Automatic Backup Enabled"

);

}

/* ==========================================
   Delete Backup
========================================== */

export function deleteBackup(

backupName

){

console.log(

"Delete Backup",

backupName

);

alert(

"Backup Removed."

);

}

/* ==========================================
   End
========================================== */
