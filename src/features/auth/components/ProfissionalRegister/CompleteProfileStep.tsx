import { MdEdit } from "react-icons/md";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { FaUser } from "react-icons/fa";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { useRegisterProfissional } from "../../hooks/useRegisterProfissional";
import { useUserStore } from "@/stores/userSessionStore";

export const CompleteProfileStep = () => {
  const [image, setImage] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    updateFields,
    birthdate,
    cepProfessional,
    cepResidencial,
    enderecoResidencial,
    bairroResidencial,
    clinicName,
    enderecoClinica,
    bairroClinica,
    cidadeClinica,
    estadoClinica,
    complementoClinica,
    numeroClinica,
    cpfCNPJ,
    name,
    servicePreferences,
    specialties,
  } = useProfissionalRegisterStore();
  const { idUser } = useUserStore();
  const { mutate: createProfissional } = useRegisterProfissional();

  const onChangeImage = (e: any) => {
    if (!e.target.files[0]) return undefined;

    setImage(e.target.files[0]);
    updateFields({ photo: e.target.files[0] });
  };

  const onSubmit = () => {
    createProfissional({
      userId: idUser,
      name: name,
      birthdayDate: birthdate?.getTime(),
      CNPJCPFProfissional: cpfCNPJ,
      residentialAddress: {
        cep: cepResidencial,
        address: enderecoResidencial,
        neighborhood: bairroResidencial,
        city: bairroResidencial,
        state: bairroResidencial,
      },
      clinic: {
        name: clinicName,
        cep: cepProfessional,
        address: enderecoClinica,
        neighborhood: bairroClinica,
        number: numeroClinica,
        city: cidadeClinica,
        state: estadoClinica,
        addition: complementoClinica,
      },
      professionalSpecialties: specialties,
      otherProfessionalSpecialties: [],
      professionalServicePreferences: servicePreferences,
      profilePhoto:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAABwCAYAAACelvI+AAAAAXNSR0IArs4c6QAAAARnQU1BAA===",
    });
  };

  return (
    <form className="flex flex-col gap-8">
      <span>
        Terminamos por aqui, aproveite o ConectaBem. Lembre de terminar seu cadastro no futuro e iniciar seus
        atendimentos.
      </span>

      <div className="flex justify-center items-center relative">
        <input onChange={onChangeImage} type="file" name="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="bg-blue-600 h-[120px] w-[120px] rounded-full items-center justify-center flex flex-col relative cursor-pointer"
        >
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              className="w-full h-full rounded-full object-cover"
              width={120}
              height={120}
              alt="profile"
            />
          )}
          {!image && <FaUser className="text-button text-6xl" />}
          <div className="bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full ml-24 mt-16 absolute shadow-lg cursor-pointer">
            <MdEdit className="text-blue-600 text-3xl" />
          </div>
        </label>
      </div>

      <FormControlLabel
        control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
        label="Aceitar Termos de Uso e Política de Privacidade"
      />

      <div className="flex flex-col gap-6">
        <Button onClick={onSubmit} disabled={!termsAccepted} variant="contained">
          Começar
        </Button>
      </div>
    </form>
  );
};
