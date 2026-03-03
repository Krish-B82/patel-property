import PropertyCard from './PropertyCard';

export default function LatestPropertiesSection({ properties, loading, page, totalPages, onPageChange }) {
  return (
    <section id="latest" className="section">
      <div className="section-header">
        <div>
          <h3>Latest in Vadodara</h3>
          <p>Newly added</p>
        </div>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <>
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="pager">
            <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>‹</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === page ? 'active' : ''}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>›</button>
          </div>
        </>
      )}
    </section>
  );
}
