import { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LanguageSelector from './components/language/LanguageSelector';

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
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">
          Day 2 Components Working! ✅
        </h1>
        <p className="text-gray-700 text-xl">
          Language: {selectedLanguage.toUpperCase()}
        </p>
        <p className="text-gray-600 mt-4">
          Header and Footer are complete. Next: Hero section!
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default App;