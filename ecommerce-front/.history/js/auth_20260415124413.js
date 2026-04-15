// js/auth.js

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => { // أضفنا async هنا
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
                window.location.href = "login.html"; // تحويل لصفحة الدخول
            } else {
                // لو السيرفر رد بخطأ (مثلاً الإيميل موجود قبل كدة)
                alert(data.message || "Registration failed ❌");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server is not responding. Make sure Backend is running!");
        }
    });
}

// js/auth.js (Register Part)

if (response.ok) {
    // 1. استخراج بيانات المستخدم من رد السيرفر
    const userData = await response.json();

    // 2. حفظ بيانات المستخدم في الـ LocalStorage (عشان الموقع يفضل عارف إنه مسجل)
    localStorage.setItem("userInfo", JSON.stringify(userData));

    // 3. تنبيه بسيط بالنجاح
    alert(`Welcome, ${userData.name}! Registration successful.`);

    // 4. النقل لصفحة الهوم (index.html)
    // ملاحظة: تأكد من المسار حسب هيكل الملفات عندك
    window.location.href = "../index.html"; 
}