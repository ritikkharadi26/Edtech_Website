import React, { Suspense } from 'react';

const LazyImage = ({ src, alt, className, setImageLoaded }) => {
  return (
    <Suspense fallback={<div className="aspect-square w-[165px] h-[160px] rounded-md object-cover bg-gray-300" />}>
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setImageLoaded(true)}
        loading="lazy" // Enable lazy loading
      />
    </Suspense>
  );
};

export default LazyImage;
