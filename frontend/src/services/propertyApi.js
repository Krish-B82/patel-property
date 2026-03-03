const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const fallbackProperties = [
  { id: '1', code: 'PP101', title: '4 BHK House', min_price: 7500000, max_price: 8000000, city: 'Vadodara', location: 'Alkapuri', bedrooms: 4, bathrooms: 3, area_sqft: 1850, property_type: 'house', status: 'available', images: [] },
  { id: '2', code: 'PP102', title: '3 BHK Flat', min_price: 5500000, max_price: 6200000, city: 'Vadodara', location: 'Vasana', bedrooms: 3, bathrooms: 2, area_sqft: 1450, property_type: 'apartment', status: 'available', images: [] },
  { id: '3', code: 'PP103', title: 'Commercial Office Space', min_price: 9000000, max_price: 12000000, city: 'Vadodara', location: 'Gotri', bedrooms: null, bathrooms: 2, area_sqft: 2200, property_type: 'office', status: 'available', images: [] },
  { id: '4', code: 'PP104', title: 'Residential Plot', min_price: 4000000, max_price: 5500000, city: 'Vadodara', location: 'Manjalpur', bedrooms: null, bathrooms: null, area_sqft: 2100, property_type: 'plot', status: 'available', images: [] },
  { id: '5', code: 'PP105', title: '2 BHK Apartment', min_price: 4200000, max_price: 5000000, city: 'Vadodara', location: 'Karelibaug', bedrooms: 2, bathrooms: 2, area_sqft: 1200, property_type: 'apartment', status: 'available', images: [] },
  { id: '6', code: 'PP106', title: 'Luxury Villa', min_price: 14000000, max_price: 17500000, city: 'Vadodara', location: 'Sayajigunj', bedrooms: 4, bathrooms: 4, area_sqft: 3200, property_type: 'villa', status: 'available', images: [] },
  { id: '7', code: 'PP107', title: '3 BHK House', min_price: 6200000, max_price: 7200000, city: 'Vadodara', location: 'Vasana', bedrooms: 3, bathrooms: 3, area_sqft: 1680, property_type: 'house', status: 'available', images: [] },
  { id: '8', code: 'PP108', title: 'Commercial Shop', min_price: 3200000, max_price: 4200000, city: 'Vadodara', location: 'Alkapuri', bedrooms: null, bathrooms: 1, area_sqft: 740, property_type: 'office', status: 'available', images: [] }
];

export async function fetchProperties(query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  try {
    const response = await fetch(`${API_BASE}/properties?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return await response.json();
  } catch (error) {
    const filtered = localFilter(fallbackProperties, query);
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 6);
    const start = (page - 1) * limit;
    const pageSlice = filtered.slice(start, start + limit);
    return {
      success: true,
      page,
      limit,
      totalProperties: filtered.length,
      totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
      hasNextPage: start + limit < filtered.length,
      hasPreviousPage: page > 1,
      properties: pageSlice,
      isFallback: true
    };
  }
}

function localFilter(properties, query) {
  const term = (query.location || query.code || '').toLowerCase();
  return properties.filter((property) => {
    const matchesType = query.type ? property.property_type === query.type : true;
    const matchesBudget = query.maxPrice ? property.max_price <= Number(query.maxPrice) : true;
    const matchesSearch = term
      ? `${property.location} ${property.title} ${property.code}`.toLowerCase().includes(term)
      : true;
    return matchesType && matchesBudget && matchesSearch;
  });
}
