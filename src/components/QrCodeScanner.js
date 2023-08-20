import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRCodeScanner = () => {
  const [qrData, setQRData] = useState('');

  const handleScan = (data) => {
    if (data) {
      setQRData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const previewStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '500px',
    margin: '0 auto',
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
      />
      <p>{qrData}</p>
    </div>
  );
};

export default QRCodeScanner;