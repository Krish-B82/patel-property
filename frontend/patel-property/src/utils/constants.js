// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api';

// Contact Information
export const WHATSAPP_NUMBER = '+919228188881';
export const INSTAGRAM_HANDLE = '@patel_property_vadodara';
export const CONTACT_PHONE = '+91 92281 88881';

export const INSTAGRAM_LINK = 'https://www.instagram.com/patel_property_vadodara?igsh=MWNmdWdzajJ6bHJyNA==';

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
    sections: [
      {
        heading: "Alkapuri & Productivity Road",
        body: "Known as the premium residential and commercial hub of Vadodara. Offers high-end apartments, excellent connectivity to the railway station, and upscale shopping and dining options."
      },
      {
        heading: "Gotri & Sevasi",
        body: "The most rapidly developing western corridors of the city. Perfect for families looking for luxurious villas and modern high-rise apartments, surrounded by top international schools and green spaces."
      },
      {
        heading: "Vasna-Bhayli Road",
        body: "A highly sought-after area for its peaceful environment and wide roads. It is a hotspot for contemporary residential projects and offers quick access to the upcoming ring roads."
      },
      {
        heading: "Manjalpur",
        body: "A well-established, family-friendly neighborhood in the south. Known for excellent local markets, community parks, and strong connectivity to the Makarpura GIDC."
      }
    ]
  },
  {
    id: 2,
    icon: '✅',
    title: 'Things to Check Before Buying',
    description: 'Essential checklist for property buyers',
    sections: [
      {
        heading: "Gujarat RERA Verification",
        body: "Always verify the project's registration number on the official GujRERA website to ensure the builder is compliant with state regulations and timelines."
      },
      {
        heading: "7/12 Extract & Title Clearances",
        body: "Ensure the land has a clear Title Deed and check the 7/12 extract (Satbara Utara) to confirm the legal ownership and verify there are no pending agricultural disputes."
      },
      {
        heading: "VMC Water & Drainage",
        body: "Check if the property falls under the Vadodara Municipal Corporation (VMC) limits and has officially approved water supply and drainage connections, especially in newly developing outskirts."
      },
      {
        heading: "VUDA Approval",
        body: "For properties outside central city limits, ensure the layout and construction plans are strictly approved by the Vadodara Urban Development Authority (VUDA)."
      }
    ]
  },
  {
    id: 3,
    icon: '📈',
    title: 'Investment Guide for Vadodara',
    description: 'Smart investment strategies for real estate',
    sections: [
      {
        heading: "The Bullet Train Impact",
        body: "Properties near the upcoming National High-Speed Rail Corridor (Bullet Train) terminal are expected to see massive capital appreciation within the next 4-5 years."
      },
      {
        heading: "Ajwa Road & Waghodia Corridors",
        body: "Ideal for long-term investments. Proximity to major educational institutes and IT parks is driving strong rental yields and steady plot value growth."
      },
      {
        heading: "Padra Road Industrial Growth",
        body: "With expanding industrial zones around Padra and Karjan, residential demand for workforce housing is spiking, making it a lucrative spot for rental income."
      },
      {
        heading: "Commercial Real Estate",
        body: "Investing in commercial shop-fronts in emerging areas like Bhayli and Gotri provides much higher short-term rental yields compared to standard residential flats."
      }
    ]
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