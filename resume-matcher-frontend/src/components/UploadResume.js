import React, { useState } from 'react';
import axios from 'axios';

function UploadResume({ onResumeUploaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const response = await axios.post('http://localhost:4000/upload-resume', formData);
      onResumeUploaded(response.data.text);
      alert('Resume uploaded successfully');
    } catch (error) {
      alert('Failed to upload resume: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h3>Upload Resume</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {file && <p>Selected: {file.name}</p>}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  );
}

export default UploadResume;