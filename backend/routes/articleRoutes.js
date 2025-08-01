const express = require('express');
const { 
  createArticle, 
  getAllArticles, 
  getMyArticles, 
  getArticleBySlug 
} = require('../controller/articleController');
const auth = require('../middleware/auth');
const router = express.Router();

// Route untuk membuat artikel (POST /api/articles)
router.post('/articles', auth, createArticle);

// Route untuk mendapatkan semua artikel (GET /api/articles)
router.get('/articles', getAllArticles);

// Route untuk mendapatkan detail artikel berdasarkan slug (GET /api/articles/slug-berita)
router.get('/articles/:slug', getArticleBySlug);

// Route untuk mendapatkan artikel milik user yang login (GET /api/me)
router.get('/me', auth, getMyArticles);

module.exports = router;