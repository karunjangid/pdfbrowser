import React from 'react';
import '../components/PDFReader.css';

function PDFReader({ pdf }) {
  return (
    <div className="pdf-reader">
      <h2>{pdf.name}</h2>
      <iframe src={pdf.link} title={pdf.name} width="100%" height="600px" />
    </div>
  );
}

export default PDFReader;
