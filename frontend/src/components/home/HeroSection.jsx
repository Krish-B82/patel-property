import { FiSearch } from 'react-icons/fi';

export default function HeroSection({ searchText, setSearchText, onSearch }) {
  return (
    <section className="hero">
      <h2>Discover the right property in Vadodara.</h2>
      <p>Residential • Commercial • Plots</p>
      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <FiSearch />
        <input
          placeholder="Search by area, Property type, or budget"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </section>
  );
}
