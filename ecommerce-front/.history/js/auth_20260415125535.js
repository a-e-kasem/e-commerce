// js/auth.js

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => { 
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        try {
            // إرسال البيانات للسيرفر (Node.js)
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

// js/auth.js (Login Part)
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
                email = "";
                password = "";
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

    if (userInfo && userInfo.name) {
        // لو المستخدم مسجل دخول، هنعرض اسمه وزرار Logout
        navAuth.innerHTML = `
            <span>🔍</span>
            <input type="text" placeholder="Search Product...">
            <span style="color: #ff4757; font-weight: bold; margin-left: 10px;">
                Hi, ${userInfo.name.split(' ')[0]} 
            </span>
            <button onclick="logout()" style="background:none; border:none; color:gray; cursor:pointer; font-size:12px; margin-left:5px;">(Logout)</button>
        `;
    }
});

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem("userInfo");
    window.location.reload(); // ريفرش للصفحة عشان ترجع لوضعها الأصلي
}