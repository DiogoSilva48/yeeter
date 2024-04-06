// app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TesteHomepage from '@/components/Home/TesteHomepage';

function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:4000/check-auth', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          // User is authenticated
          setIsAuthenticated(true);
        } else {
          // User is not authenticated, redirect to signin page
          setIsAuthenticated(false);
          router.push('/signin');
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        // Redirect to signin page in case of error
        setIsAuthenticated(false);
        router.push('/signin');
      }
    };

    checkAuthentication();
  }, [router]);

  // Render HackedPage if authenticated
  if (isAuthenticated) {
    return <TesteHomepage />;
  }

  // By default, render nothing
  return null;
}

export default HomePage;
