const multer = require('multer');
const path = require('path');

// Store files in memory (not on disk)
const storage = multer.memoryStorage();

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExtensions.test(file.mimetype.split('/')[1]);

  if (extname && mimetype) {
    cb(null, true); // Allow file
  } else {
    cb(new Error('Only images allowed (jpg, png, webp)'), false); // Block file
  }
};

// Multer config
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per image
    files: 6                    // Max 6 images
  },
  fileFilter: fileFilter
});

module.exports = upload;