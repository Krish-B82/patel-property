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

// Insights/Guides
export const INSIGHTS = [
  {
    id: 1,
    icon: '🏘️',
    title: 'Best Areas to Live in Vadodara',
    description: 'Discover top residential areas with great connectivity',
  },
  {
    id: 2,
    icon: '✅',
    title: 'Things to Check Before Buying',
    description: 'Essential checklist for property buyers',
  },
  {
    id: 3,
    icon: '📈',
    title: 'Investment Guide for Vadodara',
    description: 'Smart investment strategies for real estate',
  }
];

// Helper function to format price
export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)}Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(0)}L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
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