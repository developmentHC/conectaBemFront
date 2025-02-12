// "use client"

// import { WelcomeSectionHeader } from '@/components/WelcomeSectionHeader';
// import React, { useState } from 'react';
// import { FaArrowLeft } from "react-icons/fa";
// import { LuMessageCircleQuestion } from "react-icons/lu";



// const PatientRegistration2: React.FC = () => {
//   const [name, setName] = useState<string>('');
//   const [birthDate, setBirthDate] = useState<string>('');
//   const [errors, setErrors] = useState<{ name?: string; birthDate?: string }>({});

//   const validateForm = () => {
//     const newErrors: { name?: string; birthDate?: string } = {};
//     if (!name.trim()) newErrors.name = 'Name is required.';
//     if (!birthDate.trim()) newErrors.birthDate = 'Birth date is required.';
//     else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
//       newErrors.birthDate = 'Date format must be DD/MM/YYYY.';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (validateForm()) {
//       alert(`Patient Registered: ${name}, Birth Date: ${birthDate}`);
//     }
//   };

//   return (
//     <div className="flex justify-center min-h-screen bg-gray-50 py-10 ">
      
//       <div
//         className=" p-6 shadow-xl bg-white rounded-md w-full max-w-[452px] h-full max-h-[691px]"
        
//       >
//         <WelcomeSectionHeader href='link' title='Preferências' progress={60} />
        
//         <h1 className="text-2xl font-semibold text-black-400 mt-4 mb-4">Especialidades <label className='text-red-500'>*</label></h1>
//         <p className="text-black-400 mb-6">
//          Escolha as especialidades que mais pesquisa ou utiliza
//         </p>
//         {/*Especialidades*/}
//         <div className="flex flex-wrap gap-2 mb-4 text-xs">
//         {['Acunputura', 'Aromaterapia', 'Arteterapia', 'Biodança', 'Cromoterapia','Fitoterapia', 'Hipnoterapia', 'Homeoterapia'].map(
//           (category) => (
//             <button
//               key={category}
//               className="border-2 border-blue-800 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-none p-[10px] rounded hover:bg-blue-400"
//             >
//               {category}
//             </button>
//           )
//           )}
//         </div>
//         <div className="flex justify-end mb-4">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-4 right-5">
//             + Ver mais
//           </label>
//         </div>
//         <h1 className="text-2xl font-semibold text-black-400 mb-4">Atendimento <label className='text-red-500'>*</label></h1>
//         <p className="text-black-400 mb-6">
//          Escolha as especialidades que mais pesquisa ou utiliza
//         </p>
//         {/*Especialidades*/}
//         <div className="flex flex-wrap gap-2 mb-4 text-xs">
//         {['Acunputura', 'Aromaterapia', 'Arteterapia', 'Biodança', 'Cromoterapia','Fitoterapia', 'Hipnoterapia', 'Homeoterapia'].map(
//           (category) => (
//             <button
//               key={category}
//               className="border-2 border-blue-800 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-none p-2 rounded hover:bg-blue-400"
//             >
//               {category}
//             </button>
//           )
//           )}
//         </div>
        
//         <div className="mt-6 text-left text-sm text-gray-400 flex items-start space-x-1">
//           <LuMessageCircleQuestion size={20} /><a href="#">Precisa de ajuda?</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientRegistration2;