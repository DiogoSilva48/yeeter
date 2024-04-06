// Tweet.js

import React from 'react';

const Yeet = ({ fullName, username, tweetText, imageUrl }) => {
  return (
    <div className="bg-gray-50 rounded-xl border-l-8 border-blue-400 p-4 shadow-md">
      <div className="flex items-start">
        <img
          src={`/images/testeprofilepic.jpg`}
          alt={username}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-gray-800">{fullName}</span>
            <span className="text-gray-500">@{username}</span>
          </div>
          <p className="text-gray-800">{tweetText}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Tweet Image"
              className="mt-2 rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Yeet;
