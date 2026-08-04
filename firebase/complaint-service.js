<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width,initial-scale=1.0">

<title>

Complaint Management

</title>

<link rel="stylesheet"
href="../css/style.css">

<link rel="stylesheet"
href="../css/auth.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
rel="stylesheet">

<style>

.container{
max-width:1200px;
margin:auto;
padding:20px;
}

.card{
background:#fff;
padding:20px;
border-radius:10px;
box-shadow:0 2px 10px rgba(0,0,0,.1);
margin-bottom:20px;
}

input,
select,
textarea{

width:100%;
padding:12px;
margin-top:8px;
margin-bottom:15px;
border:1px solid #ccc;
border-radius:8px;

}

table{

width:100%;
border-collapse:collapse;

}

table th,
table td{

padding:12px;
border:1px solid #ddd;

}

.open{
background:#ff9800;
color:white;
padding:5px 10px;
border-radius:20px;
}

.progress{
background:#2196f3;
color:white;
padding:5px 10px;
border-radius:20px;
}

.closed{
background:#4caf50;
color:white;
padding:5px 10px;
border-radius:20px;
}

</style>

</head>

<body>

<header>

<div class="container">

<h2>

📝 Complaint Management

</h2>

<nav>

<a href="dashboard.html">Dashboard</a>

<a href="visitors.html">Visitors</a>

<a href="payments.html">Payments</a>

<a href="complaints.html">Complaints</a>

<a href="chat.html">Chat</a>

<a href="profile.html">Profile</a>

</nav>

</div>

</header>

<div class="container">

<div class="card">

<h2>

Raise Complaint

</h2>

<select id="category">

<option>Electrical</option>

<option>Water</option>

<option>Parking</option>

<option>Security</option>

<option>Lift</option>

<option>Housekeeping</option>

<option>Others</option>

</select>

<textarea

id="description"

rows="5"

placeholder="Describe your complaint">

</textarea>

<button

class="btn primary"

id="submitComplaint">

Submit Complaint

</button>

</div>

<div class="card">

<h2>

My Complaints

</h2>

<table>

<thead>

<tr>

<th>ID</th>

<th>Category</th>

<th>Status</th>

<th>Date</th>

</tr>

</thead>

<tbody id="complaintTable">

<tr>

<td colspan="4">

Loading...

</td>

</tr>

</tbody>

</table>

</div>

</div>

<script type="module">

import { auth, db } from "../firebase/firebase-config.js";

import {

collection,
addDoc,
query,
where,
getDocs,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const table=document.getElementById("complaintTable");

async function loadComplaints(){

const user=auth.currentUser;

if(!user){

table.innerHTML="<tr><td colspan='4'>Please login again.</td></tr>";

return;

}

const q=query(

collection(db,"complaints"),

where("residentUid","==",user.uid)

);

const snapshot=await getDocs(q);

table.innerHTML="";

if(snapshot.empty){

table.innerHTML="<tr><td colspan='4'>No complaints found.</td></tr>";

return;

}

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

let css="open";

if(data.status==="In Progress") css="progress";

if(data.status==="Closed") css="closed";

const date=data.createdAt?.toDate?

data.createdAt.toDate().toLocaleDateString():

"-";

table.innerHTML+=`

<tr>

<td>${docSnap.id.substring(0,8).toUpperCase()}</td>

<td>${data.category}</td>

<td>

<span class="${css}">

${data.status}

</span>

</td>

<td>${date}</td>

</tr>

`;

});

}

document.getElementById("submitComplaint").onclick=async()=>{

const user=auth.currentUser;

if(!user){

alert("Please login again.");

return;

}

const category=document.getElementById("category").value;

const description=document.getElementById("description").value.trim();

if(description===""){

alert("Please enter complaint details.");

return;

}

await addDoc(collection(db,"complaints"),{

residentUid:user.uid,

residentName:user.displayName || "Resident",

flat:"",

category,

description,

priority:"Medium",

status:"Open",

assignedTo:"",

remarks:"",

createdAt:serverTimestamp(),

closedAt:null

});

alert("Complaint submitted successfully.");

document.getElementById("description").value="";

loadComplaints();

};


/* ==========================
   Auto Load Complaints
========================== */

auth.onAuthStateChanged((user)=>{

if(user){

loadComplaints();

}else{

table.innerHTML=`

<tr>

<td colspan="4">

Please login.

</td>

</tr>

`;

}

});


/* ==========================
   Refresh Every 30 Seconds
========================== */

setInterval(()=>{

if(auth.currentUser){

loadComplaints();

}

},30000);


/* ==========================
   Page Loaded
========================== */

window.addEventListener("load",()=>{

console.log("================================");

console.log("AKR AMS");

console.log("Resident Complaint Module");

console.log("Firebase Connected");

console.log("================================");

});

</script>

</body>

</html>




















