
import React, { useState } from 'react';
import './UploadHeroModal.css';

const UploadHeroModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    story: '',
    images: [],
    videos: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('הטופס נשלח (דמה - יש לממש צד שרת בעתיד)');
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{ marginLeft: '10px' }}>
        📤 Upload
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <h2>העלה סיפור גיבור</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>שם הגיבור:</label>
                <input type="text" name="name" required onChange={handleChange} />
              </div>
              <div>
                <label>הסיפור:</label>
                <textarea name="story" required onChange={handleChange}></textarea>
              </div>
              <div>
                <label>תמונות:</label>
                <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />
              </div>
              <div>
                <label>סרטונים:</label>
                <input type="file" name="videos" accept="video/*" multiple onChange={handleChange} />
              </div>
              <button type="submit" style={{ marginTop: '10px' }}>שלח</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadHeroModal;
