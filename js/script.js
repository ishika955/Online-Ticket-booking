// form-section;
let flightSection=document.getElementById("flights-section");
let busSection=document.getElementById("buses-section");
let cabSection=document.getElementById("cabs-section");
let trainSection=document.getElementById("trains-section");
let hotelSection=document.getElementById("hotels-section");

let flight=document.getElementById("flight");
let bus=document.getElementById("bus");
let cab=document.getElementById("cab");
let train=document.getElementById("train");
let hotel=document.getElementById("hotel");

 flightSection.style.display=" block";
busSection.style.display="none";
cabSection.style.display="none";
trainSection.style.display="none";
hotelSection.style.display="none";

function navbar(){
   if(flight.checked==true){
   flightSection.style.display=" block";
busSection.style.display="none";
cabSection.style.display="none";
trainSection.style.display="none";
hotelSection.style.display="none";
   }
   if(bus.checked==true){
    flightSection.style.display="none";
busSection.style.display="block";
cabSection.style.display="none";
trainSection.style.display="none";
hotelSection.style.display="none";
   }
    if(train.checked==true){
 flightSection.style.display="none";
busSection.style.display="none";
cabSection.style.display="none";
trainSection.style.display="block";
hotelSection.style.display="none";
   }
    if(hotel.checked==true){
  flightSection.style.display=" none";
busSection.style.display="none";
cabSection.style.display="none";
trainSection.style.display="none";
hotelSection.style.display="block";
   }
   if(cab.checked==true){
 flightSection.style.display=" none";
busSection.style.display="none";
cabSection.style.display="block";
trainSection.style.display="none";
hotelSection.style.display="none";
   }
}