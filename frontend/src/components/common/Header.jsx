import { useState } from 'react';
import { getWhatsAppLink } from '../../utils/constants';

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('EN');

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-dark">PATELPROPERTY.com</h1>
            <p className="text-sm text-gray-700">Vadodara, Gujarat</p>
          </div>
        </div>

        {/* Right side - Language + Sell Property button */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex gap-2 bg-white rounded-lg px-3 py-2">
            <button
              onClick={() => setSelectedLang('EN')}
              className={`px-3 py-1 rounded ${selectedLang === 'EN' ? 'bg-primary font-bold' : ''}`}
            >
              EN
            </button>
            <button
              onClick={() => setSelectedLang('HI')}
              className={`px-3 py-1 rounded ${selectedLang === 'HI' ? 'bg-primary font-bold' : ''}`}
            >
              हिं
            </button>
            <button
              onClick={() => setSelectedLang('GU')}
              className={`px-3 py-1 rounded ${selectedLang === 'GU' ? 'bg-primary font-bold' : ''}`}
            >
              ગુ
            </button>
          </div>

                 {/* Sell Property Button */}
          <a
            href={getWhatsAppLink(null, 'I want to sell my property')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Sell Property
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;