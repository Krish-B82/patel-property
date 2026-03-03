export default function BudgetSection({ budget, setBudget, sortMode, setSortMode, totalProperties }) {
  return (
    <section className="section light">
      <div className="section-header">
        <h3>Search By Budget</h3>
        <label>
          Sort by budget:&nbsp;
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
            <option value="default">Default</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </label>
      </div>

      <div className="budget-box">
        <label>Budget in ₹</label>
        <input
          type="range"
          min="2000000"
          max="20000000"
          step="100000"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <p>Up to ₹{Math.round(budget / 100000)}L</p>
      </div>
      <button className="properties-count">{totalProperties} Properties</button>
    </section>
  );
}
