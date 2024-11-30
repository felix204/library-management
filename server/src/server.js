const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const app = express();
const cookieParser = require('cookie-parser');

// .env dosya yükle 
dotenv.config();

// CORS ayarları
app.use(cors({
    origin: 'http://localhost:3000', // Next.js uygulamanızın adresi
    credentials: true, // Cookie/token aktarımı için gerekli
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));



