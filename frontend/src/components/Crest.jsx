// Crest.jsx — school crest/logo
import React from 'react';

function Crest({ size = 36 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx="20" cy="20" r="19" fill="var(--primary)" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
      <text x="20" y="17" textAnchor="middle" fontFamily="Fraunces" fontSize="9" fontWeight="600" fill="var(--accent)">SH.F</text>
      <text x="20" y="27" textAnchor="middle" fontFamily="Fraunces" fontSize="6" fill="#fff" opacity="0.85">1968</text>
    </svg>
  );
}

export default Crest;
