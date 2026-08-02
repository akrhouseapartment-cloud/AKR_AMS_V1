/* ==========================================
   AKR House Apartments
   Firebase Storage
   Version 1.0.0
========================================== */

import { storage } from "./firebase-config.js";

import {

ref,

uploadBytes,

getDownloadURL,

deleteObject

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

/* ==========================================
   Upload File
========================================== */

export async function uploadFile(

folder,

file

){

try{

const storageRef=

ref(

storage,

folder+"/"+file.name

);

await uploadBytes(

storageRef,

file

);

const url=

await getDownloadURL(

storageRef

);

console.log(

"Upload Successful"

);

return url;

}catch(error){

console.error(error);

}

}

/* ==========================================
   Upload Resident Profile
========================================== */

export async function uploadProfile(

file

){

return await uploadFile(

"profiles",

file

);

}

/* ==========================================
   Upload Complaint Image
========================================== */

export async function uploadComplaint(

file

){

return await uploadFile(

"complaints",

file

);

}

/* ==========================================
   Upload Receipt
========================================== */

export async function uploadReceipt(

file

){

return await uploadFile(

"receipts",

file

);

}

/* ==========================================
   Upload Document
========================================== */

export async function uploadDocument(

file

){

return await uploadFile(

"documents",

file

);

}

/* ==========================================
   Upload Asset Image
========================================== */

export async function uploadAsset(

file

){

return await uploadFile(

"assets",

file

);

}

/* ==========================================
   Delete File
========================================== */

export async function deleteFile(

path

){

try{

const storageRef=

ref(

storage,

path

);

await deleteObject(

storageRef

);

console.log(

"File Deleted"

);

}catch(error){

console.error(error);

}

}

/* ==========================================
   End
========================================== */
