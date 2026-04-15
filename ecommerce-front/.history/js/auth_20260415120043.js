// Append this to your js/auth.js

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        // Basic Validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        const userData = {
            fullName: name,
            email: email,
            password: password
        };

        console.log("Registering user:", userData);
        alert("Account created successfully! Redirecting to login...");
        
        // After success, you can redirect the user
        // window.location.href = "login.html";
    });
}