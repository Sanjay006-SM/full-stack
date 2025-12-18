import React from 'react';

const Icon = ({ src, size = '48px', alt = 'Icon' }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
};

export default Icon;
