import { useState } from 'react';

const Hero = () => {
  const [searchText, setSearchText] = useState('');
  const [placeholder, setPlaceholder] = useState('Search by area, Property type, or budget');

  // Animated placeholder effect
  useState(() => {
    const placeholders = [
      'Search by area, Property type, or budget',
      'Search: Location (e.g., Alkapuri, Sama)',
      'Search: Property type (e.g., 3 BHK, Villa)',
      'Search: Budget (e.g., ₹50L - ₹1Cr)'
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchText);
    // TODO: Navigate to search page with query
  };

  return (
    <section className="bg-secondary py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl font-serif font-bold text-dark mb-2">
          Discover the right property in Vadodara.
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          <em>Residential • Commercial • Plots</em>
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={placeholder}
            className="w-full px-6 py-4 rounded-full border-2 border-gray-300 focus:border-primary focus:outline-none text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-yellow-500 text-dark px-8 py-3 rounded-full font-semibold transition"
          >
            🔍 Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;