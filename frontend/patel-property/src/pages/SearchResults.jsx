import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackToHomeButton from '../components/common/BackToHomeButton';
import { getAllProperties } from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyGrid from '../components/property/PropertyGrid';
import Pagination from '../components/property/Pagination';
import PropertyCardSkeleton from '../components/common/PropertyCardSkeleton';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    page: parseInt(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    fetchProperties();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getAllProperties({ ...filters, limit: 6 });
      if (data.success) {
        setProperties(data.properties || []);
        setTotalPages(data.totalPages || 1);
        setTotalProperties(data.totalProperties || 0);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key]) params.set(key, updatedFilters[key]);
    });
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const updatedFilters = { ...filters, page: newPage };
    setFilters(updatedFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key]) params.set(key, updatedFilters[key]);
    });
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <BackToHomeButton />
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
          Search Results
        </h1>
        {totalProperties > 0 && (
          <p className="text-gray-600 mb-6">
            Found {totalProperties} {totalProperties === 1 ? 'property' : 'properties'}
          </p>
        )}

        {/* HORIZONTAL FILTERS */}
        <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* LOADING SKELETONS */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            {/* RESULTS GRID */}
            <PropertyGrid properties={properties} />

            {/* PAGINATION */}
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600 text-lg mb-4">No properties found matching your criteria.</p>
            <button
              onClick={() => handleFilterChange({})}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;