import {
auth,
db
} from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Register User

export async function registerUser(
name,
mobile,
email,
password,
role,
floor,
flat,
vehicle,
emergencyContact,
photo,
primaryResidentMobile,
relationship
){

try{

const userCredential=
await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(
doc(db,"residents",userCredential.user.uid),
{
uid: userCredential.user.uid,
name: name,
mobile: mobile,
email: email,
role: role,
floor: floor,
flat: flat,
vehicle: vehicle,
emergencyContact: emergencyContact,
photo: photo,
primaryResidentMobile: primaryResidentMobile,
relationship: relationship,
status: "Pending",
createdAt: new Date().toISOString()
}
);
alert("Registration Successful");

}
catch(error){

alert(error.message);

}

}

// Login

export async function loginUser(

email,

password

){

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

alert("Login Successful");

}
catch(error){

alert(error.message);

}

}

// Logout

export async function logoutUser(){

await signOut(auth);

location.href="../login.html";

}

// Forgot Password

export async function resetPassword(email){

try{

await sendPasswordResetEmail(

auth,

email

);

alert("Password reset email sent.");

}
catch(error){

alert(error.message);

}

}

// Session

onAuthStateChanged(

auth,

async(user)=>{

if(user){

const ref=doc(

db,

"users",

user.uid

);

const snap=await getDoc(ref);

if(snap.exists()){

console.log(

snap.data()

);

}

}

}
);
