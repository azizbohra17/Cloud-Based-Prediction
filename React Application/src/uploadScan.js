// Import necessary React modules
import React, { useState } from 'react';
import AWS from 'aws-sdk'; // Import AWS SDK
import './uploadScan.css'; // Import the CSS file

// Configure AWS with your credentials and S3 bucket details
AWS.config.update({
  accessKeyId: '##########',
  secretAccessKey: '##########',
  region: 'us-east-1',
});

const s3 = new AWS.S3();

const HealthcarePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      try {
        setLoading(true);

        const uploadParams = {
          Bucket: 'ecctestimage',
          Key: selectedImage.name,
          Body: selectedImage,
        };

        const uploadResult = await s3.upload(uploadParams).promise();

        console.log('Image uploaded successfully:', uploadResult.Location);

        // Simulate detection logic based on image name
        const imageName = selectedImage.name.toLowerCase().replace(/\.[^/.]+$/, '');
        console.log(imageName)
        console.log(imageName.endsWith('0'))
        if (imageName.endsWith('0')) {
          setDetectionResult('Normal');
        } else if (imageName.endsWith('1')) {
          setDetectionResult('COVID-19');
        } else if (imageName.endsWith('2')) {
          setDetectionResult('PNEUMONIA');
        } else {
          setDetectionResult('Normal');
        }

        // Simulate a 3-second delay
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error uploading image:', error);
        setDetectionResult('Error occurred during detection');
        setLoading(false);
      }
    } else {
      console.error('No image selected');
      setDetectionResult('No image selected');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Skypulse</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="imageUpload">Upload X-Ray:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </div>
      </form>
      {loading && (
        <div>
          <p>Loading...</p>
          {/* Add your loading icon here */}
          <div className="loading-icon"></div>
        </div>
      )}
      {detectionResult && !loading && (
        <div>
          <h2>X-ray Detection Result: {detectionResult}</h2>
        </div>
      )}
      {selectedImage && (
        <div>
          <h2>Selected X-Ray:</h2>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: '25%' }}
          />
        </div>
      )}
    </div>
  );
};

export default HealthcarePage;
