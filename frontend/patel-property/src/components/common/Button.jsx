const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  disabled = false 
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-primary hover:bg-yellow-500 text-black',
    whatsapp: 'bg-green-500 hover:bg-green-600 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-black',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;