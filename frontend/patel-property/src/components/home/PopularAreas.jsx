import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, TrendingUp } from 'lucide-react';
import { getPopularAreas } from '../../services/api';
import { formatPrice } from '../../utils/helpers';
import Loader from '../common/Loader';
import { useTranslation } from '../../utils/translations';

const PopularAreas = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const t = useTranslation();

    useEffect(() => {
        fetchPopularAreas();
    }, []);

    const fetchPopularAreas = async () => {
        try {
            setLoading(true);
            const response = await getPopularAreas();
            console.log('Popular Areas Response:', response); // DEBUG
            
            // Handle different response formats
            const areasData = response?.areas || response?.data || response || [];
            setAreas(Array.isArray(areasData) ? areasData : []);
        } catch (error) {
            console.error('Error fetching popular areas:', error);
            setAreas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAreaClick = (areaName) => {
        navigate(`/search?location=${encodeURIComponent(areaName)}`);
    };

    if (loading) {
        return <Loader />;
    }

    if (!Array.isArray(areas) || areas.length === 0) {
        return null;
    }

    return (
        <div className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                        {t('popularAreas') || 'Popular Areas in Vadodara'}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        {t('popularAreasSubtitle') || 'Explore properties in top residential localities'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area, index) => (
                        <div
                            key={index}
                            onClick={() => handleAreaClick(area.name)}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-xl transition cursor-pointer border border-blue-100 hover:border-blue-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                                        {area.name}
                                    </h3>
                                </div>
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>

                            <div className="space-y-2">
                                <p className="text-2xl font-bold text-blue-600">
                                    {formatPrice(area.minPrice)} - {formatPrice(area.maxPrice)}
                                </p>
                                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {area.count} {area.count === 1 ? (t('property') || 'property') : (t('properties') || 'properties')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularAreas;