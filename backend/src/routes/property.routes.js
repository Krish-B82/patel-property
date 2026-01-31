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
    updateProperty,
    deleteProperty,
    uploadImages,
    deleteImage
} = require('../controllers/propertyController');

// PUBLIC ROUTES (No authentication required - anyone can access)
// These are for regular users browsing the website
router.get('/', getAllProperties);           // Get all properties with filters
router.get('/:id', getPropertyById);         // Get single property details

// PROTECTED ROUTES (Authentication required - admin only)
// These require JWT token in Authorization header
router.post('/', authMiddleware, createProperty);        // Create new property
router.put('/:id', authMiddleware, updateProperty);      // Update property
router.delete('/:id', authMiddleware, deleteProperty);   // Delete property

// IMAGE ROUTES (Admin only)
router.post('/:id/images', authMiddleware, upload.array('images', 6), uploadImages);   // Upload images
router.delete('/:id/images/:imageIndex', authMiddleware, deleteImage);                  // Delete single image

module.exports = router;