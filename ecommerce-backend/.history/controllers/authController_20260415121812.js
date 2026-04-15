const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. التحقق من وجود المستخدم
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
        }

        // 2. إنشاء المستخدم (التشفير هيحصل لوحده في الموديل)
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'تم التسجيل بنجاح ✅'
            });
        } else {
            res.status(400).json({ message: 'بيانات غير صحيحة' });
        }
    } catch (error) {
        res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
    }
};

module.exports = { registerUser };