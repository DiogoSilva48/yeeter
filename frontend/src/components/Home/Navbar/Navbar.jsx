import React from 'react';
import {
  FiHome,
  FiSearch,
  FiBell,
  FiMail,
  FiBookmark,
  FiUsers,
  FiSettings,
} from 'react-icons/fi';

import Logout from './Logout';

const ListItem = ({ icon: Icon, text }) => {
  return (
    <li className="ml-8 mr-8">
      <a
        href="#"
        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-8 hover:rounded-xl border-transparent hover:border-blue-400 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4 mr-5">
          <Icon className="w-5 h-5" />
        </span>
        <span className="ml-2 tracking-wide truncate">{text}</span>
      </a>
    </li>
  );
};

function Sidebar() {
  const listItems = [
    { icon: FiHome, text: 'Home' },
    { icon: FiSearch, text: 'Explore' },
    { icon: FiBell, text: 'Notifications' },
    { icon: FiMail, text: 'Messages' },
    { icon: FiBookmark, text: 'Bookmarks' },
    { icon: FiUsers, text: 'Groups' },
    { icon: FiSettings, text: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col w-1/6 bg-gray-50 h-full border-r">
        <div className="flex justify-center mt-2">
          <span className="text-black custom-yeeter-logo select-none">Y</span>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {listItems.map((item, index) => (
              <ListItem key={index} icon={item.icon} text={item.text} />
            ))}
          </ul>
        </div>
        <Logout />
      </div>
    </div>
  );
}

export default Sidebar;
