const multer = require('multer');

// Memory storage to access buffer directly
const storage = multer.memoryStorage();

// File filter to accept only images/videos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type: ' + file.mimetype), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
