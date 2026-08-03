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

export async function loginResident(email, password) {

  try {

    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = credential.user.uid;

    const snap = await getDoc(doc(db, "residents", uid));

    if (!snap.exists()) {

      alert("User record not found.");

      await signOut(auth);

      return;

    }

    const user = snap.data();

    if (user.status === "Pending") {

      alert("Your account is waiting for Admin Approval.");

      await signOut(auth);

      return;

    }

    if (user.status === "Rejected") {

      alert("Your account has been rejected.");

      await signOut(auth);

      return;

    }

    if (user.approved !== true) {

      alert("Your account is not approved.");

      await signOut(auth);

      return;

    }

    // Save login
    localStorage.setItem("akrUser", JSON.stringify(user));

    alert("Login Successful");

    const BASE = "/AKR_AMS_V1";

    switch (user.role) {

      case "admin":
        window.location.replace(`${BASE}/admin/Dashboard.html`);
        break;

      case "security":
        window.location.replace(`${BASE}/security/dashboard.html`);
        break;

      case "resident":
      case "Primary Resident":
      case "family":
        window.location.replace(`${BASE}/resident/dashboard.html`);
        break;

      default:
        alert("Unknown user role.");
        await signOut(auth);
        window.location.replace(`${BASE}/index.html`);
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
