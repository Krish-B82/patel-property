import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosWithFallback } from '../../services/apiClient';
import { Upload, X, MapPin } from 'lucide-react';

const PROPERTY_TYPES = ['apartment', 'villa', 'house', 'plot', 'office'];
const STATUS_OPTIONS = ['available', 'sold'];

const PropertyForm = ({ initialData, isEditing }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        code: '',
        title: '',
        description: '',
        property_type: 'apartment',
        location: '',
        city: 'Vadodara',
        min_price: '',
        max_price: '',
        area_sqft: '',
        bedrooms: '',
        bathrooms: '',
        status: 'available',
        instagram_video_url: '',
    });

    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                code: initialData.code || '',
                title: initialData.title || '',
                description: initialData.description || '',
                property_type: initialData.property_type || 'apartment',
                location: initialData.location || '',
                city: initialData.city || 'Vadodara',
                min_price: initialData.min_price || '',
                max_price: initialData.max_price || '',
                area_sqft: initialData.area_sqft || '',
                bedrooms: initialData.bedrooms || '',
                bathrooms: initialData.bathrooms || '',
                status: initialData.status || 'available',
                instagram_video_url: initialData.instagram_video_url || '',
            });
            if (initialData.images) {
                setExistingImages(initialData.images);
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Check total limit (4 images max)
        if (existingImages.length + images.length + files.length > 4) {
            alert('You can only upload a maximum of 4 images per property.');
            return;
        }
        setImages(prev => [...prev, ...files]);
    };

    const removeNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const deleteExistingImage = async (imageIndex) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axiosWithFallback('delete', `/properties/${initialData.id}/images/${imageIndex}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state to remove the image
            setExistingImages(prev => prev.filter((_, i) => i !== imageIndex));
        } catch (err) {
            console.error('Error deleting image:', err);
            const errorMsg = err.response?.data?.message || err.message || 'Unknown network error';
            alert(`Failed to delete image: ${errorMsg}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Format data
            const dataToSubmit = {
                ...formData,
                min_price: Number(formData.min_price),
                max_price: formData.max_price ? Number(formData.max_price) : null,
                area_sqft: formData.area_sqft ? Number(formData.area_sqft) : null,
                bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
                bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
            };

            let propertyId = initialData?.id;

            // 1. Create or Update Property Data
            if (isEditing) {
                await axiosWithFallback('put', `/properties/${propertyId}`, dataToSubmit, config);
            } else {
                const response = await axiosWithFallback('post', `/properties`, dataToSubmit, config);
                propertyId = response.data.property.id;
            }

            // 2. Upload new images if any
            if (images.length > 0) {
                try {
                    const formDataObj = new FormData();
                    images.forEach(image => {
                        formDataObj.append('images', image);
                    });

                    await axiosWithFallback('post',
                        `/properties/${propertyId}/images`,
                        formDataObj,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                } catch (uploadErr) {
                    console.error('Image upload failed:', uploadErr);

                    // Specific Multer/backend error messages
                    const backendMsg = uploadErr.response?.data?.message || uploadErr.message;

                    // If image upload fails, we MUST rollback the property creation
                    if (!isEditing) {
                        try {
                            await axiosWithFallback('delete', `/properties/${propertyId}`, null, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            console.log('Rolled back property creation due to image upload failure.');
                        } catch (rollbackErr) {
                            console.error('Failed to rollback property:', rollbackErr);
                        }
                    }

                    // Throw error to be caught by the main catch block and shown in UI
                    throw new Error(`Failed to upload images: ${backendMsg}`);
                }
            }

            // 3. Success -> redirect
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Save error:', err);
            // Support both standard axios errors and our custom thrown errors
            setError(err.message || err.response?.data?.message || 'Failed to save property. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Code *</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                                placeholder="e.g., PROP-001"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Luxury 3BHK Villa in Gotri"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Type *</label>
                            <select
                                name="property_type"
                                value={formData.property_type}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            >
                                {PROPERTY_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            >
                                {STATUS_OPTIONS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Location & Price */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Location & Price</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Location Area *</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Alkapuri"
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Min Price (₹) *</label>
                            <input
                                type="number"
                                name="min_price"
                                value={formData.min_price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Max Price (₹) (Optional)</label>
                            <input
                                type="number"
                                name="max_price"
                                value={formData.max_price}
                                onChange={handleChange}
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Details - Only show if not a plot or office */}
                {!['plot', 'office'].includes(formData.property_type) && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Property Details</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Area (sq.ft)</label>
                                <input
                                    type="number"
                                    name="area_sqft"
                                    value={formData.area_sqft}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Bedrooms</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    min="0"
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Extra Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Extra Features</h2>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Instagram Video URL
                        </label>
                        <input
                            type="url"
                            name="instagram_video_url"
                            value={formData.instagram_video_url}
                            onChange={handleChange}
                            placeholder="https://instagram.com/reel/..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2 flex justify-between items-center">
                        <span>Property Images</span>
                        <span className="text-sm font-normal text-gray-500">
                            {existingImages.length + images.length} / 4 Max
                        </span>
                    </h2>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 cursor-pointer"
                        >
                            Select Images
                        </label>
                    </div>

                    {/* Previews */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {/* Existing Images */}
                        {existingImages.map((img, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200">
                                <img src={typeof img === 'string' ? img : img.url} alt={`Property ${idx}`} className="w-full h-32 object-cover" />
                                <button
                                    type="button"
                                    onClick={() => deleteExistingImage(idx)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                    Existing
                                </div>
                            </div>
                        ))}

                        {/* New Upload Previews */}
                        {images.map((file, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-green-200 shadow-sm">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`New ${idx}`}
                                    className="w-full h-32 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(idx)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs p-1 text-center">
                                    New
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : isEditing ? 'Update Property' : 'Save Property'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyForm;
