import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeSuperhero } from '../../redux/features/superhero/superheroSlice';
import axios from '../../utils/axios';

export const SuperheroPage = () => {
  const [superhero, setSuperhero] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const onRemoveSuperhero = () => {
    try {
      dispatch(removeSuperhero(params.id));
      toast('Superhero has been deleted');

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuperhero = useCallback(async () => {
    const { data } = await axios.get(`/superheros/${params.id}`);
    setSuperhero(data.data.superhero);
  }, [params.id]);

  useEffect(() => {
    fetchSuperhero();
  }, [fetchSuperhero]);

  if (!superhero) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }

  return (
    <div>
      <Link to={'/'} className="flex">
        <button className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4">
          Go Back
        </button>
      </Link>

      <div className="flex gap-8 py-8">
        <div className="w-auto mx-auto">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                superhero?.images.length > 0
                  ? 'flex rounded-sm h-auto'
                  : 'flex rounded-sm'
              }
            >
              {superhero.images.length > 0 &&
                superhero.images.map(superheroImage => (
                  <div className="" key={superheroImage}>
                    <img
                      src={`http://localhost:3002/${superheroImage}`}
                      alt="superhero"
                      className="object-contain w-56 "
                    />
                  </div>
                ))}
            </div>

            <div className="text-white text-xl mb-4">{superhero.nickname}</div>
            <div className="text-white text-xl mb-2">{superhero.real_name}</div>
            <div className="text-white text-sm mb-2">
              {superhero.origin_description}
            </div>
            <div className="text-white text-sm mb-2">
              {superhero.superpowers}
            </div>
            <div className="text-white text-sm mb-2">
              {superhero.catch_phrase}
            </div>

            <div className="flex gap-4 ">
              <Link to={`/${params.id}/edit`}>
                <button className="flex items-center justify-center gap-2 text-white opacity-50 hover:text-yellow-500">
                  Edit
                </button>
              </Link>
              <button
                onClick={onRemoveSuperhero}
                className="flex items-center justify-center gap-2 text-white opacity-50 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
