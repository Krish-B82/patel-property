import { useState } from 'react';
import Header from './components/common/Header';
import Hero from './components/home/Hero';
import PropertyCard from './components/property/PropertyCard';
import LanguageSelector from './components/language/LanguageSelector';

function App() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageSelector(false);
  };

  // Sample property data for testing
  const sampleProperty = {
    id: '1',
    code: 'SA01',
    title: 'Luxury Apartment in Alkapuri',
    min_price: 3500000,
    max_price: 4000000,
    location: 'Alkapuri',
    city: 'Vadodara',
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1400,
    property_type: 'apartment',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
    instagram_video_url: 'https://instagram.com/p/example',
    status: 'available',
    created_at: new Date().toISOString()
  };

  // Show language selector first
  if (showLanguageSelector) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  // Main app after language selection
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <Hero />
      
      {/* Testing PropertyCard */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Latest Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCard property={sampleProperty} />
          <PropertyCard property={sampleProperty} />
          <PropertyCard property={sampleProperty} />
        </div>
      </div>
    </div>
  );
}

export default App;