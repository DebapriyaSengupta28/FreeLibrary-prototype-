import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import BackgroundComponent from '../Background/BackgroundComponent';
import './Home.css'; // Import the Home CSS file

// Create a unique hash for each file name
const createHash = (fileName) => {
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    const charCode = fileName.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash); // Ensure the hash is non-negative
};

// Create a mapping from filenames to unique IDs
const createFileIdMapping = (files) => {
  const mapping = {};
  files.forEach((file) => {
    const id = createHash(file);
    mapping[id] = file;
  });
  return mapping;
};

const Home = () => {
  const [fileIdMapping, setFileIdMapping] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(15); // Change the number of books per page here

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await fetch('/api/books');
        const files = await response.json();
        setFileIdMapping(createFileIdMapping(files));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchPdfFiles();
  }, []);

  // Get current files
  const fileKeys = Object.keys(fileIdMapping);
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = fileKeys.slice(indexOfFirstFile, indexOfLastFile);

  // Change page
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <BackgroundComponent />
      <div className="pdf-list-container">
        <div className="pdf-list">
          {currentFiles.map((id) => (
            <div key={id} className="pdf-item">
              <Link to={`/BookPage/${id}`} className="pdf-name">
                {fileIdMapping[id].replace('.pdf', '')}
              </Link>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(fileKeys.length / filesPerPage)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Home;
