const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Kitap başlığı zorunludur']
  },
  author: {
    type: String,
    required: [true, 'Yazar adı zorunludur']
  },
  category: {
    type: String,
    required: [true, 'Kategori zorunludur'],
    enum: ['Roman', 'Tarih', 'Bilim', 'Felsefe', 'Sanat', 'Diğer']
  },
  description: {
    type: String,
    required: [true, 'Kitap açıklaması zorunludur']
  },
  publishYear: {
    type: Number,
    required: [true, 'Yayın yılı zorunludur']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    required: [true, 'Stok bilgisi zorunludur'],
    min: [0, 'Stok sayısı negatif olamaz'],
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);