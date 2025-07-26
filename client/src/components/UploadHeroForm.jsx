
import React, { useState } from 'react';

const UploadHeroForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    story: '',
    images: [],
    videos: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('הבקשה נשלחה. זהו טופס דמה - צריך שרת או טיפול מקומי אמיתי.');
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>📤 העלה סיפור גיבור</button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div>
            <label>שם הגיבור:</label>
            <input type="text" name="name" required onChange={handleChange} />
          </div>
          <div>
            <label>סיפור:</label>
            <textarea name="story" required onChange={handleChange} />
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
      )}
    </div>
  );
};

export default UploadHeroForm;
