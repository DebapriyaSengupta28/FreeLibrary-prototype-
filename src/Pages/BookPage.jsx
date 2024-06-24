import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Create a unique hash for each file name
const createHash = (fileName) => {
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    const charCode = fileName.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash); // Ensure the hash is non-negative
};

// Create a mapping from IDs to filenames
const createIdFileMapping = (files) => {
  const mapping = {};
  files.forEach((file) => {
    const id = createHash(file);
    mapping[id] = file;
  });
  return mapping;
};

const BookPage = () => {
  const { fileId } = useParams();
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await fetch('/api/books');
        const files = await response.json();
        const fileIdMapping = createIdFileMapping(files);
        setFileName(fileIdMapping[fileId]);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchPdfFiles();
  }, [fileId]);

  if (!fileName) return <div>Loading...</div>;

  const [bookName, authorName] = fileName.split(' - ');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/books/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="book-page">
      <h2>{bookName}</h2>
      <p>By {authorName && authorName.replace('.pdf', '')}</p>
      <button className="download-button" onClick={handleDownload}>
        Download PDF
      </button>
      <a href={`/books/${fileName}`} target="_blank" rel="noopener noreferrer">
        <button className="open-button">Open PDF</button>
      </a>
    </div>
  );
};

export default BookPage;
