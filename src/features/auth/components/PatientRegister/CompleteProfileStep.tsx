import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { usePatientRegisterStore } from "./usePatientRegisterStore";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import { useUserStore } from "@/stores/userSessionStore";
import Image from "next/image";

export const CompleteProfileStep = () => {
  const [image, setImage] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    updateFields,
    accessibility,
    name,
    specialties,
    servicePreferences,
    birthdayDate,
    cepResidencial,
    enderecoResidencial,
    bairroResidencial,
    cidadeResidencial,
    estadoResidencial,
  } = usePatientRegisterStore();
  const { mutate: createPatient } = useRegisterPatient();
  const { idUser } = useUserStore();

  const onChangeImage = (e: any) => {
    if (!e.target.files[0]) return undefined;

    setImage(e.target.files[0]);
    updateFields({ profilePhoto: e.target.files[0] });
  };

  const onSubmit = () => {
    if (!termsAccepted) {
      return;
    }

    createPatient({
      userId: idUser,
      birthdayDate: birthdayDate?.getTime(),
      name: name,
      residentialAddress: {
        cep: cepResidencial,
        address: enderecoResidencial,
        neighborhood: bairroResidencial,
        city: cidadeResidencial,
        state: estadoResidencial,
      },
      userAcessibilityPreferences: accessibility,
      userServicePreferences: servicePreferences,
      userSpecialties: specialties,
      profilePhoto:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAABwCAYAAACelvI+AAAAAXNSR0IArs4c6QAAAARnQU1BAA===",
    });
  };

  return (
    <form className="flex flex-col gap-8">
      <div className="flex justify-center items-center relative">
        <input onChange={onChangeImage} type="file" name="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="bg-blue-600 h-[120px] w-[120px] rounded-full items-center justify-center flex flex-col relative cursor-pointer"
        >
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              className="w-full h-full rounded-full object-cover"
              alt="profile"
              width={120}
              height={120}
            />
          ) : (
            <FaUser className="text-button text-6xl" />
          )}
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
        <Button onClick={onSubmit} variant="contained" disabled={!termsAccepted}>
          Começar
        </Button>
      </div>
    </form>
  );
};
