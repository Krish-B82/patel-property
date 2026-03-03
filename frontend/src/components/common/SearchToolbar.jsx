import { FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function SearchToolbar({ searchText, setSearchText, activeType, onQuickFilter }) {
  return (
    <section className="search-toolbar">
      <div className="top-row">
        <button className="back-btn"><FiArrowLeft /> Back to Home</button>
        <div className="search-inline">
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search area" />
          <FiSearch />
        </div>
      </div>

      <div className="filters-row">
        <button onClick={() => onQuickFilter('bedrooms', 2)}>BHK</button>
        <button onClick={() => onQuickFilter('minPrice', 3000000)}>Price</button>
        <button onClick={() => onQuickFilter('location', searchText)}>Area</button>
        <button onClick={() => onQuickFilter('type', activeType === 'commercial' ? 'office' : activeType === 'plot' ? 'plot' : 'apartment')}>Property type</button>
      </div>
    </section>
  );
}
