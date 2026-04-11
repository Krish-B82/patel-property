import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink, Eye } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

const PropertyTable = ({ properties, onDelete }) => {
    if (!properties || properties.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500 text-lg">No properties found. Add your first property!</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold text-gray-700">Property</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Location</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Type</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                        {property.images && property.images.length > 0 ? (
                                            <img
                                                src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                                                alt={property.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 line-clamp-1" title={property.title}>
                                            {property.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">ID: {property.code || property.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{property.location}</td>
                            <td className="px-6 py-4 text-gray-600">{property.property_type}</td>
                            <td className="px-6 py-4">
                                <div className="font-semibold text-gray-900">
                                    {formatPrice(property.min_price)}
                                </div>
                                {property.max_price && property.max_price > property.min_price && (
                                    <div className="text-xs text-gray-500">
                                        to {formatPrice(property.max_price)}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${property.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    property.status === 'Sold' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {property.status || 'Active'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        to={`/admin/view-property/${property.id}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        title="View Admin Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to={`/property/${property.id}`}
                                        target="_blank"
                                        className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                                        title="View Public Page"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to={`/admin/edit-property/${property.id}`}
                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                                        title="Edit Property"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
                                                onDelete(property.id);
                                            }
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Delete Property"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyTable;
