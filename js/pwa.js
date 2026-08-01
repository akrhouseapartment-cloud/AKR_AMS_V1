// ===============================
// AKR AMS Progressive Web App
// ===============================

let deferredPrompt=null;

// Install Prompt

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

const installBtn=document.getElementById("installApp");

if(installBtn){

installBtn.style.display="inline-block";

}

});

// Install App

export async function installApp(){

if(!deferredPrompt){

alert("Install option is not available.");

return;

}

deferredPrompt.prompt();

const result=await deferredPrompt.userChoice;

if(result.outcome==="accepted"){

console.log("AKR AMS installed.");

}else{

console.log("Installation cancelled.");

}

deferredPrompt=null;

}

// App Installed

window.addEventListener("appinstalled",()=>{

console.log("AKR AMS successfully installed.");

});

// Register Service Worker

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker

.register("../service-worker.js")

.then(reg=>{

console.log("Service Worker Registered",reg);

})

.catch(err=>{

console.error("Service Worker Failed",err);

});

});

}

// Online / Offline Status

window.addEventListener("online",()=>{

console.log("Internet Connected");

});

window.addEventListener("offline",()=>{

alert("You are offline. Some features may not work.");

});
