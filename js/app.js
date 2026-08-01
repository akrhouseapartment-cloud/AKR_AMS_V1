/* ==========================================
   AKR House Apartments
   app.js
   Version 1.0.0
========================================== */

"use strict";

/* ==========================================
   App Loaded
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("================================");

    console.log("AKR House Apartments");

    console.log("Apartment Management System");

    console.log("Version : 1.0.0");

    console.log("Status : Ready");

    console.log("================================");

});

/* ==========================================
   Splash Screen
========================================== */

window.addEventListener("load", () => {

    const splash = document.getElementById("splashScreen");

    if (!splash) return;

    setTimeout(() => {

        splash.style.opacity = "0";

        splash.style.transition = "0.5s";

        setTimeout(() => {

            splash.style.display = "none";

        }, 500);

    }, 2500);

});

/* ==========================================
   Scroll To Top
========================================== */

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (!scrollBtn) return;

    if (window.scrollY > 300) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

if (scrollBtn) {

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================
   Smooth Scroll
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/* ==========================================
   Fade Animation
========================================== */

const observer = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("fade");

}

});

},

{

threshold:0.2

}

);

document.querySelectorAll(

".feature-card,.about-card,.stat-card,.contact-card"

).forEach(card=>{

observer.observe(card);

});

/* ==========================================
   Future Modules
========================================== */

function openAKRAI(){

alert("🤖 AKR AI Assistant - Coming Soon");

}

function notify(message){

console.log("Notification:",message);

}

/* ==========================================
   End
========================================== */
