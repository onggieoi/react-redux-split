import React, { lazy, Suspense } from 'react';
import LoadingIndicator from 'src/components/LoadingIndicator';

const loadable = (importFunc: any) => {
  const LazyComponent = lazy(importFunc);
  const fallback = <LoadingIndicator />

  return (props: any) => (
    <Suspense fallback={fallback} >
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
