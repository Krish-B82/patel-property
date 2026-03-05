import { useState, useEffect } from 'react';
import { getLatestProperties } from '../../services/api';
import PropertyCard from '../property/PropertyCard';
import Loader from '../common/Loader';

const LatestProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getLatestProperties();

            console.log('✅ Fetched properties:', data); // Debug log

            if (data.success && data.properties) {
                setProperties(data.properties);
            }
        } catch (err) {
            console.error('❌ Error fetching properties:', err);
            setError('Failed to load properties. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
                        Latest in Vadodara
                    </h2>
                    <p className="text-green-600 font-semibold mb-6 sm:mb-8 text-sm sm:text-base">Newly added</p>
                    <Loader />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
                        Latest in Vadodara
                    </h2>
                    <p className="text-green-600 font-semibold mb-6 sm:mb-8 text-sm sm:text-base">Newly added</p>
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
                        <button
                            onClick={fetchProperties}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (properties.length === 0) {
        return (
            <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
                        Latest in Vadodara
                    </h2>
                    <p className="text-green-600 font-semibold mb-6 sm:mb-8 text-sm sm:text-base">Newly added</p>
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-gray-600 text-sm sm:text-base">No properties available yet.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
                            Latest in Vadodara
                        </h2>
                        <p className="text-green-600 font-semibold text-sm sm:text-base">Newly added</p>
                    </div>

                    <button className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-semibold flex items-center gap-1 sm:gap-2 transition">
                        View all
                        <span>→</span>
                    </button>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProperties;