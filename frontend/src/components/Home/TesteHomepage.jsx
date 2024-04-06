import React from 'react';
import Navbar from './Navbar/Navbar.jsx';
import Yeet from './Yeets/Yeets.jsx';

const TesteHomePage = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <Navbar />
      <div className="w-3/6 flex flex-col bg-gray-100 p-8 border-r border-gray-200">
        <div className="container mx-auto p-4">
          <Yeet
            fullName="Diogo Silva"
            username="DiogoS48"
            tweetText="Hello World!"
          />
        </div>
      </div>
      <div className="w-2/6 flex flex-col bg-gray-100 p-8"></div>
    </div>
  );
};

export default TesteHomePage;
