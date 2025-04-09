import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadResume from './components/UploadResume';
import JobDescriptionInput from './components/JobDescriptionInput';
import './App.css';

function Matcher() {
  const [resumeText, setResumeText] = useState('');
  const [matchPercentage, setMatchPercentage] = useState(null);

  const handleResumeUploaded = (text) => setResumeText(text);
  const handleMatchCalculated = (percentage) => setMatchPercentage(percentage);

  return (
    <div>
      <h1>Resume Matcher</h1>
      <UploadResume onResumeUploaded={handleResumeUploaded} />
      <JobDescriptionInput
        resumeText={resumeText}
        onMatchCalculated={handleMatchCalculated}
      />
      {matchPercentage !== null && (
        <div>
          <h3>Match Result</h3>
          <p>Match Score: {matchPercentage.toFixed(2)}%</p>
          <p>Feedback: Basic match calculated</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matcher" element={<Matcher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;