import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaHeart } from "react-icons/fa";
import { useProfessional } from "./ProfessionalContext";

export const ProfessionalData = () => {
  const [favorite, setFavorite] = useState(false);
  const professional = useProfessional();

  return (
    <div className="flex flex-col gap-[5.5px] w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{professional.name}</h2>
        {!favorite && (
          <CiHeart
            onClick={() => setFavorite(true)}
            className="text-xl text-blue-600 h-[20px] w-[20px]"
          />
        )}
        {favorite && (
          <FaHeart
            onClick={() => setFavorite(false)}
            className="text-lg text-blue-600 h-[20px] w-[20px]"
          />
        )}
      </div>
      <div className="flex gap-1 items-center">
        <span>{professional.rating}</span>
        <FaStar className="text-yellow-400" />
        <span className="text-gray-500">
          ({professional.reviews} avaliações)
        </span>
      </div>
      <span className="text-gray-500">{professional.specialization}</span>
      <div className="flex gap-3 items-center text-gray-500">
        <span>{professional.price}</span>
        <span>|</span>
        <span>{professional.distance} km</span>
      </div>
    </div>
  );
};
