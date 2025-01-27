const Button = ({ children, variant = 'primary', onClick, disabled }) => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white'
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${variants[variant]}
          px-4 py-2 rounded-lg font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
      >
        {children}
      </button>
    );
  };
  
  export default Button;