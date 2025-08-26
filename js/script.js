// form-section;
let flightSection=document.getElementById("flights-section");
let busSection=document.getElementById("buses-section");
let cabSection=document.getElementById("cab-section");
let trainSection=document.getElementById("train-section");
let hotelSection=document.getElementById("hotel-section");

let flight=document.getElementById("flight");
let bus=document.getElementById("bus");
let cab=document.getElementById("cab");
let train=document.getElementById("train");
let hotel=document.getElementById("hotel");

flightSection.style.visibility="visible";
busSection.style.visibility="hidden";
cabSection.style.visibility="hidden";
trainSection.style.visibility="hidden";
hotelSection.style.visibility="hidden";

function navbar(){
   if(flight.checked==true){
   flightSection.style.visibility="visible";
busSection.style.visibility="hidden";
cabSection.style.visibility="hidden";
trainSection.style.visibility="hidden";
hotelSection.style.visibility="hidden";
   }
   if(bus.checked==true){
    flightSection.style.visibility="visible";
busSection.style.visibility="hidden";
cabSection.style.visibility="hidden";
trainSection.style.visibility="hidden";
hotelSection.style.visibility="hidden";
   }
    if(train.checked==true){
  flightSection.style.visibility="visible";
busSection.style.visibility="hidden";
cabSection.style.visibility="hidden";
trainSection.style.visibility="hidden";
hotelSection.style.visibility="hidden";
   }
    if(hotel.checked==true){
   flightSection.style.visibility="visible";
busSection.style.visibility="hidden";
cabSection.style.visibility="hidden";
trainSection.style.visibility="hidden";
hotelSection.style.visibility="hidden";
   }
   if(cab.checked==true){
  flightSection.style.visibility="visible";
busSection.style.visibility="hidden";
cabSection.style.visibility="hidden";
trainSection.style.visibility="hidden";
hotelSection.style.visibility="hidden";
   }


   window.onload=function(){
    flight.checked=true;
    navbar();
   }
   
   

   



}