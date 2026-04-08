import { useState } from 'react';
import { INSIGHTS } from '../../utils/constants';
import { X } from 'lucide-react';

const Insights = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const closeModal = () => setSelectedInsight(null);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-secondary relative">
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
              onClick={() => setSelectedInsight(insight)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
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

      {/* Pop-up Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border-l-8 border-yellow-500 shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Sticky Close Button */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-5 border-b border-gray-100 flex justify-between items-center z-10 rounded-t-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{selectedInsight.icon}</span>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{selectedInsight.title}</h2>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 bg-gray-50 hover:bg-red-50 rounded-full transition-colors group"
                title="Close Guide"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Modal Content / Small Format Blogs */}
            <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
              {selectedInsight.sections.map((sec, idx) => (
                <div key={idx} className="bg-orange-50/40 p-4 sm:p-5 rounded-xl border border-orange-100 hover:border-yellow-300 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 flex-shrink-0"></span>
                    {sec.heading}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-4 sm:pl-5">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Subtle Footer */}
            <div className="px-6 py-4 bg-gray-50 text-center text-xs text-gray-500 rounded-b-xl border-t border-gray-100">
              Vadodara Real Estate Insights
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Insights;