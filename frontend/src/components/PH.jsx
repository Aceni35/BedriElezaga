// PH.jsx — placeholder image component
import React from 'react';

function PH({ label, ratio = '16/9', className = '', children }) {
  return (
    <div className={'ph flex items-center justify-center ' + className} style={{ aspectRatio: ratio, borderRadius: 'inherit' }}>
      <span className="ph-label">{label}</span>
      {children}
    </div>
  );
}

export default PH;
