const express = require('express');
const router = express.Router();

// Import middleware
const authMiddleware = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Import controller functions
const {
    createProperty,
    getAllProperties,
    getPropertyById,
    getPropertyByCode,
    updateProperty,
    deleteProperty,
    uploadImages,
    deleteImage,
    getPopularAreas  // 🆕 IMPORT THIS
} = require('../controllers/propertyController');

// PUBLIC ROUTES (No authentication required - anyone can access)
// We use optionalAuthMiddleware so that IF an admin is making the request,
// we can detect it and send their secret fields back to them securely.
router.get('/', optionalAuthMiddleware, getAllProperties);           
router.get('/popular-areas', getPopularAreas);  // 🆕 ADD THIS LINE
router.get('/:id', optionalAuthMiddleware, getPropertyById);         
router.get('/code/:code', optionalAuthMiddleware, getPropertyByCode);

// PROTECTED ROUTES (Authentication required - admin only)
router.post('/', authMiddleware, createProperty);        
router.put('/:id', authMiddleware, updateProperty);      
router.delete('/:id', authMiddleware, deleteProperty);   

// IMAGE ROUTES (Admin only)
router.post('/:id/images', authMiddleware, upload.array('images', 6), uploadImages);
router.delete('/:id/images/:imageIndex', authMiddleware, deleteImage);

module.exports = router;