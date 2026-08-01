import {
addRecord,
getAllRecords
} from "./database.js";

const form = document.getElementById("flatForm");
const tableBody = document.querySelector("#flatTable tbody");

// Load Flats

async function loadFlats(){

if(!tableBody) return;

const flats = await getAllRecords("flats");

tableBody.innerHTML = "";

flats.forEach(flat=>{

tableBody.innerHTML += `
<tr>
<td>${flat.flatNo || ""}</td>
<td>${flat.floor || ""}</td>
<td>${flat.owner || ""}</td>
<td>${flat.status || ""}</td>
<td>${flat.type || ""}</td>
</tr>
`;

});

}

// Save Flat

if(form){

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const flat={

flatNo:document.getElementById("flatNo").value,

floor:document.getElementById("floor").value,

owner:document.getElementById("owner").value,

status:document.getElementById("status").value,

type:document.getElementById("flatType").value

};

await addRecord("flats",flat);

alert("Flat saved successfully.");

form.reset();

loadFlats();

});

}

loadFlats();
