import React, { Suspense, lazy } from 'react';
import SimpleSpinner from '../components/spinner/Spinner';

// Carga diferida del componente UserProfile
const UserProfile = lazy(() => import('../components/UserProfile'));


const PageUser = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
        <Suspense fallback={<SimpleSpinner />}>
            <UserProfile />
        </Suspense>
    </main>
  );
}

export default PageUser;
