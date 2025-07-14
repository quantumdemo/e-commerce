
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');
    const submitButton = contactForm.querySelector('button');

    if (nameInput.value.trim() === '') {
        alert('Name is required.');
        return;
    }

    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (messageInput.value.trim() === '') {
        alert('Message is required.');
        return;
    }

    submitButton.innerText = 'Sending...';

    setTimeout(() => {
        submitButton.innerText = 'Sent!';
        setTimeout(() => {
            submitButton.innerText = 'Send';
            contactForm.reset();
        }, 2000);
    }, 1000);
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function initializeProducts() {
    const productGrid = document.querySelector('.product-grid');

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.category = product.category;

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                `;

                productGrid.appendChild(productCard);
            });

            const productCards = document.querySelectorAll('.product-card');
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
        });
}

document.addEventListener('DOMContentLoaded', initializeProducts);

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('nav ul');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

const modal = document.getElementById('product-modal');
const closeModalButton = document.querySelector('.close-button');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
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

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});
