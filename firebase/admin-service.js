import { db } from "./firebase-config.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export async function getPendingResidents() {

  const residents = [];

  const snapshot = await getDocs(collection(db, "residents"));

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    if (data.status === "Pending") {

      residents.push(data);

    }

  });

  return residents;

}

export async function approveResident(uid) {

  await updateDoc(doc(db, "residents", uid), {

    status: "Approved",

    approved: true

  });

  alert("Resident Approved");

}

export async function rejectResident(uid) {

  await updateDoc(doc(db, "residents", uid), {

    status: "Rejected",

    approved: false

  });

  alert("Resident Rejected");

}
