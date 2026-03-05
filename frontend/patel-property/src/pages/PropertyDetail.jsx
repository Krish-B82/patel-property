import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Maximize, Home, Share2, Instagram } from 'lucide-react';
import { getPropertyById } from '../services/api';
import { formatPrice, getWhatsAppLink } from '../utils/constants';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PropertyGallery from '../components/property/PropertyGallery';
import Loader from '../components/common/Loader';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const data = await getPropertyById(id);
      if (data.success) {
        setProperty(data.property);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800">Property not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsApp = () => {
    window.open(getWhatsAppLink(property.code, property.title), '_blank');
  };

  const handleInstagramClick = () => {
    if (property.instagram_url) {
      window.open(property.instagram_url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Image Gallery */}
        <PropertyGallery images={property.images || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title & Price */}
            <h1 className="text-3xl font-bold text-black mb-2">
              {property.bedrooms} BHK {property.property_type} in {property.location}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-5 h-5" />
              <span>{property.location}, {property.city || 'Vadodara'}</span>
            </div>
            <p className="text-3xl font-bold text-black mb-6">
              {formatPrice(property.min_price)} - {formatPrice(property.max_price)}
            </p>

            {/* Property Details */}
            <div className="bg-secondary p-6 rounded-xl mb-6">
              <h2 className="text-xl font-bold text-black mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Bedrooms</p>
                  <p className="font-semibold text-black">{property.bedrooms} BHK</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Bathrooms</p>
                  <p className="font-semibold text-black">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Area</p>
                  <p className="font-semibold text-black">{property.area_sqft} sq.ft</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Type</p>
                  <p className="font-semibold text-black capitalize">{property.property_type}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Furnishing</p>
                  <p className="font-semibold text-black capitalize">{property.furnishing_status}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Availability</p>
                  <p className="font-semibold text-black capitalize">{property.availability}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-black mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-3">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Sidebar - WITH INSTAGRAM BUTTON! */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold text-black mb-4">Contact Agent</h3>
              
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mb-3 transition flex items-center justify-center gap-2"
              >
                <span>💬</span>
                WhatsApp Now
              </button>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-3 transition flex items-center justify-center gap-2">
                <span>📞</span>
                Call Now
              </button>

              {/* INSTAGRAM BUTTON - ONLY SHOWS IF URL EXISTS! */}
              {property.instagram_url && (
                <button
                  onClick={handleInstagramClick}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white py-3 rounded-lg font-semibold mb-3 transition flex items-center justify-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  View on Instagram
                </button>
              )}
              
              <button className="w-full border-2 border-gray-300 hover:border-primary text-black py-3 rounded-lg font-semibold transition">
                Request Callback
              </button>

              {/* PROPERTY CODE REMOVED - ADMIN ONLY NOW! */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;