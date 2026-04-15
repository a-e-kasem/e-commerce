const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// تحميل الإعدادات من ملف .env
dotenv.config();

// الاتصال بالداتابيز
connectDB();

const app = express();

// Middleware عشان السيرفر يفهم الـ JSON ويسمح بالـ CORS
app.use(express.json());
app.use(cors());

// نقطة اختبار بسيطة
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));