import './BackgroundComponent.css';

const BackgroundComponent = () => {
  return (
    <div className="background-container">
      <div className="fixed">
        <div className="absolute inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-10px opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundComponent;
