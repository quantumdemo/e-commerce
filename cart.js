document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutForm = document.getElementById('checkout-form');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                cart.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.innerHTML = `
                        <p>${item.name} - $${item.price.toFixed(2)}</p>
                        <button class="remove-from-cart" data-index="${index}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                    total += item.price;
                });
            }
            if (totalPriceElement) {
                totalPriceElement.textContent = total.toFixed(2);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));
            addToCart({ name: productName, price: productPrice });
        }

        if (e.target.classList.contains('remove-from-cart')) {
            const index = e.target.dataset.index;
            removeFromCart(index);
        }
    });

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (!loggedInUser) {
                alert('You must be logged in to checkout.');
                window.location.href = 'login.html';
                return;
            }
            if (cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }

    updateCart();
});

// Need to change the add to cart button in script.js to have a class of add-to-cart-btn
// and remove the old cart logic.
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product-card button');
    addToCartButtons.forEach(button => {
        button.classList.add('add-to-cart-btn');
    });
});
