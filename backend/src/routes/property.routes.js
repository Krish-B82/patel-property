const express = require('express');
const router = express.Router();

// Import middleware
const authMiddleware = require('../middleware/authMiddleware');
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
router.get('/', getAllProperties);           
router.get('/popular-areas', getPopularAreas);  // 🆕 ADD THIS LINE
router.get('/:id', getPropertyById);         
router.get('/code/:code', getPropertyByCode);

// PROTECTED ROUTES (Authentication required - admin only)
router.post('/', authMiddleware, createProperty);        
router.put('/:id', authMiddleware, updateProperty);      
router.delete('/:id', authMiddleware, deleteProperty);   

// IMAGE ROUTES (Admin only)
router.post('/:id/images', authMiddleware, upload.array('images', 6), uploadImages);
router.delete('/:id/images/:imageIndex', authMiddleware, deleteImage);

module.exports = router;