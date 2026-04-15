// js/auth.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (!email || !password) {
                alert("Please fill in all fields");
                return;
            }

            console.log("Login attempt for:", email);
            alert("Logging in... Please wait.");
            
            // Your future fetch() call to Node.js backend goes here
        });
    }
});