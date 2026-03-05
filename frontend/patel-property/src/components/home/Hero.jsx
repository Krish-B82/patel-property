import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from '../../utils/translations';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const t = useTranslation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {t('heroTitle')}
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-8">
                    {t('heroSubtitle')}
                </p>

                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                    <div className="flex gap-2 sm:gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder')}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-yellow-500 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition whitespace-nowrap text-sm sm:text-base"
                        >
                            {t('searchButton')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Hero;