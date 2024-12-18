import React, { useState, useEffect } from 'react';
import '../components/PDFList.css';

const ITEMS_PER_PAGE = 5;

function PDFList({ pdfs, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPdfs, setFilteredPdfs] = useState(pdfs);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = pdfs.filter(pdf =>
      pdf.name.toLowerCase().includes(lowercasedFilter) ||
      (pdf.author && pdf.author.toLowerCase().includes(lowercasedFilter)) ||
      (pdf.published && pdf.published.toString().includes(lowercasedFilter))
    );
    setFilteredPdfs(filteredData);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, pdfs]);

  const totalPages = Math.ceil(filteredPdfs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPdfs = filteredPdfs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pdf-list">
      <input
        type="text"
        placeholder="Search PDFs by title, author, or year"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul>
        {currentPdfs.map(pdf => (
          <li key={pdf.link} onClick={() => onSelect(pdf)} className="pdf-item">
            <img src={`https://via.placeholder.com/50x70?text=${pdf.name.charAt(0)}`} alt={`${pdf.name} cover`} />
            <div className="pdf-details">
              <h3>{pdf.name}</h3>
              <p>{pdf.author}</p>
              <p>{pdf.published ? `Published: ${pdf.published}` : ''}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-btn ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PDFList;
