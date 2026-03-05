import { useState } from 'react';
import { LANGUAGES } from '../../utils/constants';

const LanguageSelector = ({ onLanguageSelect }) => {
    const [selectedLang, setSelectedLang] = useState(null);

    const handleContinue = () => {
        if (selectedLang) {
            onLanguageSelect(selectedLang);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-4 sm:px-6 py-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-12 max-w-lg w-full">
                {/* Globe Icon */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center text-black mb-1 sm:mb-2">
                    PATELPROPERTY.com
                </h1>
                <p className="text-center text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">Vadodara, Gujarat</p>

                {/* Subtitle */}
                <p className="text-center text-gray-700 text-sm sm:text-base mb-2 sm:mb-3">
                    Choose your preferred language
                </p>
                <p className="text-center text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">
                    अपनी पसंदीदा भाषा चुनें • તમારી પસંદીદા ભાષા પસંદ કરો
                </p>

                {/* Language Options */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelectedLang(lang.code)}
                            className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${selectedLang === lang.code
                                    ? 'border-primary bg-secondary'
                                    : 'border-gray-200 hover:border-primary bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <span className="text-2xl sm:text-3xl">{lang.flag}</span>
                                <div className="text-left">
                                    <p className="font-semibold text-black text-base sm:text-lg">{lang.name}</p>
                                    <p className="text-gray-600 text-sm sm:text-base">{lang.nativeName}</p>
                                </div>
                            </div>
                            {selectedLang === lang.code && (
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    disabled={!selectedLang}
                    className="w-full bg-primary hover:bg-yellow-500 text-black font-bold text-base sm:text-lg py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default LanguageSelector;