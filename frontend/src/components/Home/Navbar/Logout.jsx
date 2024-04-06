import React, { useState, useEffect } from 'react';

const Logout = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/user', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchLoggedInUserInfo();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Redirect the user to the login page or perform any other action after logout
      window.location.href = '/signin'; // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="absolute bottom-0 w-full">
      <div className="px-4 py-2 my-4 flex items-center justify-between">
        {user && (
          <div className="flex items-center">
            <img
              src={user.profilePic}
              alt="Profile Pic"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-bold">{user.fullName}</p>
              <p className="text-xs">@{user.username}</p>
            </div>
          </div>
        )}
        <button
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-400"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
