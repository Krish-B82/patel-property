export function formatPriceRange(minPrice, maxPrice) {
  const f = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
    if (value >= 100000) return `₹${Math.round(value / 100000)}L`;
    return `₹${value}`;
  };

  return `${f(minPrice)} - ${f(maxPrice)}`;
}

export function labelForType(type) {
  const mapping = {
    apartment: 'Residential',
    villa: 'Residential',
    house: 'Residential',
    plot: 'Plot',
    office: 'Commercial'
  };
  return mapping[type] || 'Property';
}
