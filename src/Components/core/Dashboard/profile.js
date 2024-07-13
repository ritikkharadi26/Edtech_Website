import React from 'react';
import ErrorBoundary from '../../common/errorBoundry';
import MyProfile from './MyProfile';

function App() {
  return (
    <ErrorBoundary>
      <MyProfile />
    </ErrorBoundary>
  );
}

export default App;
