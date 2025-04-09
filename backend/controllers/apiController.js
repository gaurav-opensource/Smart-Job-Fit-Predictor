const pdfParse = require('pdf-parse');

async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'File must be a PDF' });
    }

    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);

    res.json({
      success: true,
      text: data.text
    });
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({
      error: 'Failed to process resume',
      details: error.message
    });
  }
}

function processJobDescription(req, res) {
  try {
    const { description } = req.body;

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Job description is required and must be a string' });
    }

    res.json({
      success: true,
      text: description
    });
  } catch (error) {
    console.error('Error processing job description:', error);
    res.status(500).json({
      error: 'Failed to process job description',
      details: error.message
    });
  }
}

module.exports = { uploadResume, processJobDescription };