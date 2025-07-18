document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const productsTableBody = document.querySelector('#products-table tbody');
    const usersTableBody = document.querySelector('#users-table tbody');
    let products = [];
    let users = [];

    function fetchProducts() {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                renderProducts();
            });
    }

    function fetchUsers() {
        users = JSON.parse(localStorage.getItem('users')) || [];
        renderUsers();
    }

    function renderProducts() {
        productsTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.category}</td>
                <td>
                    <button class="edit-product" data-index="${index}">Edit</button>
                    <button class="delete-product" data-index="${index}">Delete</button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    }

    function renderUsers() {
        usersTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-user" data-index="${index}">Edit</button>
                    <button class="delete-user" data-index="${index}">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    }

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const image = document.getElementById('product-image').value;
        const category = document.getElementById('product-category').value;

        const newProduct = {
            id: products.length + 1,
            name,
            price,
            image,
            category
        };
        products.push(newProduct);
        updateProductsJson();
        renderProducts();
        addProductForm.reset();
    });

    productsTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-product')) {
            const index = e.target.dataset.index;
            products.splice(index, 1);
            updateProductsJson();
            renderProducts();
        }

        if (e.target.classList.contains('edit-product')) {
            const index = e.target.dataset.index;
            const product = products[index];
            const newName = prompt('Enter new product name:', product.name);
            const newPrice = prompt('Enter new product price:', product.price);
            const newCategory = prompt('Enter new product category:', product.category);

            if (newName && newPrice && newCategory) {
                products[index] = { ...product, name: newName, price: parseFloat(newPrice), category: newCategory };
                updateProductsJson();
                renderProducts();
            }
        }
    });

    usersTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-user')) {
            const index = e.target.dataset.index;
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers();
        }

        if (e.target.classList.contains('edit-user')) {
            const index = e.target.dataset.index;
            const user = users[index];
            const newName = prompt('Enter new user name:', user.name);
            const newEmail = prompt('Enter new user email:', user.email);

            if (newName && newEmail) {
                users[index] = { ...user, name: newName, email: newEmail };
                localStorage.setItem('users', JSON.stringify(users));
                renderUsers();
            }
        }
    });

    function updateProductsJson() {
        // In a real application, this would be a POST request to a server.
        // For this demo, we are not actually writing to the products.json file.
        console.log('Updated products:', products);
    }

    fetchProducts();
    fetchUsers();
});
