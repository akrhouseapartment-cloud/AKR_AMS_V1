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

      alert("Resident record not found.");

      await signOut(auth);

      return;

    }

    const resident = snap.data();

    if (resident.status !== "Approved") {

      alert("Your account is still waiting for Admin Approval.");

      await signOut(auth);

      return;

    }

    alert("Login Successful");

    window.location.href = "dashboard/index.html";

  } catch (error) {

    alert(error.message);

    console.error(error);

  }

}
