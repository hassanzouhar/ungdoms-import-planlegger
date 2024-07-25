import React from 'react';

const Card = ({ children, style }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px', ...style }}>
      {children}
    </div>
  );
};

export default Card;

