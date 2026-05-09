// ImageFit.jsx — image that always shows fully; mismatched aspect ratios get a blurred copy as backdrop.
import React from 'react';
import { Spinner } from '../ui/Spinner';

function ImageFit({ src, alt = '', aspectRatio, className = '', loading = 'lazy' }) {
  const sizing = aspectRatio ? 'w-full' : 'w-full h-full';
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => { setLoaded(false); }, [src]);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setLoaded(true);

  return (
    <div
      className={`relative overflow-hidden bg-surface ${sizing} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-primary z-10">
          <Spinner size={24} />
        </div>
      )}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70 pointer-events-none select-none transition-opacity duration-300 ${loaded ? '' : 'opacity-0'}`}
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`relative w-full h-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default ImageFit;
