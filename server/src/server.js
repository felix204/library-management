const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const app = express();

// .env dosya yükle 

dotenv.config();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));


