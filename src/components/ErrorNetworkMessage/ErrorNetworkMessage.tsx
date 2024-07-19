import React from 'react';

interface ErrorNetworkMessageProps {
  message: string;
}

const ErrorNetworkMessage: React.FC<ErrorNetworkMessageProps> = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
      {message}
    </div>
  );
};

export default ErrorNetworkMessage;