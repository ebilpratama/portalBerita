const { query } = require('../db');

exports.createArticle = async (req, res) => {
  const { title, slug, content, image_url, category_id, status, publication_date } = req.body;
  const author_id = req.user.id; 

  try {
    const result = await query(
      `INSERT INTO articles (title, slug, content, image_url, category_id, status, publication_date, author_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, slug, content, image_url, category_id, status, publication_date, author_id]
    );
    res.status(201).json(result.rows[0]);
  } catch(error) {
    console.error("Error ketika membuat artikel:", error);
    res.status(500).json({ error: 'Gagal membuat artikel' });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const result = await query(
      `SELECT a.*, u.username AS author, c.name AS category
       FROM articles a
       JOIN users u ON a.author_id = u.id
       JOIN categories c ON a.category_id = c.id
       WHERE a.status = 'published'
       ORDER BY a.publication_date DESC`
    );
    res.status(200).json({
      message:"sukses", 
      data: result.rows
    });
  } catch (error) {
    console.error("Error ketika memuat berita:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const articleResult = await query(
      `SELECT a.*, u.username AS author, c.name AS category 
       FROM articles a
       JOIN users u ON a.author_id = u.id
       JOIN categories c ON a.category_id = c.id
       WHERE a.slug = $1`,
      [slug]
    );

    if (articleResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artikel tidak ditemukan' });
    }

    res.status(200).json(articleResult.rows[0]);
  } catch (error) {
    console.error("Error ketika memuat detail artikel:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getMyArticles = async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM articles WHERE author_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error ketika memuat berita saya:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};