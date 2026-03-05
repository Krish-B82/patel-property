import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const placeholders = [
        'Search by area, Property type, or budget',
        'Find apartments in Alkapuri',
        'Search villas in Gotri',
        'Looking for 2 BHK in Vadodara?',
    ];

    // Change placeholder every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Navigate to search page with query
        console.log('Searching for:', searchQuery);
    };

    return (
        <section className="bg-secondary py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-black mb-3 leading-tight">
                    Discover the right property in Vadodara.
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-10 px-2 sm:px-0">
                    <span className="font-semibold">Residential</span> • <span className="font-semibold">Commercial</span> • <span className="font-semibold">Plots</span>
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full">
                    <div className="relative">
                        <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={placeholders[placeholderIndex]}
                            className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none text-base sm:text-lg transition-all"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Hero;