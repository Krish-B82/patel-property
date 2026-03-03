import { FiMapPin, FiMaximize } from 'react-icons/fi';
import { LuHouse } from 'react-icons/lu';
import { formatPriceRange, labelForType } from '../../utils/formatters';

export default function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <div className="image-placeholder" />
      <div className="property-content">
        <h4>{property.title} in {property.location}</h4>
        <p className="price">{formatPriceRange(property.min_price, property.max_price)}</p>
        <p><FiMapPin /> {property.location}, {property.city}</p>
        <p><FiMaximize /> {property.area_sqft || '-'} sq.ft &nbsp; <LuHouse /> {labelForType(property.property_type)}</p>
        <div className="card-actions">
          <button className="wa">W</button>
          <button className="contact">Contact</button>
        </div>
      </div>
    </article>
  );
}
