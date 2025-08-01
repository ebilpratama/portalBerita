const axios = require('axios');

exports.getExternalNews = async (req, res) => {
   const { topic, section, limit, country, lang } = req.query;

   if (!topic || !section) {
    return res.status(400).json({
      error: 'Parameter "topic" dan "section" wajib diisi.'
    });
  }

  const params = {
    topic,
    section,
  };

  if (limit) params.limit = limit;
  if (country) params.country = country;
  if (lang) params.lang = lang;

  const options = {
    method: 'GET',
    url: 'https://letscrape-8889a.p.rapidapi.com/api/topic-news-by-section',
    params, 
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error saat mengambil berita eksternal:', error.response ? error.response.data : error.message);
    res.status(500).json({
      error: 'Gagal mengambil berita dari sumber eksternal'
    });
  }
};