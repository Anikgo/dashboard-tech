import { Sidebar } from './Sidebar';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Layout() {
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const loginMode = localStorage.getItem('loginMode');
    // Only redirect if we're not already on the home page
    if (!loginMode && location.pathname !== '/') {
      setShouldRedirect(true);
    }
  }, [location.pathname]); // Re-run when path changes

  if (shouldRedirect) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <main className='flex-1 overflow-auto pt-0 md:pt-0'>
        <Outlet />
      </main>
    </div>
  );
}
