import { useState } from 'react';
import { getWhatsAppLink } from '../../utils/constants';

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('EN');

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-black">PATELPROPERTY.com</h1>
            <p className="text-sm text-gray-800">Vadodara, Gujarat</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Language Buttons */}
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['EN', 'हिं', 'ગુ'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  selectedLang === lang
                    ? 'bg-primary text-black'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Sell Property Button */}
          
           <a href={getWhatsAppLink(null, 'I want to sell my property')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
          >
            Sell Property
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;