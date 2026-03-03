import { MapPin, Maximize, Home, Bath, Bed } from 'lucide-react';
import { formatPrice, getWhatsAppLink, getInstagramLink } from '../../utils/constants';

const PropertyCard = ({ property }) => {
  const {
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
    instagram_video_url,
    status
  } = property;

  const mainImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x300';
  const isNew = new Date(property.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      {/* New Badge */}
      {isNew && (
        <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          New
        </span>
      )}

      {/* Share Icon */}
      <button className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100">
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>

      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* BHK and Type */}
        <h3 className="text-xl font-bold text-dark mb-1">
          {bedrooms && `${bedrooms} BHK `}
          {property_type.charAt(0).toUpperCase() + property_type.slice(1)} in {location}
        </h3>

        {/* Price */}
        <p className="text-2xl font-bold text-dark mb-2">
          {formatPrice(min_price)} - {formatPrice(max_price)}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}, {city}</span>
        </div>

        {/* Property Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {area_sqft && (
            <div className="flex items-center">
              <Maximize className="w-4 h-4 mr-1" />
              <span>{area_sqft} sq.ft</span>
            </div>
          )}
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span>{property_type.charAt(0).toUpperCase() + property_type.slice(1)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* WhatsApp Button */}
          <a
            href={getWhatsAppLink(code, title)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition"
          >
            <span className="text-xl font-bold">W</span>
          </a>

          {/* Contact Button */}
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;