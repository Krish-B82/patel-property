import { API_BASE_URL } from '../utils/constants';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get all properties with filters
export const getAllProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.location) params.append('location', filters.location);
  if (filters.city) params.append('city', filters.city);
  if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
  if (filters.type) params.append('type', filters.type);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);
  const query = params.toString();
  return await apiCall(`/properties${query ? `?${query}` : ''}`);
};

// Get single property by ID
export const getPropertyById = async (id) => {
  return await apiCall(`/properties/${id}`);
};

// Get property by code (for WhatsApp)
export const getPropertyByCode = async (code) => {
  return await apiCall(`/properties/code/${code}`);
};

// Get latest 6 properties
export const getLatestProperties = async () => {
  return await apiCall('/properties?limit=6&page=1');
};
export const getPopularAreas = async () => {
  return await apiCall('/properties/popular-areas');
};

// Admin: Delete property
export const deleteProperty = async (id) => {
  return await apiCall(`/properties/${id}`, {
    method: 'DELETE',
  });
};