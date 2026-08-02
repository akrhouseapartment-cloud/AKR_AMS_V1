/* ==========================================
   AKR House Apartments
   Profile Service
   Version 3.0
========================================== */

import {

auth,
db

} from "./firebase-config.js";

import {

doc,
getDoc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

updatePassword

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ==========================================
   Get User Profile
========================================== */

export async function getProfile(uid){

try{

const profile=

await getDoc(

doc(db,"residents",uid)

);

if(profile.exists()){

return{

id:profile.id,

...profile.data()

};

}

return null;

}catch(error){

console.error(error);

}

}

/* ==========================================
   Update Profile
========================================== */

export async function updateProfile(

uid,

data

){

try{

await updateDoc(

doc(db,"residents",uid),

data

);

alert("Profile Updated Successfully");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Update Mobile Number
========================================== */

export async function updateMobile(

uid,

mobile

){

try{

await updateDoc(

doc(db,"residents",uid),

{

mobile:mobile

}

);

alert("Mobile Number Updated");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Update Profile Photo
========================================== */

export async function updateProfilePhoto(

uid,

photoURL

){

try{

await updateDoc(

doc(db,"residents",uid),

{

photoURL:photoURL

}

);

alert("Profile Photo Updated");

}catch(error){

console.error(error);

}

}

/* ==========================================
   Change Password
========================================== */

export async function changePassword(

newPassword

){

try{

await updatePassword(

auth.currentUser,

newPassword

);

alert("Password Changed Successfully");

}catch(error){

console.error(error);

alert(error.message);

}

}

/* ==========================================
   Profile Summary
========================================== */

export async function getProfileSummary(uid){

const profile=

await getProfile(uid);

if(!profile){

return null;

}

return{

name:profile.name,

email:profile.email,

mobile:profile.mobile,

flat:profile.flat,

role:profile.role,

status:profile.status

};

}

/* ==========================================
   End
========================================== */
