import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const activeStyle = {
    color: 'white',
  };

  return (
    <div className="flex py-4 justify-between items-center text-2xl text-blue-600">
      <span className="flex justify-center items-center p-6 bg-gray-500 text-xs text-white rounded-sm">
        Superheroes
      </span>

      <ul className="flex gap-8 p-2">
        <li>
          <NavLink
            to={'/'}
            href="/"
            className="text-xs text-gray-400 hover:text-white"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Main Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/new'}
            href="/"
            className="text-xs text-gray-400 hover:text-white"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Add Superhero
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
