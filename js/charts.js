import { db } from "./firebase.js";

import {
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Load Chart.js before using this file
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

const ctx=document.getElementById("dashboardChart");

if(ctx){

const chart=new Chart(ctx,{

type:"bar",

data:{

labels:[

"Residents",

"Complaints",

"Vehicles",

"Parcels",

"Services"

],

datasets:[{

label:"AKR AMS Statistics",

data:[0,0,0,0,0]

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

const collections=[

"residents",

"complaints",

"vehicles",

"parcels",

"service_requests"

];

collections.forEach((name,index)=>{

onSnapshot(

collection(db,name),

(snapshot)=>{

chart.data.datasets[0].data[index]=snapshot.size;

chart.update();

}

);

});

}
