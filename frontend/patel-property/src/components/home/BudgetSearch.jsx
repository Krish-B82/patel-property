import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import { useTranslation } from '../../utils/translations';

const BudgetSearch = () => {
    const [selectedBudget, setSelectedBudget] = useState('');
    const [customMin, setCustomMin] = useState('');
    const [customMax, setCustomMax] = useState('');
    const navigate = useNavigate();
    const t = useTranslation();

    const budgetRanges = [
        { label: '₹20L - ₹40L', min: 2000000, max: 4000000 },
        { label: '₹40L - ₹60L', min: 4000000, max: 6000000 },
        { label: '₹60L - ₹80L', min: 6000000, max: 8000000 },
        { label: '₹80L - ₹1Cr', min: 8000000, max: 10000000 },
        { label: '₹1Cr - ₹2Cr', min: 10000000, max: 20000000 },
        { label: '₹2Cr+', min: 20000000, max: null },
    ];

    const handleBudgetClick = (budget) => {
        setSelectedBudget(budget.label);
        const params = new URLSearchParams();
        params.set('minPrice', budget.min);
        if (budget.max) params.set('maxPrice', budget.max);
        navigate(`/search?${params.toString()}`);
    };

    const handleCustomSearch = (e) => {
        e.preventDefault();
        if (customMin || customMax) {
            const params = new URLSearchParams();
            if (customMin) params.set('minPrice', customMin);
            if (customMax) params.set('maxPrice', customMax);
            navigate(`/search?${params.toString()}`);
        }
    };

    return (
        <div className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                        {t('searchByBudget')}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        {t('budgetSubtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
                    {budgetRanges.map((budget, index) => (
                        <button
                            key={index}
                            onClick={() => handleBudgetClick(budget)}
                            className={`p-4 rounded-lg font-semibold text-sm sm:text-base transition ${
                                selectedBudget === budget.label
                                    ? 'bg-primary text-black shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-primary hover:text-black hover:shadow-md'
                            }`}
                        >
                            {budget.label}
                        </button>
                    ))}
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                        <IndianRupee className="w-5 h-5" />
                        {t('customBudget')}
                    </h3>
                    <form onSubmit={handleCustomSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <input
                            type="number"
                            value={customMin}
                            onChange={(e) => setCustomMin(e.target.value)}
                            placeholder={t('minBudget')}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        />
                        <input
                            type="number"
                            value={customMax}
                            onChange={(e) => setCustomMax(e.target.value)}
                            placeholder={t('maxBudget')}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition whitespace-nowrap text-sm sm:text-base"
                        >
                            {t('searchButton')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BudgetSearch;