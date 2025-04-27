'use client'

import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import mock from "./mock.json";

export const PersonalAddress = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer text-lg w-fit">
      <span>Rua Fulaninho, 000, cidade, estado</span>
      <button
        onClick={openModal}
      >
        <MdOutlineEdit className="text-blue-secondary" />
      </button>
    </div>
  )
}