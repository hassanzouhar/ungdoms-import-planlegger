import React from 'react';

const Input = ({ type, placeholder, value, onChange, style }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
    />
  );
};

export default Input;
