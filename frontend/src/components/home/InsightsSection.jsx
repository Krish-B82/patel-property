const insights = [
  {
    title: 'Best Areas to Live in Vadodara',
    text: 'Compare Alkapuri, Vasna, Gotri and emerging residential pockets by connectivity, schools, safety and rental demand.'
  },
  {
    title: 'Things to Check Before Buying',
    text: 'Always verify legal title, RERA details, society NOCs, expected possession timeline, and total registration cost before booking.'
  },
  {
    title: 'Investment Guide for Vadodara',
    text: 'Look for infrastructure corridors, nearby commercial growth, and long-term rental potential to maximize return on investment.'
  }
];

export default function InsightsSection() {
  return (
    <section className="section tinted">
      <h3>Vadodara Property Insights</h3>
      <p className="muted">Expert Tips & Guides</p>
      <div className="insights-grid">
        {insights.map((insight) => (
          <article key={insight.title} className="insight-card">
            <h4>{insight.title}</h4>
            <p>{insight.text}</p>
            <button>Read Guide</button>
          </article>
        ))}
      </div>
    </section>
  );
}
