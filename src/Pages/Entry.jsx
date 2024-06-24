import { Link } from 'react-router-dom';
import BackgroundComponent from '../Background/BackgroundComponent';

const Entry = () => {
  return (
    <div>
      <BackgroundComponent />
      <div className="relative flex flex-column items-center justify-center h-100vh text-white">
        <h1>Hello World</h1>
        <Link to="/Home">
          <button>View Books</button>
        </Link>
      </div>
    </div>
  );
};

export default Entry;
