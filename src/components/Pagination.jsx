import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3; // Number of page numbers to show on each side of the current page

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - visiblePages);
    let endPage = Math.min(totalPages, currentPage + visiblePages);

    // Adjust startPage and endPage if they are at the start or end of pagination
    if (currentPage <= visiblePages) {
      endPage = Math.min(visiblePages * 2 + 1, totalPages);
    } else if (currentPage >= totalPages - visiblePages) {
      startPage = Math.max(totalPages - visiblePages * 2, 1);
    }

    // Add "<<" to go to the first page
    if (currentPage > 1) {
      pageNumbers.push(
        <span key="first" className="pagination-link" onClick={() => onPageChange(1)}>
          &lt;&lt;
        </span>
      );
    }

    // Add "<" to go to the previous page
    if (currentPage > 1) {
      pageNumbers.push(
        <span key="prev" className="pagination-link" onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </span>
      );
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`pagination-link ${i === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }

    // Add ">" to go to the next page
    if (currentPage < totalPages) {
      pageNumbers.push(
        <span key="next" className="pagination-link" onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </span>
      );
    }

    // Add ">>" to go to the last page
    if (currentPage !== totalPages && totalPages !== 0) {
      pageNumbers.push(
        <span
          key="last"
          className="pagination-link"
          onClick={() => onPageChange(totalPages)}
        >
          &gt;&gt;
        </span>
      );
    }

    return pageNumbers;
  };

  return <div className="pagination">{getPageNumbers()}</div>;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
