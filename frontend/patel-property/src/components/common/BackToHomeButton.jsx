import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 px-4 py-2 mb-4 bg-primary text-black font-semibold rounded-lg shadow hover:bg-yellow-400 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Home
    </button>
  );
};

export default BackToHomeButton;
