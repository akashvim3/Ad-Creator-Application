// Authentication Handlers
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            console.log('Login attempt:', { email, rememberMe });

            // Simulate login
            setTimeout(() => {
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value,
                company: document.getElementById('company').value,
                terms: document.getElementById('terms').checked,
                newsletter: document.getElementById('newsletter').checked
            };

            console.log('Signup attempt:', formData);

            // Simulate signup
            setTimeout(() => {
                alert('Account created successfully! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            }, 1000);
        });

        // Password Strength Indicator
        const passwordInput = document.getElementById('signupPassword');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const password = passwordInput.value;
                const strength = calculatePasswordStrength(password);

                updatePasswordStrength(strength);
            });
        }
    }
});

// Password Toggle Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Calculate Password Strength
function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/d/.test(password)) strength++;
    if (/[^a-zA-Zd]/.test(password)) strength++;

    return strength;
}

// Update Password Strength Visual
function updatePasswordStrength(strength) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!strengthFill || !strengthText) return;

    const widths = ['0%', '20%', '40%', '60%', '80%', '100%'];
    const colors = ['#f5576c', '#fa709a', '#ffa500', '#43e97b', '#43e97b', '#43e97b'];
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

    strengthFill.style.width = widths[strength];
    strengthFill.style.background = colors[strength];
    strengthText.textContent = texts[strength] || 'Password strength';
    strengthText.style.color = colors[strength];
}
