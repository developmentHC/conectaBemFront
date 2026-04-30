"use client";

import { Button } from "@mui/material";
import { HelpIcon, InfoIcon } from "../../../public/images/icons";
import type { ModalChangeAccountTypeProps } from "./types";

export const ModalChangeAccountType: React.FC<ModalChangeAccountTypeProps> = ({
  setChangeAccountTypeOpen,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setChangeAccountTypeOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="mx-4 w-full max-w-3xl rounded-lg bg-white p-6">
        <h2 className="mb-3 font-semibold text-black text-xl leading-[130%]">Troca de Perfil</h2>
        <p className="mb-4 text-[#1D1B20]">
          Tem certeza que deseja mudar para o perfil de paciente?
        </p>
        <div className="flex space-x-1">
          <InfoIcon className="fill-[#253E99]" height={20} width={20} />
          <p className="mb-6 text-gray-600 text-sm">
            Caso não possua cadastro, você será redirecionado para a área de cadastro de paciente.
          </p>
        </div>

        <div className="flex flex-col justify-end gap-2 capitalize">
          <Button variant="outlined" color="primary" size="large">
            Mudar para paciente
          </Button>
          <Button variant="outlined" color="primary" size="large">
            Não mudar
          </Button>
        </div>
        <div className="mt-10 flex space-x-1">
          <HelpIcon className="fill-[#77737B]" height={20} width={17} />
          <p className="text-gray-600 text-sm">
            Saiba mais sobre os perfis disponíveis no ConectaBem
          </p>
        </div>
      </div>
    </div>
  );
};
