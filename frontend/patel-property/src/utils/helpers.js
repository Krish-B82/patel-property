// Format price in Indian format (Lakhs/Crores)
export const formatPrice = (price) => {
  if (!price) return '₹0';
  
  const numPrice = parseInt(price);
  
  if (numPrice >= 10000000) {
    // Crores
    return `₹${(numPrice / 10000000).toFixed(2)}Cr`;
  } else if (numPrice >= 100000) {
    // Lakhs
    return `₹${(numPrice / 100000).toFixed(2)}L`;
  } else if (numPrice >= 1000) {
    // Thousands
    return `₹${(numPrice / 1000).toFixed(2)}K`;
  }
  
  return `₹${numPrice}`;
};

// Format area
export const formatArea = (area) => {
  if (!area) return '';
  return `${area} sq.ft`;
};

// Format BHK
export const formatBHK = (bedrooms) => {
  if (!bedrooms) return 'Studio';
  return `${bedrooms} BHK`;
};