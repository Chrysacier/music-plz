"use strict";

var intro = document.querySelector(".intro");
if (intro){
    intro.addEventListener("animationend", function() {
        intro.style["display"] = "none";
    })
}

let backgroundTransition = document.querySelector(".transi");


let navButton = document.querySelector(".btn--nav");
navButton.addEventListener("click", toggleNavigation);
var lien = document.querySelectorAll(".nav__link");

function toggleNavigation(){
    if(document.body.hasAttribute("data-menu")){
        document.body.removeAttribute("data-menu");
    }else{
        document.body.setAttribute("data-menu", true);
    }
}

for(var i=0; i < lien.length; i++){
/* cette ligne permet de gérer les interactions au click*/
    lien[i].addEventListener("click", function(e){
        var currentLink = this.href;
        /*C'est dans cette ligne, dans les (...) qu'on ajoute la class 
        qui contient l'animation qu'on souhaite réaliser lors du changement de page*/
        //document.body.classList.add("out");
        document.body.setAttribute("transi-ok", true);
        document.body.removeAttribute("data-menu");
        
        /*Cette ligne accorde le droit de changer de page une fois que l'animation est finie*/
        document.body.addEventListener("animationend", function(e){
            document.body.removeAttribute("transi-ok");
            window.location = currentLink;
            
        });
        /* Cette ligne empêche de changer de page*/
        /* La différent entre cette ligne et la ligne précédente est que 
        1. cette ligne empêche la page de changer
        2. l'animation se fait
        3. la ligne précédente permet la page de changer
        C'est comme quand tu verrouille puis déverrouille un cadenas*/
        /* Note : Cette ligne est la première chose qui se passe dans le code mais
        elle est généralement codée à la fin dans le milieu du codage*/
        e.preventDefault();
    });
}



var audio = document.querySelector(".audio-player");
var play = document.querySelector(".player__play");
var pause = document.querySelector(".player__pause");

if (audio && play) {    
    play.addEventListener("click", function played() {

        if (document.body.hasAttribute("played")) {
            document.body.removeAttribute("played");
            audio.pause();
        }
        else{
            document.body.setAttribute("played", true);
            audio.play();
            audio.volume = 0.2;
        }
    });
}


  //var largeur = window.innerHeight;
  //console.log(largeur);

//
//  var el = document.querySelector("body");
//    // get scroll position in px
//    if (el){
//    el.addEventListener("wheel", translate);
//
//    function translate(e) {
//        const delta = e.deltaY;    
//        var hauteur = window.innerHeight;
//        var gamma = hauteur - delta;
//        console.log(gamma);
//    }
//}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: false,
    
    breakpoints:{
        1200: {
            slidesPerView: 5,
            centeredSlides: true
        }
    }
  });

  