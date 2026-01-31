const prisma = require('../config/database');

// Create new property (Admin only)
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      min_price,
      max_price,
      location,
      bedrooms,
      bathrooms,
      area_sqft,
      property_type,
      status
    } = req.body;

    // Validation
    if (!title || !min_price || !max_price || !location || !bedrooms || !property_type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, min_price, max_price, location, bedrooms, property_type'
      });
    }

    // Validate price range
    if (parseInt(min_price) > parseInt(max_price)) {
      return res.status(400).json({
        success: false,
        message: 'min_price cannot be greater than max_price'
      });
    }

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description: description || null,
        min_price: parseInt(min_price),
        max_price: parseInt(max_price),
        location,
        bedrooms: parseInt(bedrooms),
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area_sqft: area_sqft ? parseInt(area_sqft) : null,
        property_type,
        status: status || 'available',
        images: [] // Empty array for now, will add images in Day 5
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

    // Location filter
    if (req.query.location) {
      filter.location = {
        contains: req.query.location,
        mode: 'insensitive' // Case-insensitive search
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
      filter.status = 'available'; // By default, only show available properties
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
        created_at: 'desc' // Newest first
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

// Update property (Admin only)
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      min_price,
      max_price,
      location,
      bedrooms,
      bathrooms,
      area_sqft,
      property_type,
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

    // Validate price range if both are provided
    if (min_price && max_price && parseInt(min_price) > parseInt(max_price)) {
      return res.status(400).json({
        success: false,
        message: 'min_price cannot be greater than max_price'
      });
    }

    // Build update data object (only update fields that are provided)
    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (min_price) updateData.min_price = parseInt(min_price);
    if (max_price) updateData.max_price = parseInt(max_price);
    if (location) updateData.location = location;
    if (bedrooms) updateData.bedrooms = parseInt(bedrooms);
    if (bathrooms !== undefined) updateData.bathrooms = bathrooms ? parseInt(bathrooms) : null;
    if (area_sqft !== undefined) updateData.area_sqft = area_sqft ? parseInt(area_sqft) : null;
    if (property_type) updateData.property_type = property_type;
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

// Export all functions
module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};