export default function PopularAreasSection({ areaCounts }) {
  return (
    <section className="section tinted">
      <h3>Popular Areas In Vadodara</h3>
      <div className="areas-grid">
        {areaCounts.map(({ area, count }) => (
          <div key={area} className="area-card">
            <h4>{area}</h4>
            <p>{count} Properties</p>
          </div>
        ))}
      </div>
    </section>
  );
}
