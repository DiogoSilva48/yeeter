import React from 'react';

function HackedPage() {
  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'GET',
        credentials: 'same-origin', // Ensure credentials are included for session-based authentication
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

  const rainbowStyle = {
    animation: 'rainbow 10s linear infinite',
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={rainbowStyle}
    >
      {/* Text on top */}
      <h1 className="text-4xl text-white font-bold mb-8">
        Acabaste de ser hackeado!
      </h1>
      {/* GIF below */}
      <img
        className="rounded-xl"
        src="https://media1.tenor.com/m/CgGUXc-LDc4AAAAC/hacker-pc.gif"
        alt="Hacking GIF"
      />
      <div className="flex mt-10 justify-end">
        <button
          onClick={handleSignOut}
          className="flex w-full justify-center rounded-md bg-darkGreyCustom px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverDarkGreyCustom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign out
        </button>
      </div>
      <style>
        {`
          @keyframes rainbow {
            0% { background: #ff0000; }
            16.666% { background: #ff8000; }
            33.333% { background: #ffff00; }
            50% { background: #00ff00; }
            66.666% { background: #0000ff; }
            83.333% { background: #8000ff; }
            100% { background: #ff0000; }
          }
        `}
      </style>
    </div>
  );
}

export default HackedPage;
