import { Home, Building2, Flag } from 'lucide-react';

const PropertyTypeCards = () => {
    const propertyTypes = [
        {
            id: 1,
            title: 'Residential',
            icon: Home,
            type: 'residential',
        },
        {
            id: 2,
            title: 'Commercial',
            icon: Building2,
            type: 'commercial',
        },
        {
            id: 3,
            title: 'Plots',
            icon: Flag,
            type: 'plot',
        },
    ];

    const handleCardClick = (type) => {
        // TODO: Navigate to search page with type filter
        console.log('Selected type:', type);
    };

    return (
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8 text-center sm:text-left">
                    Find your property type
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {propertyTypes.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleCardClick(item.type)}
                                className="group p-6 sm:p-8 border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 bg-white"
                            >
                                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg sm:text-xl font-semibold text-black">
                                    {item.title}
                                </h3>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PropertyTypeCards;