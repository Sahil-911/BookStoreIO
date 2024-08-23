const express = require('express');
const router = express.Router();
const { uploadData } = require('../controllers/uploadDataController');

router.post('/upload', uploadData);

module.exports = router;