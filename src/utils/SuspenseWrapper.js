import React, { Suspense } from 'react';

const SuspenseWrapper = ({ children, fallback = "Loading..." }) => {
  return (
    <Suspense fallback={<div cl></div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
