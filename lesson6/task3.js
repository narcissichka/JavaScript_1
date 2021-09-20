var slides = document.querySelectorAll('.slide');
var currentSlide = slides[0];
currentSlide.classList.remove('hide');
var arrowLeft = document.querySelectorAll('.arrows')[0];
var arrowRight = document.querySelectorAll('.arrows')[1];
var position = 0;

function nextSlide() {
    currentSlide.classList.add('hide');
    position++;
    position %= slides.length;
    currentSlide = slides[position];
    currentSlide.classList.remove('hide');
}
function previousSlide() {
    currentSlide.classList.add('hide');
    position--;
    position = (position < 0) ? 3 : position;
    currentSlide = slides[position];
    currentSlide.classList.remove('hide');
}
arrowRight.onclick = nextSlide;
arrowLeft.onclick = previousSlide;