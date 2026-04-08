import { BHK_OPTIONS, PROPERTY_TYPES } from '../../utils/constants';

const PropertyFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black">Filters</h2>
        <button
          onClick={() => onFilterChange({})}
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* HORIZONTAL LAYOUT! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Property Type</label>
          <select
            value={filters.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Bedrooms</label>
          <select
            value={filters.bedrooms || ''}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
            className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
          >
            <option value="">Any</option>
            {BHK_OPTIONS.map((bhk) => (
              <option key={bhk.value} value={bhk.value}>
                {bhk.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Location</label>
          <input
            type="text"
            value={filters.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Area name (e.g. Sama, Karelibaug)"
            className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
            autoFocus={!!filters.location}
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Min Price (₹)</label>
          <input
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            placeholder="Min"
            className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Max Price (₹)</label>
          <input
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            placeholder="Max"
            className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;