// Simple login logic for demonstration
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Replace with real authentication logic
        if (username === 'admin' && password === '123') {
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid login credentials!');
        }
    });
}
