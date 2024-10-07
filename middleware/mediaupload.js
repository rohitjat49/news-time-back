const multer = require('multer');

// Define storage for uploaded photos
const storage = multer.diskStorage({});

// Initialize multer with storage options
const upload = multer({ storage: storage }).single('file'); // 'product' is the field name, and 10 is the max count of files

// Add logging middleware to inspect incoming requests

module.exports = upload;
