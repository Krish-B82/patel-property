const prisma = require('../config/database');
const cloudinary = require('../config/cloudinary');

// Create new property (Admin only)
const createProperty = async (req, res) => {
  try {
    const {
      code,
      title,
      description,
      min_price,
      max_price,
      city,
      location,
      bedrooms,
      bathrooms,
      area_sqft,
      property_type,
      instagram_video_url,
      status
    } = req.body;

    // Validation - code is now required
    if (!code || !title || !min_price || !max_price || !location || !property_type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: code, title, min_price, max_price, location, property_type'
      });
    }

    // Check if code already exists
    const existingCode = await prisma.property.findUnique({
      where: { code: code }
    });

    if (existingCode) {
      return res.status(400).json({
        success: false,
        message: `Property code "${code}" already exists. Please use a unique code.`
      });
    }

    // Validate price range
    if (parseInt(min_price) > parseInt(max_price)) {
      return res.status(400).json({
        success: false,
        message: 'min_price cannot be greater than max_price'
      });
    }

    // Validate property_type
    const validTypes = ['apartment', 'villa', 'house', 'plot', 'office'];
    if (!validTypes.includes(property_type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid property_type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    // For plot and office, bedrooms/bathrooms are not required
    // For others, bedrooms is required
    if (!['plot', 'office'].includes(property_type) && !bedrooms) {
      return res.status(400).json({
        success: false,
        message: 'Bedrooms is required for apartment, villa, and house types'
      });
    }

    // Create property
    const property = await prisma.property.create({
      data: {
        code,
        title,
        description: description || null,
        min_price: parseInt(min_price),
        max_price: parseInt(max_price),
        city: city || 'Vadodara',
        location,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area_sqft: area_sqft ? parseInt(area_sqft) : null,
        property_type,
        instagram_video_url: instagram_video_url || null,
        status: status || 'available',
        images: []
      }
    });

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: property
    });

  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
  }
};

