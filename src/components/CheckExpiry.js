const fs = require('fs');
const path = require('path');

// Read stored video files and expiry date
const getVideoExpiry = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'videoExpiry.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};

// Delete expired files
const deleteExpiredVideos = () => {
  const videoData = getVideoExpiry();
  if (videoData) {
    const currentDate = new Date();
    const expiryDate = new Date(videoData.expiryDate);
    
    if (currentDate >= expiryDate) {
      // Delete the files
      videoData.files.forEach((file) => {
        fs.unlinkSync(file);
      });
      // Remove expired data
      fs.unlinkSync(path.join(__dirname, 'videoExpiry.json'));
    }
  }
};

module.exports = { deleteExpiredVideos };
