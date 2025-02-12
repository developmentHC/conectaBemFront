"use client"

import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { LuMessageCircleQuestion } from "react-icons/lu";

const PatientRegistration1: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; birthDate?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; birthDate?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!birthDate.trim()) newErrors.birthDate = 'Birth date is required.';
    else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
      newErrors.birthDate = 'Date format must be DD/MM/YYYY.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      alert(`Patient Registered: ${name}, Birth Date: ${birthDate}`);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-10">
      
      <div className="w-full max-w-md p-6 shadow-xl bg-white rounded-md">
      <div className='mb-6'><FaArrowLeft /></div>
        <h1 className="text-2xl font-semibold text-black-400 mb-4">Cadastro de Paciente</h1>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-4">etapa 1/4</label>
          <div className="relative bg-blue-200 w-full h-1 mb-4">
            <div className="absolute inset-0 bg-blue-700 w-[25%] h-[100%]"></div>
          </div>
        <p className="text-black-400 mb-6">
          Aqui você irá inserir suas informações iniciais. Para cadastrar dados complementares, acesse Perfil &gt; Editar informações.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black-400">Nome <label className='text-red-500'>*</label></label>
            <input
              id="name"
              type="text"
              placeholder="Nome e Sobrenome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-black-400">Data de Nascimento <label className='text-red-500'>*</label></label>
            <input
              id="birthDate"
              type="text"
              placeholder="DD/MM/AAAA"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`mt-1 block w-full p-2 border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700">
            <p className='text-buttonColor'>Continuar</p> 
          </button>
        </form>
        
        <div className="mt-6 text-left text-sm text-gray-400 flex items-start space-x-1">
          <LuMessageCircleQuestion size={20} /><a href="#">Precisa de ajuda?</a>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration1;