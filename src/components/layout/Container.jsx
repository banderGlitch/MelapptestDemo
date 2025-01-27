import '../../styles/Container.css';

const Container = ({ children }) => {
  return (
    <div className="container-wrapper">
      <div className="container-content">
        {children}
      </div>
    </div>
  );
};

export default Container;