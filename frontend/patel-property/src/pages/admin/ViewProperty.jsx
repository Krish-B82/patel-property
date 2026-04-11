import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { MapPin, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const ViewProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            setLoading(true);
            const response = await getPropertyById(id);
            if (response.success) {
                setProperty(response.property);
            } else {
                setError('Failed to fetch property details.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching the property.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            </AdminLayout>
        );
    }

    if (error || !property) {
        return (
            <AdminLayout>
                <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center font-semibold">
                    {error || 'Property not found.'}
                </div>
                <button onClick={() => navigate('/admin/dashboard')} className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                    Go Back
                </button>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6">
                <button 
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center text-gray-600 hover:text-yellow-600 transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Property Code</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                {property.code}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Property Title</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                {property.title}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-1">Description</label>
                        <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 min-h-[100px] whitespace-pre-wrap">
                            {property.description}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Property Type</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium capitalize">
                                {property.property_type}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Status</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg font-medium capitalize flex items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${property.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {property.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location & Price */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Location & Price</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Location Area</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <div className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                    {property.location}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">City</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                {property.city}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Min Price</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold">
                                {formatPrice(property.min_price)}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Max Price</label>
                            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-bold">
                                {property.max_price ? formatPrice(property.max_price) : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                {!['plot', 'office'].includes(property.property_type) && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Property Details</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Area (sq.ft)</label>
                                <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                    {property.area_sqft || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Bedrooms</label>
                                <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                    {property.bedrooms || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Bathrooms</label>
                                <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                                    {property.bathrooms || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confidential Admin Info */}
                <div className="space-y-4 bg-red-50 p-6 rounded-xl border border-red-200">
                    <h2 className="text-xl font-bold text-red-800 border-b border-red-200 pb-2">Confidential Owner Details (Admin Only)</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-red-900 mb-1">Owner Name</label>
                            <div className="w-full p-3 bg-white border border-red-200 rounded-lg text-gray-900 font-medium">
                                {property.owner_name || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-red-900 mb-1">Owner Contact Number</label>
                            <div className="w-full p-3 bg-white border border-red-200 rounded-lg text-gray-900 font-medium select-all">
                                {property.owner_contact || 'Not provided'}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-red-900 mb-1">Owner Address</label>
                        <div className="w-full p-3 bg-white border border-red-200 rounded-lg text-gray-900 font-medium min-h-[60px]">
                            {property.owner_address || 'Not provided'}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-red-900 mb-1">Original Deal Amount (₹)</label>
                        <div className="w-full p-3 bg-white border border-red-200 rounded-lg text-gray-900 font-bold text-lg">
                            {property.original_amount ? `₹ ${property.original_amount.toLocaleString('en-IN')}` : 'Not provided'}
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Property Images ({property.images?.length || 0})</h2>
                    {property.images && property.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {property.images.map((img, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <img src={typeof img === 'string' ? img : img.url} alt={`Property ${idx}`} className="w-full h-40 object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No images currently uploaded for this property.</p>
                    )}
                </div>
                
                {/* Actions */}
                <div className="pt-6 border-t flex justify-end gap-4">
                    <button
                        onClick={() => navigate(`/admin/edit-property/${property.id}`)}
                        className="px-8 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition"
                    >
                        Edit Property
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ViewProperty;
