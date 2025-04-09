const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

let latestMatchResult = null;  // Store latest match result

// POST /upload-resume
app.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Valid PDF resume required' });
    }
    const data = await pdfParse(req.file.buffer);
    res.json({ success: true, text: data.text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process resume', details: error.message });
  }
});

// POST /job-description
app.post('/job-description', async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Valid job description required' });
    }
    
    // If we have a resume, calculate match immediately
    if (latestMatchResult && latestMatchResult.resume_text) {
      const response = await axios.post('http://localhost:5000/match', {
        resume_text: latestMatchResult.resume_text,
        job_description: description
      });
      latestMatchResult = {
        ...latestMatchResult,
        job_description: description,
        match_percentage: response.data.match_percentage
      };
    }
    
    res.json({ success: true, text: description });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process job description', details: error.message });
  }
});

// GET /results
app.get('/results', (req, res) => {
  if (!latestMatchResult || !latestMatchResult.match_percentage) {
    return res.status(404).json({ error: 'No match results available yet' });
  }
  res.json({
    success: true,
    match_percentage: latestMatchResult.match_percentage
  });
});

// New endpoint to trigger matching
app.post('/calculate-match', async (req, res) => {
  try {
    const { resume_text, job_description } = req.body;
    if (!resume_text || !job_description) {
      return res.status(400).json({ error: 'Both resume_text and job_description required' });
    }
    
    const response = await axios.post('http://localhost:5000/match', {
      resume_text,
      job_description
    });
    
    latestMatchResult = {
      resume_text,
      job_description,
      match_percentage: response.data.match_percentage
    };
    
    res.json({
      success: true,
      match_percentage: response.data.match_percentage
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate match', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});