// Get all properties with filters and pagination
const getAllProperties = async (req, res) => {
  try {
    // Build filter object
    let filter = {};

    // Code filter (for searching by property code)
    if (req.query.code) {
      filter.code = {
        contains: req.query.code,
        mode: 'insensitive'
      };
    }

    // City filter
    if (req.query.city) {
      filter.city = {
        contains: req.query.city,
        mode: 'insensitive'
      };
    }

    // Location filter
    if (req.query.location) {
      filter.location = {
        contains: req.query.location,
        mode: 'insensitive'
      };
    }

    // Bedrooms filter
    if (req.query.bedrooms) {
      filter.bedrooms = parseInt(req.query.bedrooms);
    }

    // Bathrooms filter
    if (req.query.bathrooms) {
      filter.bathrooms = parseInt(req.query.bathrooms);
    }

    // Property type filter
    if (req.query.type) {
      filter.property_type = req.query.type;
    }

    // Price range filter
    if (req.query.minPrice) {
      filter.min_price = {
        gte: parseInt(req.query.minPrice)
      };
    }

    if (req.query.maxPrice) {
      filter.max_price = {
        lte: parseInt(req.query.maxPrice)
      };
    }

    // Status filter (default: only show available)
    if (req.query.status) {
      filter.status = req.query.status;
    } else {
      filter.status = 'available';
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalProperties = await prisma.property.count({
      where: filter
    });

    // Get properties
    const properties = await prisma.property.findMany({
      where: filter,
      skip: skip,
      take: limit,
      orderBy: {
        created_at: 'desc'
      }
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalProperties / limit);

    res.json({
      success: true,
      page: page,
      limit: limit,
      totalProperties: totalProperties,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      properties: properties
    });

  } catch (error) {
    console.error('Get all properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id: id }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      property: property
    });

  } catch (error) {
    console.error('Get property by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
  }
};

// Get property by code (useful for WhatsApp messages)
const getPropertyByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const property = await prisma.property.findUnique({
      where: { code: code }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property with code "${code}" not found`
      });
    }

    res.json({
      success: true,
      property: property
    });

  } catch (error) {
    console.error('Get property by code error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
  }
};

// Update property (Admin only)
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      title,
      description,
      min_price,
      max_price,
      city,
      location,
      bedrooms,
      bathrooms,
      area_sqft,
      property_type,
      instagram_video_url,
      status
    } = req.body;

    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: id }
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // If updating code, check if new code already exists
    if (code && code !== existingProperty.code) {
      const codeExists = await prisma.property.findUnique({
        where: { code: code }
      });

      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: `Property code "${code}" already exists. Please use a unique code.`
        });
      }
    }

    // Validate price range if both are provided
    if (min_price && max_price && parseInt(min_price) > parseInt(max_price)) {
      return res.status(400).json({
        success: false,
        message: 'min_price cannot be greater than max_price'
      });
    }

    // Build update data object (only update fields that are provided)
    const updateData = {};
    if (code) updateData.code = code;
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (min_price) updateData.min_price = parseInt(min_price);
    if (max_price) updateData.max_price = parseInt(max_price);
    if (city) updateData.city = city;
    if (location) updateData.location = location;
    if (bedrooms !== undefined) updateData.bedrooms = bedrooms ? parseInt(bedrooms) : null;
    if (bathrooms !== undefined) updateData.bathrooms = bathrooms ? parseInt(bathrooms) : null;
    if (area_sqft !== undefined) updateData.area_sqft = area_sqft ? parseInt(area_sqft) : null;
    if (property_type) updateData.property_type = property_type;
    if (instagram_video_url !== undefined) updateData.instagram_video_url = instagram_video_url;
    if (status) updateData.status = status;

    // Update property
    const updatedProperty = await prisma.property.update({
      where: { id: id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Property updated successfully',
      property: updatedProperty
    });

  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
  }
};

// Delete property (Admin only)
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: id }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Delete property
    await prisma.property.delete({
      where: { id: id }
    });

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });

  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message
    });
  }
};

// Upload images to property (Admin only)
const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: id }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if files uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    // Check total images limit (max 6)
    const totalImages = property.images.length + req.files.length;
    if (totalImages > 6) {
      return res.status(400).json({
        success: false,
        message: `Too many images. Current: ${property.images.length}, uploading: ${req.files.length}, max allowed: 6`
      });
    }

    // Upload each image to Cloudinary
    const uploadedUrls = [];
    for (const file of req.files) {
      const base64 = file.buffer.toString('base64');
      const dataURI = `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'patel-property',
        quality: 'auto',
        fetch_format: 'auto'
      });

      uploadedUrls.push(result.secure_url);
    }

    // Add new URLs to existing images array
    const updatedImages = [...property.images, ...uploadedUrls];

    // Update property with new images
    const updatedProperty = await prisma.property.update({
      where: { id: id },
      data: { images: updatedImages }
    });

    res.json({
      success: true,
      message: `${uploadedUrls.length} image(s) uploaded successfully`,
      images: updatedProperty.images,
      totalImages: updatedProperty.images.length
    });

  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading images',
      error: error.message
    });
  }
};

// Delete single image from property (Admin only)
const deleteImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: id }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const index = parseInt(imageIndex);

    // Check if index is valid
    if (index < 0 || index >= property.images.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image index'
      });
    }

    // Get image URL to delete
    const imageUrl = property.images[index];

    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/public_id.ext
    const parts = imageUrl.split('/');
    const publicIdWithExt = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${publicIdWithExt.split('.')[0]}`;

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove from array
    const updatedImages = property.images.filter((_, i) => i !== index);

    // Update property
    const updatedProperty = await prisma.property.update({
      where: { id: id },
      data: { images: updatedImages }
    });

    res.json({
      success: true,
      message: 'Image deleted successfully',
      images: updatedProperty.images,
      totalImages: updatedProperty.images.length
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};

// Export all functions
module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getPropertyByCode,
  updateProperty,
  deleteProperty,
  uploadImages,
  deleteImage
};