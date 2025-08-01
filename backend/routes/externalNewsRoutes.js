const express = require('express');
const { getExternalNews } = require('../controller/externalNewsController');
const router = express.Router();

router.get('/getExternalNews', getExternalNews);

module.exports = router;
