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
   Login Resident / Admin
========================================== */

export async function loginResident(email, password) {

  try {

    // Login with Firebase Authentication
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = credential.user.uid;

    // Get User Details
    const docRef = doc(db, "residents", uid);

    const snap = await getDoc(docRef);

    if (!snap.exists()) {

      alert("User record not found.");

      await signOut(auth);

      return;

    }

    const user = snap.data();

    // Pending Approval
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

    // Approved check
    if (user.approved !== true) {

      alert("Your account is not approved.");

      await signOut(auth);

      return;

    }

    // Success
    alert("Login Successful");

    // Redirect by Role
    switch (user.role) {

      case "admin":

        window.location.href = "admin/Dashboard.html";

        break;

      case "security":

        window.location.href = "security/Dashboard.html";

        break;

      case "family":

        window.location.href = "resident/Dashboard.html";

        break;

      case "resident":

      case "Primary Resident":

        window.location.href = "resident/Dashboard.html";

        break;

      default:

        window.location.href = "index.html";

        break;

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
