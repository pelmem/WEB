var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;

var slideInterval = setInterval(nextSlide, 3000);
function getFirstSlides(){
	fetch('/api/slides/?count=5').then(x => x.json())
	.then(items => {
		let myNode = document.getElementById("slides");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		items.forEach(item => {
			var li = document.createElement('li');
			li.setAttribute('class','slide');
			var img = document.createElement('img');
			img.src = item.url;
			img.alt = "la";
			li.append(img);
			myNode.appendChild(li);
		});
		myNode.firstChild.setAttribute('class','slide showing');
		slides = document.querySelectorAll('#slides .slide');
		document.getElementById("count").innerText = `${items.length}`;
	})
	.catch(err => console.error(err))
}

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
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
    slideInterval = setInterval(nextSlide, 2000);

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
    for(var i = 0; i < elems.length; i++){
        elems[i].style.width='400px';
        elems[i].style.height='300px'
    }
}

var sizeButton2 = document.getElementById('sizex2');

sizeButton2.onclick = function() {
    var elems = document.getElementsByTagName('img');
    for(var i = 0; i < elems.length; i++) {
        elems[i].style.width='600px';
        elems[i].style.height='500px'
    }
}

var addButton = document.getElementById('addSlide');
addButton.onclick = function(){
	let count  = parseInt(document.getElementById("count").innerText);
	fetch(`/api/slides/?count=${count + 1}`).then(x => x.json())
	.then(items => {
		let myNode = document.getElementById("slides");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		items.forEach(item => {
			var li = document.createElement('li');
			li.setAttribute('class','slide');
			var img = document.createElement('img');
			img.src = item.url;
			img.alt = "la";
			li.append(img);
			myNode.appendChild(li);
		});
		myNode.childNodes[count - 1].setAttribute('class','slide showing');
		slides = document.querySelectorAll('#slides .slide');
		currentSlide = count - 1;
		document.getElementById("count").innerText = `${items.length}`;
	})
	.catch(err => console.error(err))
}