document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const formLogin = document.getElementById('form-login');
    const formSignup = document.getElementById('form-signup');
    const titleText = document.querySelector('.auth-header h2');
    const subtitleText = document.querySelector('.auth-header p');

    // Tab Switching
    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        formLogin.classList.add('active');
        formSignup.classList.remove('active');
        titleText.innerText = 'Welcome Back';
        subtitleText.innerText = 'Login to book your sacred journey.';
    });

    tabSignup.addEventListener('click', () => {
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
        formSignup.classList.add('active');
        formLogin.classList.remove('active');
        titleText.innerText = 'Create Account';
        subtitleText.innerText = 'Join us to explore divine trails.';
    });

    // Helper: Get registered users database
    function getRegisteredUsers() {
        const usersStr = localStorage.getItem('divineTrailsUsers');
        return usersStr ? JSON.parse(usersStr) : [];
    }

    // Helper: Redirect after login based on email
    function completeAuthRedirect(email) {
        const userEmail = email ? email.toLowerCase().trim() : '';

        // Admin email → redirect to Admin Panel
        if (userEmail === 'mr.avishkarranjane07@gmail.com') {
            window.location.href = '/Website/Admin/index.html';
            return;
        }

        // Regular user → go back to homepage or pending booking
        const pending = sessionStorage.getItem('pendingBooking');
        if (pending) {
            window.location.href = '/Website/User/index.html#contact';
        } else {
            window.location.href = '/Website/User/index.html';
        }
    }

    // Login Submit
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        
        if (email && pass) {
            const registeredUsers = getRegisteredUsers();
            const existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

            let userName = "Pilgrim";
            if (existingUser) {
                userName = existingUser.name;
            } else {
                const prefix = email.split('@')[0];
                userName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            }

            const loggedInUser = { name: userName, email: email };
            localStorage.setItem('divineTrailsUser', JSON.stringify(loggedInUser));
            
            const btn = formLogin.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
            
            setTimeout(() => {
                completeAuthRedirect(email);
            }, 800);
        } else {
            document.getElementById('login-error').classList.add('show');
        }
    });

    // Signup Submit
    formSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const pass = document.getElementById('signup-pass').value.trim();
        
        if (name && email && pass.length >= 6) {
            const registeredUsers = getRegisteredUsers();
            
            const existingIndex = registeredUsers.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingIndex >= 0) {
                registeredUsers[existingIndex] = { name, email, pass };
            } else {
                registeredUsers.push({ name, email, pass });
            }

            localStorage.setItem('divineTrailsUsers', JSON.stringify(registeredUsers));
            
            const user = { name: name, email: email };
            localStorage.setItem('divineTrailsUser', JSON.stringify(user));
            
            const btn = formSignup.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating account...';
            
            setTimeout(() => {
                completeAuthRedirect(email);
            }, 800);
        } else {
            const err = document.getElementById('signup-error');
            if (pass.length < 6) err.innerText = "Password must be at least 6 characters.";
            else err.innerText = "Please fill all required fields correctly.";
            err.classList.add('show');
        }
    });

    // Clear errors on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            document.querySelectorAll('.auth-error').forEach(err => err.classList.remove('show'));
        });
    });
});

// Mock Social Login Logic
window.mockSocialLogin = function(provider) {
    const user = { name: provider + " Traveler", email: 'traveler@example.com' };
    localStorage.setItem('divineTrailsUser', JSON.stringify(user));
    
    const activeForm = document.querySelector('.auth-form.active');
    if (activeForm) {
        const btns = activeForm.querySelectorAll('.social-btn');
        btns.forEach(btn => {
            if (btn.innerText.includes(provider)) {
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Connecting...`;
            }
        });
    }

    setTimeout(() => {
        const pending = sessionStorage.getItem('pendingBooking');
        if (pending) {
            window.location.href = '/Website/User/index.html#contact';
        } else {
            window.location.href = '/Website/User/index.html';
        }
    }, 800);
};
