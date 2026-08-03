/* ==========================================
   AKR House Apartments
   Login Service
========================================== */

import { auth, db } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
   Login
========================================== */

export async function loginResident(email, password) {

  try {

    // Firebase Login
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = credential.user.uid;

    // Read user from Firestore
    const snap = await getDoc(doc(db, "residents", uid));

    if (!snap.exists()) {

      alert("User record not found.");

      await signOut(auth);

      return;

    }

    const user = snap.data();

    // Pending
    if (user.status === "Pending") {

      alert("Your account is waiting for Admin Approval.");

      await signOut(auth);

      return;

    }

    // Rejected
    if (user.status === "Rejected") {

      alert("Your account has been rejected.");

      await signOut(auth);

      return;

    }

    // Not approved
    if (user.approved !== true) {

      alert("Your account is not approved.");

      await signOut(auth);

      return;

    }

    // Success
    alert("Login Successful");

    switch (user.role) {

      case "admin":

        window.location.href = "admin/Dashboard.html";
        break;

      case "security":

        window.location.href = "security/dashboard.html";
        break;

      case "resident":

      case "Primary Resident":

      case "family":

        window.location.href = "resident/dashboard.html";
        break;

      default:

        alert("Invalid user role.");
        await signOut(auth);

    }

  } catch (error) {

    console.error(error);

    switch (error.code) {

      case "auth/user-not-found":
        alert("User not found.");
        break;

      case "auth/wrong-password":
        alert("Incorrect password.");
        break;

      case "auth/invalid-credential":
        alert("Invalid email or password.");
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
