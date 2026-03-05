import { useState, useEffect } from 'react';
import { getWhatsAppLink } from '../../utils/constants';
import { useTranslation } from '../../utils/translations';

const Header = () => {
    const [selectedLang, setSelectedLang] = useState('EN');
    const t = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        const langMap = { 'en': 'EN', 'hi': 'हिं', 'gu': 'ગુ' };
        setSelectedLang(langMap[savedLanguage] || 'EN');
    }, []);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        const langCodeMap = { 'EN': 'en', 'हिं': 'hi', 'ગુ': 'gu' };
        localStorage.setItem('selectedLanguage', langCodeMap[lang]);
        window.location.reload(); // Reload to apply translations
    };

    return (
        <header className="bg-primary shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gray-200 rounded-full flex-shrink-0"></div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-black leading-none mb-1">PATELPROPERTY.com</h1>
                            <p className="text-xs sm:text-sm text-gray-800">Vadodara, Gujarat</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="flex gap-1 sm:gap-2 bg-white rounded-lg p-1">
                        {['EN', 'हिं', 'ગુ'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${selectedLang === lang
                                        ? 'bg-primary text-black'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <a
                        href={getWhatsAppLink(null, 'I want to sell my property')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none text-center bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-50 transition shadow-md whitespace-nowrap"
                    >
                        {t('sellProperty')}
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;