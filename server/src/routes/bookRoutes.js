const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  updateStock
} = require('../controllers/bookController');

// Tüm rotalar herkese açık (kütüphane çalışanları için)
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.patch('/:id/stock', updateStock);

module.exports = router; 