import { storage } from "./firebase.js";

import {
ref,
uploadBytes,
getDownloadURL,
deleteObject
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

// Upload File

export async function uploadFile(

folder,

file

){

try{

const fileName=

Date.now()+"_"+file.name;

const storageRef=

ref(

storage,

`${folder}/${fileName}`

);

await uploadBytes(

storageRef,

file

);

const url=

await getDownloadURL(

storageRef

);

return{

success:true,

url:url,

name:fileName

};

}

catch(error){

console.error(error);

return{

success:false,

error:error.message

};

}

}

// Delete File

export async function deleteFile(

folder,

fileName

){

try{

const storageRef=

ref(

storage,

`${folder}/${fileName}`

);

await deleteObject(

storageRef);

return true;

}

catch(error){

console.error(error);

return false;

}

}
