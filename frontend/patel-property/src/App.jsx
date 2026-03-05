import { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LanguageSelector from './components/language/LanguageSelector';
import Hero from './components/home/Hero';
import PropertyTypeCards from './components/home/PropertyTypeCards';
import LatestProperties from './components/home/LatestProperties';

function App() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageSelector(false);
  };

  // Show language selector first
  if (showLanguageSelector) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  // Main app after language selection
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Property Type Cards */}
      <PropertyTypeCards />

      {/* Latest Properties - THIS FETCHES FROM BACKEND! */}
      <LatestProperties />

      <Footer />
    </div>
  );
}

export default App;