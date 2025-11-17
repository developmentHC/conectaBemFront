import { MdEdit } from "react-icons/md";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { FaUser } from "react-icons/fa";
import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRegisterProfissional } from "../../hooks/useRegisterProfissional";
import { useUserStore } from "@/stores/userSessionStore";
import { convertToBase64 } from "@/utils/transformImageToBase64";
import toast from "react-hot-toast";
import { compressImage } from "@/utils/compressImage";
import { gtmEvents } from "@/utils/gtm";

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
      acessibility: [], 
      profilePhoto: photo,
    });



    gtmEvents.professionalRegistrationComplete(
      idUser || "not_specified",
      specialties?.[0] || "not_specified",
      servicePreferences?.[0] || "not_specified",
      cidadeClinica || "not_specified",
      estadoClinica || "not_specified"
    );
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
            <Image
              src={image}
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
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
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
        <Button
          onClick={onSubmit}
          disabled={!termsAccepted || isPending}
          variant="contained"
        >
          {isPending ? "Enviando..." : "Começar"}
        </Button>
      </div>
    </form>
  );
};
