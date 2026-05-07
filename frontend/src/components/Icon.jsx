// Icon.jsx — stroked SVG icon from ICONS path
import React from 'react';

function Icon({ path, size = 20, stroke = 1.75, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
  );
}

export default Icon;
