// ImageFit.jsx — image that always shows fully; mismatched aspect ratios get a blurred copy as backdrop.
import React from 'react';

function ImageFit({ src, alt = '', aspectRatio, className = '', loading = 'lazy' }) {
  const sizing = aspectRatio ? 'w-full' : 'w-full h-full';
  return (
    <div
      className={`relative overflow-hidden bg-surface ${sizing} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={loading}
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70 pointer-events-none select-none"
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="relative w-full h-full object-contain"
      />
    </div>
  );
}

export default ImageFit;
