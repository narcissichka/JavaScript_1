var products = document.querySelectorAll('.product');
var productsArray = [];
for (var product of products) {
    productsArray.push(Array.prototype.slice.call(product.children));
}
var prices = [], buttons = [], headers = [], counts = [0, 0, 0, 0];
for (var product of productsArray) {
    prices.push(product[2].innerText.split('$'));
    buttons.push(product[3]);
    headers.push(product[0]);
}
prices = [parseInt(prices[0][0]), parseInt(prices[1][0]), parseInt(prices[2][0]), parseInt(prices[3][0])];
var totalPrice = [0, 0, 0, 0];
var cart = document.querySelector('.cart');
var quantity = [document.createElement('p'), document.createElement('p'), document.createElement('p'), document.createElement('p')];

var sum = document.createElement('p');
sum.style.textTransform = 'uppercase';
sum.style.gridColumn = '1/5';
sum.style.textAlign = 'center';
sum.style.color = '#a786df';

var header = [document.createElement('h4'), document.createElement('h4'), document.createElement('h4'), document.createElement('h4')];
var itemBlock = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
var total = 0;

function addToCart() {
    var i = parseInt(this.id[3]) - 1;
    if (counts[i] == 0) {
        header[i].innerText = headers[i].innerText;
        quantity[i].innerText = 'quantity: ' + (++counts[i]);

        itemBlock[i].insertAdjacentElement('beforeend', header[i]);
        itemBlock[i].insertAdjacentElement('beforeend', quantity[i]);

        itemBlock[i].style.border = '1px solid #d9d4e7'
        itemBlock[i].style.paddingLeft = '5px'

        cart.insertAdjacentElement('beforeend', itemBlock[i]);
    } else {
        quantity[i].innerText = 'quantity: ' + (++counts[i]);
        header[i].insertAdjacentElement('afterend', quantity[i]);
    }
    total += prices[i];
    sum.innerText = 'Total price: ' + total + '$';
    cart.insertAdjacentElement('beforeend', sum);
}
for (var button of buttons) {
    button.addEventListener('click', removeEmptyText);
    button.onclick = addToCart;
}
function removeEmptyText() {
    cart.removeChild(document.querySelector('.cartText'));
    for (var button of buttons) {
        button.removeEventListener('click', removeEmptyText);
    }
}