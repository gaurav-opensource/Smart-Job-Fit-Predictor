const express = require('express');
const router = express.Router();
const upload = require('../server'); // Import multer instance from server.js
const { uploadResume, processJobDescription } = require('../controllers/apiController'); // Adjust path if needed

// POST /upload-resume
router.post('/upload-resume', upload, uploadResume);

// POST /job-description
router.post('/job-description', processJobDescription);

module.exports = router;