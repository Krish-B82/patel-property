// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api';

// Contact Information
export const WHATSAPP_NUMBER = '+917227068493';
export const INSTAGRAM_HANDLE = '@patel_property_vadodara';
export const CONTACT_PHONE = '+91 XXXXXX214';

// Property Types
export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment', icon: '🏢' },
  { value: 'villa', label: 'Villa', icon: '🏡' },
  { value: 'house', label: 'House', icon: '🏠' },
  { value: 'plot', label: 'Plot', icon: '📐' },
  { value: 'office', label: 'Office', icon: '🏢' }
];

// Bedroom Options
export const BHK_OPTIONS = [
  { value: 1, label: '1 BHK' },
  { value: 2, label: '2 BHK' },
  { value: 3, label: '3 BHK' },
  { value: 4, label: '4 BHK' },
  { value: 5, label: '5+ BHK' }
];

// Popular Areas in Vadodara
export const POPULAR_AREAS = [
  { name: 'Alkapuri', priceRange: '₹60L - ₹2Cr' },
  { name: 'Gotri', priceRange: '₹40L - ₹1.5Cr' },
  { name: 'Manjalpur', priceRange: '₹25L - ₹80L' },
  { name: 'Karelibaug', priceRange: '₹60L - ₹2Cr' },
  { name: 'Vasna', priceRange: '₹70L - ₹2.5Cr' },
  { name: 'Sayajigunj', priceRange: '₹80L - ₹3Cr' }
];

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'GB' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: 'IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: 'IN' }
];

// Property Status
export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  RENTED: 'rented'
};

// Price Ranges for Budget Search
export const PRICE_RANGES = [
  { label: 'Under ₹25L', min: 0, max: 2500000 },
  { label: '₹25L - ₹50L', min: 2500000, max: 5000000 },
  { label: '₹50L - ₹75L', min: 5000000, max: 7500000 },
  { label: '₹75L - ₹1Cr', min: 7500000, max: 10000000 },
  { label: '₹1Cr - ₹2Cr', min: 10000000, max: 20000000 },
  { label: 'Above ₹2Cr', min: 20000000, max: 100000000 }
];

// Insights/Guides
export const INSIGHTS = [
  {
    id: 1,
    icon: '🏘️',
    title: 'Best Areas to Live in Vadodara',
    description: 'Discover top residential areas with great connectivity and amenities',
    link: '#'
  },
  {
    id: 2,
    icon: '✅',
    title: 'Things to Check Before Buying',
    description: 'Essential checklist for property buyers to avoid common mistakes',
    link: '#'
  },
  {
    id: 3,
    icon: '📈',
    title: 'Investment Guide for Vadodara',
    description: 'Smart investment strategies for Vadodara real estate market',
    link: '#'
  }
];

// Pagination
export const ITEMS_PER_PAGE = 6;

// Image Placeholder (when no image)
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: '#',
  instagram: `https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`,
  youtube: '#',
  linkedin: '#'
};

// Helper function to format price in Indian format
export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)}Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)}L`;
  } else {
    return `₹${price.toLocaleString('en-IN')}`;
  }
};

// Helper function to create WhatsApp link
export const getWhatsAppLink = (propertyCode, propertyTitle) => {
  const message = propertyCode 
    ? `Hi, I'm interested in property ${propertyCode} - ${propertyTitle}. Please share more details.`
    : 'Hi, I want to sell my property. Please contact me.';
  
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
};

// Helper function to get Instagram link
export const getInstagramLink = (url) => {
  return url || `https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`;
};