import React from 'react';
import { Link } from 'react-router-dom';

export const SuperheroCard = ({ superhero }) => {
  if (!superhero) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }

  return (
    <Link to={`/${superhero.id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={
            superhero?.images.length > 0
              ? 'flex rounded-sm h-80'
              : 'flex rounded-sm'
          }
        >
          {superhero?.images.length > 0 && (
            <img
              src={`http://localhost:3002/${superhero.images[0]}`}
              alt={superhero?.nickname}
              className="object-cover w-56"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2"></div>
        <div className="text-white text-xl">{superhero.nickname}</div>
      </div>
    </Link>
  );
};
