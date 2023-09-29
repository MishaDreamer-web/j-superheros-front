import React from 'react';
import { Navbar } from '../Navbar/Navbar';

export const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <Navbar />
        {children}
      </div>
    </>
  );
};
