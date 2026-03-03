import { API_BASE_URL } from '../utils/constants';

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

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
  return await apiCall(`/properties?${params.toString()}`);
};

export const getPropertyById = async (id) => await apiCall(`/properties/${id}`);
export const getPropertyByCode = async (code) => await apiCall(`/properties/code/${code}`);
export const getLatestProperties = async () => await apiCall('/properties?limit=6');