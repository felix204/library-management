const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb+srv://admin123:2Ic7GBV1h6IGYOHS@library.o9xev.mongodb.net/?retryWrites=true&w=majority&appName=library';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB\'ye başarıyla bağlanıldı!');
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  }
};

// Fonksiyonu çalıştırmak yerine export ediyoruz
module.exports = connectDB;
