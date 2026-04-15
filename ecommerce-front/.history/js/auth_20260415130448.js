// js/auth.js

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => { 
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account created successfully! ✅");
                window.location.href = "login.html"; 
            } else {
                
                alert(data.message || "Registration failed ❌");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server is not responding. Make sure Backend is running!");
        }
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                window.location.href = "index.html"; 
                document.getElementById("loginEmail").value = "";
                document.getElementById("loginPassword").value = "";
                
            } else {
                alert(data.message || "Invalid Credentials");
            }
        } catch (error) {
            alert("Error connecting to server");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const navAuth = document.getElementById("nav-auth");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // داخل دالة DOMContentLoaded في js/auth.js
if (userInfo && userInfo.name) {
    navAuth.innerHTML = `
        <input type="text" placeholder="Search Product...">
        <span class="user-name">Hi, ${userInfo.name.split(' ')[0]}</span>
        <button onclick="logout()" class="logout-btn">Logout</button>
    `;
}
});

function logout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
}