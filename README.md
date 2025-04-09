# Smart Job Fit Predictor

A full-stack application that matches resumes with job descriptions using machine learning. Upload a resume (PDF), input a job description, and get a match percentage based on text similarity—perfect for job seekers and recruiters!

## Features
- **Resume Upload**: Upload PDF resumes and extract text automatically.
- **Job Description Input**: Enter job descriptions via a user-friendly interface.
- **Match Scoring**: Calculates a match percentage using TF-IDF and cosine similarity.
- **Responsive UI**: Built with React for a seamless experience.

## Tech Stack
- **Frontend**: React (with `react-router-dom` for navigation)
- **Backend**: 
  - Node.js (Express, Multer for file handling)
  - Flask (scikit-learn, NLTK for ML processing)
- **APIs**: RESTful endpoints for resume upload, job description submission, and match calculation
- **Ports**: 
  - Frontend: `http://localhost:6000`
  - Node.js Backend: `http://localhost:3000`
  - Flask Backend: `http://localhost:5050`
