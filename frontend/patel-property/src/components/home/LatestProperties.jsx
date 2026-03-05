import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLatestProperties } from '../../services/api';
import PropertyCard from '../property/PropertyCard';
import Loader from '../common/Loader';
import { useTranslation } from '../../utils/translations';

const LatestProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const t = useTranslation();

    useEffect(() => {
        fetchLatestProperties();
    }, []);

    const fetchLatestProperties = async () => {
        try {
            setLoading(true);
            const data = await getLatestProperties(6);
            setProperties(data.properties || []);
        } catch (error) {
            console.error('Error fetching latest properties:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (properties.length === 0) {
        return null;
    }

    return (
        <div className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                            {t('latestInVadodara')}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {t('newlyAdded')}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/search')}
                        className="bg-primary hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-lg transition text-sm sm:text-base"
                    >
                        {t('viewAll')}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <div
                            key={property.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestProperties;