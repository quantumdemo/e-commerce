document.addEventListener('DOMContentLoaded', () => {
    // Add a default admin user if one doesn't exist
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(user => user.email === 'admin@stylecart.com')) {
        users.push({
            name: 'Admin',
            email: 'admin@stylecart.com',
            password: 'admin',
            profilePic: ''
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = signupForm.querySelector('input[type="text"]');
            const emailInput = signupForm.querySelector('input[type="email"]');
            const passwordInput = signupForm.querySelector('input[type="password"]');

            if (nameInput.value.trim() === '') {
                alert('Name is required.');
                return;
            }

            if (!validateEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (passwordInput.value.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === emailInput.value);

            if (userExists) {
                alert('User with this email already exists.');
            } else {
                const newUser = { name: nameInput.value, email: emailInput.value, password: passwordInput.value, profilePic: '' };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Signup successful! Please login.');
                window.location.href = 'login.html';
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');

            if (!validateEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === emailInput.value && user.password === passwordInput.value);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                if (user.email === 'admin@stylecart.com') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'profile.html';
                }
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});
