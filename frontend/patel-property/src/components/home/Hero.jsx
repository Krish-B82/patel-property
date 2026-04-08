import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from '../../utils/translations';

// Import all 4 background images dynamically
import img1 from '../../assets/2d82184d-f8bb-4f4b-89cf-b20eceef619c.jpg';
import img2 from '../../assets/5c905360-3ad8-4733-98f5-a4535b73700b.jpg';
import img3 from '../../assets/ce5a7fcb-f505-4a14-a2f7-15084768e93a.jpg';
import img4 from '../../assets/d9623a9b-eb69-4a3d-a341-c0d59fc7fe7e.jpg';

const images = [img1, img2, img3, img4];

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const navigate = useNavigate();
    const t = useTranslation();

    // Mobile slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-gray-950">
            {/* DESKTOP BACKGROUND: 4 Images Side-by-Side Grid */}
            <div className="absolute inset-0 hidden md:grid grid-cols-4 w-full h-full">
                {images.map((img, idx) => (
                    <div key={`desktop-${idx}`} className="relative h-full border-r border-black/10 last:border-0 hover:scale-105 transition-transform duration-1000 overflow-hidden">
                        <img src={img} alt="Vadodara Property" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* MOBILE BACKGROUND: Dynamic Slideshow */}
            <div className="absolute inset-0 md:hidden w-full h-full">
                {images.map((img, idx) => (
                    <img
                        key={`mobile-${idx}`}
                        src={img}
                        alt="Vadodara Property"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            idx === currentImgIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>

            {/* DARK GRADIENT OVERLAY (So white text is extremely readable) */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/70 z-0"></div>

            {/* MAIN CONTENT BLOCK */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-xl">
                    {t('heroTitle')}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 font-medium drop-shadow-md pb-2">
                    {t('heroSubtitle')}
                </p>

                {/* SEARCH BAR (Housed in a nice glassmorphic container) */}
                <form onSubmit={handleSearch} className="max-w-4xl mx-auto backdrop-blur-md bg-white/20 p-2 sm:p-3 rounded-2xl shadow-2xl border border-white/20">
                    <div className="flex gap-2 bg-white p-1.5 sm:p-2 rounded-xl">
                        <div className="flex-1 relative flex items-center">
                            <Search className="absolute left-4 text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder')}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-base sm:text-lg text-gray-900 placeholder-gray-500 font-medium"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-lg transition-colors whitespace-nowrap text-base sm:text-lg shadow-sm"
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