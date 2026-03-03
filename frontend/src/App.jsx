import { useMemo, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import PropertyTypeSelector from './components/home/PropertyTypeSelector';
import LatestPropertiesSection from './components/home/LatestPropertiesSection';
import PopularAreasSection from './components/home/PopularAreasSection';
import BudgetSection from './components/home/BudgetSection';
import InsightsSection from './components/home/InsightsSection';
import SearchToolbar from './components/common/SearchToolbar';
import { useProperties } from './hooks/useProperties';

const TYPE_MAP = {
  residential: 'apartment',
  commercial: 'office',
  plot: 'plot'
};

export default function App() {
  const [activeType, setActiveType] = useState('residential');
  const [searchText, setSearchText] = useState('');
  const [budget, setBudget] = useState(10000000);
  const [sortMode, setSortMode] = useState('default');

  const { filters, setFilters, result, loading } = useProperties({ type: TYPE_MAP.residential });

  const sortedProperties = useMemo(() => {
    const copy = [...(result.properties || [])];
    if (sortMode === 'low-high') return copy.sort((a, b) => a.min_price - b.min_price);
    if (sortMode === 'high-low') return copy.sort((a, b) => b.max_price - a.max_price);
    return copy;
  }, [result.properties, sortMode]);

  const areaCounts = useMemo(() => {
    const map = new Map();
    (result.properties || []).forEach((property) => {
      map.set(property.location, (map.get(property.location) || 0) + 1);
    });
    return [...map.entries()].map(([area, count]) => ({ area, count }));
  }, [result.properties]);

  const applySearch = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      location: searchText,
      maxPrice: budget,
      type: TYPE_MAP[activeType]
    }));
  };

  const handleTypeSelect = (type) => {
    setActiveType(type);
    setFilters((prev) => ({ ...prev, page: 1, type: TYPE_MAP[type] }));
  };

  const onQuickFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, page: 1, [key]: value }));
  };

  return (
    <div>
      <Header />
      <HeroSection searchText={searchText} setSearchText={setSearchText} onSearch={applySearch} />
      <PropertyTypeSelector activeType={activeType} onSelect={handleTypeSelect} />
      <SearchToolbar
        searchText={searchText}
        setSearchText={setSearchText}
        activeType={activeType}
        onQuickFilter={onQuickFilter}
      />
      <LatestPropertiesSection
        properties={sortedProperties}
        loading={loading}
        page={result.page || filters.page}
        totalPages={result.totalPages || 1}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
      <PopularAreasSection areaCounts={areaCounts} />
      <BudgetSection
        budget={budget}
        setBudget={setBudget}
        sortMode={sortMode}
        setSortMode={setSortMode}
        totalProperties={result.totalProperties || 0}
      />
      <InsightsSection />
      <Footer />
    </div>
  );
}
