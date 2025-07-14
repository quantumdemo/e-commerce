
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Message sent!');
    contactForm.reset();
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

const productCards = document.querySelectorAll('.product-card');
const modal = document.getElementById('product-modal');
const closeModalButton = document.querySelector('.close-button');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');

productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            const title = card.querySelector('h3').innerText;
            const price = card.querySelector('p').innerText;
            const imgSrc = card.querySelector('img').src;

            modalTitle.innerText = title;
            modalPrice.innerText = price;
            modalImg.src = imgSrc;

            modal.style.display = 'block';
        }
    });
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

const filterButtons = document.querySelectorAll('.product-filters button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const animatedSections = document.querySelectorAll('.animated-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

animatedSections.forEach(section => {
    observer.observe(section);
});
