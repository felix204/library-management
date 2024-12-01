const Book = require("../models/bookModel");

// Tüm kitapları getir
const getAllBooks = async (req, res) => {
  try {
    const { category, author, year, sort, search } = req.query;
    let query = {};

    // Arama
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filtreleme
    if (category) query.category = category;
    if (author) query.author = { $regex: author, $options: "i" };
    if (year) query.publishYear = year;

    let books = Book.find(query);

    // Sıralama
    if (sort) {
      const sortOrder = sort.startsWith("-") ? -1 : 1;
      const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
      books = books.sort({ [sortField]: sortOrder });
    }

    // Sayfalama
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    books = books.skip(skip).limit(limit);

    const result = await books;
    const total = await Book.countDocuments(query);

    res.json({
      success: true,
      data: result,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kitaplar getirilirken bir hata oluştu",
      error: error.message,
    });
  }
};

// Tek kitap getir
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Kitap bulunamadı",
      });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kitap getirilirken bir hata oluştu",
      error: error.message,
    });
  }
};

// Yeni kitap ekle
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Kitap başarıyla eklendi",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kitap eklenirken bir hata oluştu",
      error: error.message,
    });
  }
};

// Kitap güncelle
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Kitap bulunamadı",
      });
    }

    res.json({
      success: true,
      message: "Kitap başarıyla güncellendi",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kitap güncellenirken bir hata oluştu",
      error: error.message,
    });
  }
};

// Kitap sil
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Kitap bulunamadı",
      });
    }

    await book.deleteOne();

    res.json({
      success: true,
      message: "Kitap başarıyla silindi",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kitap silinirken bir hata oluştu",
      error: error.message,
    });
  }
};

// Stok güncelleme
const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (typeof stock !== "number" || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Geçersiz stok değeri",
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Kitap bulunamadı",
      });
    }

    book.stock = stock;
    await book.save();

    res.json({
      success: true,
      message: "Stok başarıyla güncellendi",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Stok güncellenirken bir hata oluştu",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  updateStock,
};
