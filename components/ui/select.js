import React from 'react';

const Select = ({ children, value, onChange, style }) => {
  return (
    <select value={value} onChange={onChange} style={style}>
      {children}
    </select>
  );
};

export default Select;

