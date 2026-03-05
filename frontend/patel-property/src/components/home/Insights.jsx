import { INSIGHTS } from '../../utils/constants';

const Insights = () => {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 text-center sm:text-left">
          Property Buying Guides
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-center sm:text-left">
          Expert tips and insights for smart property investment
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{insight.icon}</div>
              <h3 className="text-lg font-bold text-black mb-2">{insight.title}</h3>
              <p className="text-gray-600 text-sm">{insight.description}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                Read More
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;