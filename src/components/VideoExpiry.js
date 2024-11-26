import React, { useState, useEffect } from 'react';

const VideoExpiry = () => {
  const [files, setFiles] = useState([]);
  const [expiryDate, setExpiryDate] = useState(null);
  const [error, setError] = useState('');
  const [electronApiAvailable, setElectronApiAvailable] = useState(false);

  useEffect(() => {
    // Check if the electron API is available
    if (window.electron) {
      setElectronApiAvailable(true);
    } else {
      console.error("Electron API is not available");
    }
  }, []);

  // Validate that at least one file is selected
  const validateFiles = (selectedFiles) => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one video file');
      return false;
    }
    return true;
  };

  const handleFileSelect = async () => {
    if (!electronApiAvailable) {
      console.error("Electron API is not available.");
      return;
    }
    
    try {
      const selectedFiles = await window.electron.openFileDialog();
      if (selectedFiles && validateFiles(selectedFiles)) {
        setFiles(selectedFiles);
      }
    } catch (err) {
      console.error('Error opening file dialog', err);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setExpiryDate(selectedDate);
  };

  const validateAndSave = () => {
    if (!expiryDate) {
      setError('Expiry date is required');
      return;
    }
    // Save the files and expiry date
    localStorage.setItem('videoFiles', JSON.stringify({ files, expiryDate }));
    alert('Files and expiry date saved!');
  };

  return (
    <div>
      <h3>Set Expiry Date for Video Files</h3>
      <button onClick={handleFileSelect}>Select Videos</button>
      {files.length > 0 && (
        <div>
          <h4>Selected Files</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
      <input
        type="date"
        onChange={handleDateChange}
        min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
      />
      <button onClick={validateAndSave}>Save</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default VideoExpiry;
