// js/auth.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. منطق تسجيل الدخول
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("loginEmail").value;
            const pass = document.getElementById("loginPassword").value;

            // التحقق المبدئي (Validation)
            if (pass.length < 6) {
                alert("كلمة المرور يجب أن تكون أكثر من 6 أحرف");
                return;
            }

            console.log("جاري تسجيل الدخول بـ:", email);
            // هنا سيتم عمل fetch للباك إند لاحقاً
            alert("تم إرسال البيانات للسيرفر (قيد التنفيذ)");
        });
    }

    // 2. منطق إنشاء حساب
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("regName").value;
            const email = document.getElementById("regEmail").value;
            const pass = document.getElementById("regPassword").value;

            // كائن البيانات لإرساله للباك إند
            const userData = {
                fullName: name,
                email: email,
                password: pass
            };

            console.log("بيانات المستخدم الجديد:", userData);
            alert("أهلاً بك يا " + name + "، تم إنشاء الحساب بنجاح (محلياً)");
            
            // تحويل المستخدم لصفحة الدخول بعد التسجيل
            // window.location.href = "login.html";
        });
    }
});