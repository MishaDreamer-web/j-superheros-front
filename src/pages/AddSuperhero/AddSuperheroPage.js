import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createSuperhero } from '../../redux/features/superhero/superheroSlice';

export const AddSuperheroPage = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    try {
      const data = new FormData();
      data.append('nickname', nickname);
      data.append('real_name', name);
      data.append('origin_description', description);
      data.append('superpowers', superpowers);
      data.append('catch_phrase', catchphrase);
      data.append('images', image);

      dispatch(createSuperhero(data));
      toast('Superhero has been added');

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
    setImage('');
  };

  return (
    <form className="w-80 mx-auto py-10" onSubmit={e => e.preventDefault()}>
      <label className="text-gray-300 p-2 bg-gray-500 text-xs mt-2 flex items-center border-2 border-dotted cursor-pointer">
        Add image
        <input
          type="file"
          className="hidden"
          onChange={e => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex object-cover p-2">
        {image && <img src={URL.createObjectURL(image)} alt="superhero" />}
      </div>

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
          Add
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
