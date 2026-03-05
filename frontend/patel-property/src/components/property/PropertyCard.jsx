import { MapPin, Maximize, Home, Share2 } from 'lucide-react';
import { formatPrice, getWhatsAppLink } from '../../utils/constants';

const PropertyCard = ({ property }) => {
    const {
        id,
        code,
        title,
        min_price,
        max_price,
        location,
        city,
        bedrooms,
        bathrooms,
        area_sqft,
        property_type,
        images,
        created_at,
    } = property;

    // Check if property is new (created in last 7 days)
    const isNew = () => {
        const createdDate = new Date(created_at);
        const today = new Date();
        const diffDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    const handleShare = () => {
        // TODO: Implement share functionality
        console.log('Share property:', code);
    };

    const handleWhatsApp = () => {
        window.open(getWhatsAppLink(code, title), '_blank');
    };

    const handleContact = () => {
        // TODO: Open contact modal or navigate to detail page
        console.log('Contact for property:', code);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 bg-gray-200">
                {images && images.length > 0 ? (
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Home className="w-16 h-16" />
                    </div>
                )}

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="absolute top-3 left-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
                >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>

                {/* New Badge */}
                {isNew() && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                        New
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5">
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-black mb-1 sm:mb-2 line-clamp-1">
                    {bedrooms} BHK {property_type.charAt(0).toUpperCase() + property_type.slice(1)} in {location}
                </h3>

                {/* Price */}
                <p className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">
                    {formatPrice(min_price)} - {formatPrice(max_price)}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-3 sm:mb-4">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <p className="text-xs sm:text-sm">{location}, {city || 'Vadodara'}</p>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
                    <div className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{area_sqft} sq.ft</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="capitalize">{property_type}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                    {/* WhatsApp Button */}
                    <button
                        onClick={handleWhatsApp}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center font-bold transition"
                    >
                        W
                    </button>

                    {/* Contact Button */}
                    <button
                        onClick={handleContact}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                        <span>📞</span>
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;