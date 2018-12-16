var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;

var slideInterval = setInterval(nextSlide,3000);

function nextSlide() {
 slides[currentSlide].className = 'slide';
 currentSlide = (currentSlide+1)%slides.length;
 slides[currentSlide].className = 'slide showing';
}

var playing = true;
var pauseButton = document.getElementById('pause');

function pauseSlideshow() {
    pauseButton.innerHTML = 'Play';
    playing = false;
    clearInterval(slideInterval);

}
 
function playSlideshow() {
    pauseButton.innerHTML = 'Pause';
    playing = true;
    slideInterval = setInterval(nextSlide,2000);

}
 
pauseButton.onclick = function() {
    if(playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
}
var sizeButton1 = document.getElementById('sizex1');
sizeButton1.onclick = function() {
var elems = document.getElementsByTagName('img');
for(var i=0; i<elems.length; i++){
 elems[i].style.width='400px';
 elems[i].style.height='300px'
}
}
var sizeButton2 = document.getElementById('sizex2');
sizeButton2.onclick = function() {
var elems = document.getElementsByTagName('img');
for(var i=0; i<elems.length; i++) {
 elems[i].style.width='600px';
 elems[i].style.height='500px'
}
}