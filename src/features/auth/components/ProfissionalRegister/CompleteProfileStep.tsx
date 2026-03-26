import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useUserStore } from "@/stores/userSessionStore";
import { compressImage } from "@/utils/compressImage";
import { gtmEvents } from "@/utils/gtm";
import { convertToBase64 } from "@/utils/transformImageToBase64";
import { useRegisterProfissional } from "../../hooks/useRegisterProfissional";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

export const CompleteProfileStep = () => {
  const [image, setImage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const {
    updateFields,
    birthdate,
    cepProfessional,
    cepResidencial,
    enderecoResidencial,
    bairroResidencial,
    cidadeResidencial,
    estadoResidencial,
    clinicName,
    enderecoClinica,
    bairroClinica,
    cidadeClinica,
    estadoClinica,
    complementoClinica,
    numeroClinica,
    cpfCNPJ,
    name,
    photo,
    servicePreferences,
    specialties,
    accessibility,
  } = useProfissionalRegisterStore();
  const { idUser, setProfilePhoto } = useUserStore();
  const { mutate: createProfissional, isPending } = useRegisterProfissional();

  const onChangeImage = async (e: any) => {
    if (!e.target.files[0]) return undefined;

    const file = e.target.files[0];

    try {
      const compressedFile = await compressImage(file);
      const base64 = await convertToBase64(compressedFile);
      setImage(base64);
      setProfilePhoto(base64);

      updateFields({ photo: base64 });
    } catch {
      toast.error("Erro ao carregar imagem");
    }
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
        city: cidadeResidencial,
        state: estadoResidencial,
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
      acessibility: accessibility ?? [],
      profilePhoto: photo,
    });

    gtmEvents.professionalRegistrationComplete(
      idUser || "not_specified",
      specialties?.[0] || "not_specified",
      servicePreferences?.[0] || "not_specified",
      cidadeClinica || "not_specified",
      estadoClinica || "not_specified",
    );
  };

  return (
    <form className="flex flex-col gap-8">
      <span>
        Terminamos por aqui, aproveite o ConectaBem. Lembre de terminar seu cadastro no futuro e
        iniciar seus atendimentos.
      </span>

      <div className="relative flex items-center justify-center">
        <input onChange={onChangeImage} type="file" name="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="relative flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-full bg-blue-600"
        >
          {image && (
            <Image
              src={image}
              className="h-full w-full rounded-full object-cover"
              width={120}
              height={120}
              alt="profile"
            />
          )}
          {!image && <FaUser className="text-6xl text-button" />}
          <div className="absolute mt-16 ml-24 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg">
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
            <Link component={NextLink} underline="always" href="#">
              Termos de Uso e Política de Privacidade
            </Link>
          </p>
        }
      />

      <div className="flex flex-col gap-6">
        <Button onClick={onSubmit} disabled={!termsAccepted || isPending} variant="contained">
          {isPending ? "Enviando..." : "Começar"}
        </Button>
      </div>
    </form>
  );
};
