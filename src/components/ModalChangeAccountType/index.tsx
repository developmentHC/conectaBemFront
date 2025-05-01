"use client";

import { Button } from "@mui/material";
import { HelpIcon, InfoIcon } from "../../../public/images/icons";
import { ModalChangeAccountTypeProps } from "./types";

export const ModalChangeAccountType: React.FC<ModalChangeAccountTypeProps> = ({ setChangeAccountTypeOpen }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setChangeAccountTypeOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="bg-white max-w-3xl w-full rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 leading-[130%] text-black">Troca de Perfil</h2>
        <p className="mb-4 text-[#1D1B20]">
          Tem certeza que deseja mudar para o perfil de paciente?
        </p>
        <div className="flex space-x-1">
          <InfoIcon className="fill-[#253E99]" height={20} width={20} />
          <p className="text-sm text-gray-600 mb-6">
            Caso não possua cadastro, você será redirecionado para a área de cadastro de paciente.
          </p>
        </div>

        <div className="flex flex-col justify-end gap-2 capitalize">
          <Button
            variant="outlined"
            color="primary"
            size="large"
          >
            Mudar para paciente
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
          >
            Não mudar
          </Button>
        </div>
        <div className="flex space-x-1 mt-10">
          <HelpIcon className="fill-[#77737B]" height={20} width={17} />
          <p className="text-sm text-gray-600">Saiba mais sobre os perfis disponíveis no ConectaBem</p>
        </div>
      </div>
    </div>
  );
};