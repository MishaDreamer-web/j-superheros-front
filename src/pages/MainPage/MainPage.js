import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuperheroCard } from '../../components/SuperheroCard/SuperheroCard';
import { getAllSuperheros } from '../../redux/features/superhero/superheroSlice';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { superheros } = useSelector(state => state.superhero);

  useEffect(() => {
    dispatch(getAllSuperheros());
  }, [dispatch]);

  if (!superheros) {
    return (
      <div className="text-xl text-center text-white py-10">
        Superheros not found!
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col mx-auto gap-10 ">
          {superheros?.map(superhero => (
            <SuperheroCard key={superhero.id} superhero={superhero} />
          ))}
        </div>
      </div>
    </div>
  );
};
