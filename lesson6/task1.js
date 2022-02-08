var images = document.querySelectorAll('.pic');
var clicks = [0, 0, 0, 0];

for (var img of images) {
    img.style.marginTop = '20%';
    img.onclick = resizeImg;
    img.onerror = errorOccurred;
}

function resizeImg() {
    var i = parseInt(this.id[3]);
    if (clicks[i - 1] == 0) {
        this.src = 'big/pic' + i + '.jpg';
        clicks[i - 1] = 1;
        this.style.marginTop = '0';
    } else {
        this.src = 'small/pic' + i + '.jpg';
        clicks[i - 1] = 0;
        this.style.marginTop = '20%';
    }
}
function errorOccurred() {
    alert('404. File not found ;(')
}
