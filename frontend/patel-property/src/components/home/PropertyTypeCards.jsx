import { Home, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../utils/translations';

const PropertyTypeCards = () => {
    const navigate = useNavigate();
    const t = useTranslation();

    const propertyTypes = [
        {
            icon: Home,
            title: t('residential'),
            type: 'Residential',
        },
        {
            icon: Building2,
            title: t('commercial'),
            type: 'Commercial',
        },
        {
            icon: MapPin,
            title: t('plots'),
            type: 'Plots',
        },
    ];

    const handleTypeClick = (type) => {
        navigate(`/search?type=${type}`);
    };

    return (
        <div className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                    {t('findPropertyType')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {propertyTypes.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                onClick={() => handleTypeClick(item.type)}
                                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-primary hover:shadow-lg transition cursor-pointer group"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full mb-4 group-hover:bg-primary group-hover:scale-110 transition">
                                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 group-hover:text-black" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PropertyTypeCards;