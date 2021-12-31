"use strict";
import { setStyle } from "./styleFaçade.js";

const notify= document.querySelectorAll(".notify-me");
const overlay=document.querySelector(".overlay");
const okButton = document.querySelector(".ok");
const hospital = document.querySelector('.hos-name').firstElementChild.textContent.trim();
const emailNode = document.querySelector('.email');
let facility = null;

for (let i = 0; i < notify.length; i++) {
    const element = notify[i];
    element.addEventListener('click', function(){
        setStyle(['.hidden'],'display','block');
        facility = element.parentElement.firstElementChild.textContent.trim();
    });
}

/*implementation */
function addEmailDetails(type,url,subscriberEmail,subscribedFacility,subscribedHospital){
    $.ajax({
        type: type,
        url: url,
        data: {email: subscriberEmail, fac: subscribedFacility, hos: subscribedHospital},
        success: function (response) {
            setStyle(['.hidden'],'display','none');
            alert("Successfully added");
            console.log(response);
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert("Refresh and try again");
        }
    });
}

/* bridge*/
function addEmailDetailsBridge(){
    var subscriberEmail=emailNode.value.trim();
    var subscribedFacility=facility;
    var subscribedHospital=hospital;
    var type= "POST";
    var url= "dataSaver.php";
    addEmailDetails(type,url,subscriberEmail,subscribedFacility,subscribedHospital);
}

okButton.addEventListener("click", function(){
    addEmailDetailsBridge();
});
/* the api call is not tightly coupled to the event now */
    
// okButton.addEventListener("click", function(){
//     $.ajax({
//                 type: "POST",
//                 url: "dataSaver.php",
//                 data: {email: emailNode.value.trim(), fac: facility, hos: hospital},
//                 success: function (response) {
//                     setStyle(['.hidden'],'display','none');
//                     alert("Successfully added");
//                     console.log(response);
//                 },
//                 error: function(xhr, ajaxOptions, thrownError){
//                     alert("Refresh and try again");
//                 }
//             });
//     });

overlay.addEventListener("click",function(){
    setStyle(['.hidden'],'display','none');
});