const multer = require('multer');
const path = require('path');

// Storage strategy: Memory storage is safer for direct Cloudinary uploads
// as it doesn't leave files on the server disk.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // 1. Validate MIME type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.');
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

module.exports = upload;
