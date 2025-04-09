import React, { useState } from 'react';
import axios from 'axios';

function JobDescriptionInput({ resumeText, onMatchCalculated }) {
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('Please enter a job description');
      return;
    }
    if (!resumeText) {
      alert('Please upload a resume first');
      return;
    }
    setSubmitting(true);
    try {
      // Send job description
      await axios.post('http://localhost:4000/job-description', { description });
      // Calculate match
      const matchResponse = await axios.post('http://localhost:4000/calculate-match', {
        resume_text: resumeText,
        job_description: description,
      });
      onMatchCalculated(matchResponse.data.match_percentage);
      alert('Match calculated successfully');
    } catch (error) {
      alert('Failed to process: ' + (error.response?.data?.error || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Job Description</h3>
      <textarea
        rows="5"
        cols="50"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter job description here..."
      />
      <br />
      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Processing...' : 'Calculate Match'}
      </button>
    </div>
  );
}

export default JobDescriptionInput;