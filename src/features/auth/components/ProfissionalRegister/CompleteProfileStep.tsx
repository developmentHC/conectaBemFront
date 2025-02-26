import { MdEdit } from "react-icons/md";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { FaUser } from "react-icons/fa";
import { Button, Checkbox } from "@mui/material";
import { useState } from "react";

export const CompleteProfileStep = () => {
  const [image, setImage] = useState<File | null>(null);
  const { updateFields } = useProfissionalRegisterStore();

  const onChangeImage = (e: any) => {
    if (!e.target.files[0]) return;

    setImage(e.target.files[0]);

    updateFields({ photo: e.target.files[0] });
  };

  return (
    <form className="flex flex-col gap-8">
      <span>
        Terminamos por aqui, aproveite o ConectaBem. Lembre de terminar seu
        cadastro no futuro e iniciar seus atendimentos.
      </span>

      <div className="flex justify-center items-center relative">
        <input
          onChange={onChangeImage}
          type="file"
          name="file"
          id="file"
          className="hidden"
        />
        <label
          htmlFor="file"
          className="bg-blue-600 h-[120px] w-[120px] rounded-full items-center justify-center flex flex-col relative cursor-pointer"
        >
          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full rounded-full object-cover"
            />
          )}
          {!image && <FaUser className="text-button text-6xl" />}
          <div className="bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full ml-24 mt-16 absolute shadow-lg cursor-pointer">
            <MdEdit className="text-blue-600 text-3xl" />
          </div>
        </label>
      </div>

      <div className="flex items-center">
        <Checkbox defaultChecked />
        <span>Aceitar Termos de Uso e Política de Privacidade</span>
      </div>

      <div className="flex flex-col gap-6">
        <Button variant="outlined">Iniciar Tour</Button>
        <Button variant="outlined">Entrar sem Tour</Button>
      </div>
    </form>
  );
};