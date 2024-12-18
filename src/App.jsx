import React, { useState, useEffect } from 'react';
import PDFList from './components/PDFList';
import PDFReader from './components/PDFReader';
import './App.css';

function App() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.npoint.io/dee51ea017d20efdfcc8')
      .then(response => response.json())
      .then(data => {
        setPdfs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <>
          <PDFList pdfs={pdfs} onSelect={setSelectedPdf} />
          {selectedPdf && <PDFReader pdf={selectedPdf} />}
        </>
      )}
    </div>
  );
}

export default App;
