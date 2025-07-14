
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent!');
});

const cart = {
    items: [],
    total: 0,
};

const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.product-card button');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));

        cart.items.push({ name: productName, price: productPrice });
        cart.total += productPrice;

        updateCartCount();
    });
});

function updateCartCount() {
    cartCountElement.innerText = cart.items.length;
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('nav ul');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
