const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
    origin : '*', 
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors());
app.use(express.json());

const articleRoutes = require('./routes/articleRoutes')

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/articles', articleRoutes);
app.use('/api/external-news', require('./routes/externalNewsRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
