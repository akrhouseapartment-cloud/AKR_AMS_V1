import {
addRecord,
getAllRecords
} from "./database.js";

const form = document.getElementById("residentForm");
const tableBody = document.querySelector("#residentTable tbody");

// Load Residents

async function loadResidents() {

if (!tableBody) return;

const residents = await getAllRecords("residents");

tableBody.innerHTML = "";

residents.forEach(resident => {

tableBody.innerHTML += `
<tr>
<td>${resident.flatNo || ""}</td>
<td>${resident.name || ""}</td>
<td>${resident.mobile || ""}</td>
<td>${resident.residentType || ""}</td>
<td>${resident.status || ""}</td>
</tr>
`;

});

}

// Save Resident

if (form) {

form.addEventListener("submit", async (e) => {

e.preventDefault();

const resident = {

flatNo: document.getElementById("flatNo").value,

name: document.getElementById("residentName").value,

mobile: document.getElementById("mobile").value,

email: document.getElementById("email").value,

residentType: document.getElementById("residentType").value,

status: document.getElementById("status").value

};

await addRecord("residents", resident);

alert("Resident added successfully.");

form.reset();

loadResidents();

});

}

loadResidents();
