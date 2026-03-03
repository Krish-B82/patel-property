import { LuBuilding2, LuHouse, LuFlag } from 'react-icons/lu';

const categories = [
  { key: 'residential', label: 'Residential', icon: LuHouse },
  { key: 'commercial', label: 'Commercial', icon: LuBuilding2 },
  { key: 'plot', label: 'Plots', icon: LuFlag }
];

export default function PropertyTypeSelector({ activeType, onSelect }) {
  return (
    <section className="section light">
      <h3>Find your property type</h3>
      <div className="types-grid">
        {categories.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`type-card ${activeType === key ? 'active' : ''}`}
            onClick={() => onSelect(key)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
