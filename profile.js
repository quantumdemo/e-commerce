document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePic = document.getElementById('profile-pic');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const uploadError = document.getElementById('upload-error');

    profileName.textContent = loggedInUser.name;
    profileEmail.textContent = loggedInUser.email;
    if (loggedInUser.profilePic) {
        profilePic.src = loggedInUser.profilePic;
    }

    profilePicUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 200 * 1024) {
                uploadError.textContent = 'File size must be less than 200KB.';
                return;
            }
            uploadError.textContent = '';
            const reader = new FileReader();
            reader.onload = (event) => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(user => user.email === loggedInUser.email);
                if (userIndex !== -1) {
                    users[userIndex].profilePic = event.target.result;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
                    profilePic.src = event.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });
});
