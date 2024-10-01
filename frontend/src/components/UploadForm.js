import React, { useState } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';

const UploadForm = ({ setEvents }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Only PDF files are allowed. Please select a valid PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a valid PDF file.');
      return;
    }

    setLoading(true);
    setProgress(0);
    setSuccess(false);
    setError('');
    const formData = new FormData();
    formData.append('syllabus', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      if (response.data.events) {
        setEvents(response.data.events);
        setSuccess(true);
      } else {
        setError('No events found in the uploaded file.');
      }
    } catch (error) {
      setError('Failed to upload the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success && <Confetti recycle={false} numberOfPieces={400} />}
      <form onSubmit={handleSubmit} className="upload-form text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control mb-3 upload-input"
          accept="application/pdf"
        />
        {file && (
          <p className="file-name">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <div className="progress-bar">
            Uploading: {progress}%
          </div>
        ) : (
          <button type="submit" className="btn btn-primary upload-button">
            Upload Syllabus
          </button>
        )}
      </form>
    </>
  );
};

export default UploadForm;
