import React from 'react';

const WhitePaper = () => {
  return (
    <div className="whitepaper-section">
      <h2>Whitepaper</h2>
      <p>Click below to view our Whitepaper:</p>
      <iframe
        title="Whitepaper"
        src="whitePaper.pdf"
        style={{ width: '100%', height: '600px', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default WhitePaper;

