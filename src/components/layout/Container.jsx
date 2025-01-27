const Container = ({ children }) => {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    );
  };
  
  export default Container;