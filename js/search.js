// ===============================
// AKR AMS Global Search
// ===============================

export function searchTable(inputId, tableId){

const input=document.getElementById(inputId);

const table=document.getElementById(tableId);

if(!input || !table) return;

const filter=input.value.toUpperCase();

const rows=table.getElementsByTagName("tr");

for(let i=1;i<rows.length;i++){

let found=false;

const cells=rows[i].getElementsByTagName("td");

for(let j=0;j<cells.length;j++){

if(cells[j].textContent.toUpperCase().indexOf(filter)>-1){

found=true;

break;

}

}

rows[i].style.display=found?"":"none";

}

}

export function enableSearch(inputId,tableId){

const input=document.getElementById(inputId);

if(input){

input.addEventListener("keyup",()=>{

searchTable(inputId,tableId);

});

}

}
