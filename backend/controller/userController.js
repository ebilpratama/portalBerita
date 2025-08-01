const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hash]
    );
    res.status(200).json(result.rows[0]);
  } catch(error) {
    console.error("Error ketika melakukan register", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (!user.rows.length) return res.status(401).json({ error: 'User tidak ditemukan' });

    const valid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Password salah' });

    const token = jwt.sign({ id: user.rows[0].id, username }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ 
      message:"sukses",
      token:token 
    });
  } catch (error) {
    console.error("Error ketika melakukan login", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  
};
