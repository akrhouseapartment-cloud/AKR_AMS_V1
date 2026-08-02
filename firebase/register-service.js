/* ==========================================
   AKR House Apartments
   Resident Registration Service
========================================== */

import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Register Resident
========================================== */

export async function registerResident(data) {

  try {

    // Create Authentication User
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const uid = userCredential.user.uid;

    // Save Resident Details
    await setDoc(doc(db, "residents", uid), {

      uid: uid,

      name: data.name,

      mobile: data.mobile,

      email: data.email,

      floor: data.floor,

      flat: data.flat,

      vehicle: data.vehicle,

      emergencyContact: data.emergencyContact,

      role: data.role,

      primaryResidentMobile: data.primaryResidentMobile,

      relationship: data.relationship,

      photo: data.photo || "",

      status: "Pending",

      approved: false,

      createdAt: serverTimestamp()

    });

    alert("Registration Successful. Waiting for Admin Approval.");

    window.location.href = "./login.html";

  } catch (error) {

    console.error("Registration Error:", error);

    switch (error.code) {

      case "auth/email-already-in-use":
        alert("This email is already registered.");
        break;

      case "auth/invalid-email":
        alert("Invalid email address.");
        break;

      case "auth/weak-password":
        alert("Password must be at least 6 characters.");
        break;

      case "auth/network-request-failed":
        alert("Network error. Please check your internet.");
        break;

      default:
        alert(error.message);
        break;

    }

  }

}
