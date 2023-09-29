import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { updateSuperhero } from '../../redux/features/superhero/superheroSlice';

export const EditSuperheroPage = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchSuperhero = useCallback(async () => {
    const { data } = await axios.get(`/superheros/${params.id}`);
    const superhero = data.data.superhero;

    setNickname(superhero.nickname);
    setName(superhero.real_name);
    setDescription(superhero.origin_description);
    setSuperpowers(superhero.superpowers);
    setCatchphrase(superhero.catch_phrase);
    setOldImage(superhero.images);
  }, [params.id]);

  const onSubmit = () => {
    try {
      const dataSuperhero = new FormData();
      dataSuperhero.append('nickname', nickname);
      dataSuperhero.append('real_name', name);
      dataSuperhero.append('origin_description', description);
      dataSuperhero.append('superpowers', superpowers);
      dataSuperhero.append('catch_phrase', catchphrase);
      dataSuperhero.append('id', params.id);
      dataSuperhero.append('images', newImage);

      dispatch(updateSuperhero(dataSuperhero));
      toast('Superhero has been updated');

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onClearForm = () => {
    setNickname('');
    setName('');
    setDescription('');
    setSuperpowers('');
    setCatchphrase('');
    setNewImage('');

    navigate(`/${params.id}`);
  };

  useEffect(() => {
    fetchSuperhero();
  }, [fetchSuperhero]);

  return (
    <form className="w-80 mx-auto py-10" onSubmit={e => e.preventDefault()}>
      <div className="flex flex-col object-cover p-2">
        {newImage && <img src={URL.createObjectURL(newImage)} alt={nickname} />}
      </div>

      <label className="text-gray-300 p-2 bg-gray-500 text-xs mt-2 flex items-center border-2 border-dotted cursor-pointer">
        Add image
        <input
          type="file"
          className="hidden"
          onChange={e => {
            setNewImage(e.target.files[0]);
          }}
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Superhero nickname
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Nickname"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Superhero real name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Real name"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Origin description
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="mt-1 text-black w-full h-32 rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none  placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Superpowers
        <textarea
          value={superpowers}
          onChange={e => setSuperpowers(e.target.value)}
          placeholder="List of superpowers"
          className="mt-1 text-black w-full h-32 rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none  placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Catch phrase
        <textarea
          value={catchphrase}
          onChange={e => setCatchphrase(e.target.value)}
          placeholder="Superhero catch phrase"
          className="mt-1 text-black w-full h-32 rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none  placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center m-4">
        <button
          onClick={onSubmit}
          className="flex items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4 hover:opacity-80"
        >
          Update
        </button>
        <button
          onClick={onClearForm}
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4 hover:opacity-80"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
