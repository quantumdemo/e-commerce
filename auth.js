document.addEventListener('DOMContentLoaded', () => {
    const authLinks = document.querySelectorAll('.auth-links');
    const userLinks = document.querySelectorAll('.user-links');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        authLinks.forEach(link => link.style.display = 'none');
        userLinks.forEach(link => link.style.display = 'block');
    } else {
        authLinks.forEach(link => link.style.display = 'block');
        userLinks.forEach(link => link.style.display = 'none');
    }

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
                alert('Signup successful! A confirmation email has been sent to your email address. Please login.');
                console.log(`Confirmation email sent to ${emailInput.value}`);
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

    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = forgotPasswordForm.querySelector('input[type="email"]');
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === emailInput.value);

            if (user) {
                alert('A password reset link has been sent to your email address.');
                console.log(`Password for ${user.email} is ${user.password}`);
            } else {
                alert('User with this email does not exist.');
            }
        });
    }
});
