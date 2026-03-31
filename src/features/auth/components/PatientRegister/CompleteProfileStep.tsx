import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useUserStore } from "@/stores/userSessionStore";
import { compressImage } from "@/utils/compressImage";
import { gtmEvents } from "@/utils/gtm";
import { convertToBase64 } from "@/utils/transformImageToBase64";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import { usePatientRegisterStore } from "./usePatientRegisterStore";

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
    numeroResidencial,
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
        number: numeroResidencial,
        neighborhood: bairroResidencial,
        city: cidadeResidencial,
        state: estadoResidencial,
      },
      userAcessibilityPreferences: accessibility,
      userServicePreferences: servicePreferences,
      userSpecialties: specialties,
      profilePhoto: profilePhoto,
    });

    gtmEvents.patientRegistrationComplete(
      idUser || "not_specified",
      cidadeResidencial || "not_specified",
      estadoResidencial || "not_specified",
    );
  };

  return (
    <form className="flex flex-col gap-8">
      <div className="relative flex items-center justify-center">
        <input onChange={onChangeImage} type="file" name="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="relative flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-full bg-blue-600"
        >
          {image ? (
            <Image
              src={image}
              className="h-full w-full rounded-full object-cover"
              alt="profile"
              width={120}
              height={120}
            />
          ) : (
            <FaUser className="text-6xl text-button" />
          )}
          <div
            role="button"
            tabIndex={0}
            aria-label="Editar foto de perfil"
            className="absolute mt-16 ml-24 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
          >
            <MdEdit className="text-3xl text-blue-600" />
          </div>
        </label>
      </div>

      <FormControlLabel
        control={
          <Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
        }
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
