import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useState } from "react";
import { usePatientRegisterStore } from "./usePatientRegisterStore";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import { useUserStore } from "@/stores/userSessionStore";
import Image from "next/image";
import { convertToBase64 } from "@/utils/transformImageToBase64";
import toast from "react-hot-toast";
import { compressImage } from "@/utils/compressImage";

export const CompleteProfileStep = () => {
  const [image, setImage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    updateFields,
    accessibility,
    name,
    profilePhoto,
    specialties,
    servicePreferences,
    birthdayDate,
    cepResidencial,
    enderecoResidencial,
    bairroResidencial,
    cidadeResidencial,
    estadoResidencial,
  } = usePatientRegisterStore();
  const { mutate: createPatient, isPending } = useRegisterPatient();
  const { idUser, setProfilePhoto } = useUserStore();

  const onChangeImage = async (e: any) => {
    if (!e.target.files[0]) return undefined;

    const file = e.target.files[0];

    try {
      const compressedFile = await compressImage(file);
      const base64 = await convertToBase64(compressedFile);
      setImage(base64);
      setProfilePhoto(base64);

      updateFields({ profilePhoto: base64 });
    } catch {
      toast.error("Erro ao carregar imagem");
    }
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
      profilePhoto: profilePhoto,
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
              src={image}
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
        label={
          <p>
            Aceitar{" "}
            <Link underline="always" href="#">
              {" "}
              Termos de Uso e Política de Privacidade
            </Link>
          </p>
        }
      />

      <div className="flex flex-col gap-6">
        <Button onClick={onSubmit} variant="contained" disabled={!termsAccepted || isPending}>
          {isPending ? "Enviando..." : "Começar"}
        </Button>
      </div>
    </form>
  );
};
