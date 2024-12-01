const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// .env dosyasını yükle 
dotenv.config();

// CORS ayarları
app.use(cors({
    origin: 'http://localhost:3000', // Next.js uygulamanızın adresi
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/bookRoutes'));

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));



