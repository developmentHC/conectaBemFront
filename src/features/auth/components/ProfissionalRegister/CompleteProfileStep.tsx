
import { ImageUpload } from "@/components/Inputs/ImageUpload";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";
import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";
import { useRegisterProfissional } from "../../hooks/useRegisterProfissional";
import { useUserStore } from "@/stores/userSessionStore";
import { usePhotoUpload } from "../../hooks/usePhotoUpload";
import { gtmEvents } from "@/utils/gtm";

export const CompleteProfileStep = () => {
  const [image, setImage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
  const { mutateAsync: uploadPhoto } = usePhotoUpload();

  const onChangeImage = async (file: File | null, previewUrl: string | null) => {
    if (!file) {
      setImage(null);
      setProfilePhoto(undefined);
      updateFields({ photo: undefined });
      return;
    }

    try {
      setIsUploading(true);

      // Upload photo via multipart/FormData
      const photoUrl = await uploadPhoto(file);

      // Store the URL returned from backend
      setImage(photoUrl);
      setProfilePhoto(photoUrl);
      updateFields({ photo: photoUrl });
    } catch (error) {
      console.error(error);
      // Error toast is handled by usePhotoUpload hook
    } finally {
      setIsUploading(false);
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
        Estamos felizes em ter voce aqui, {name}. Vamos iniciar sua jornada?
      </span>

      <div className="flex justify-center items-center relative">
        <ImageUpload
          onChange={onChangeImage}
          value={image}
          className="mb-4"
        />
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
          disabled={!termsAccepted || isPending || isUploading}
          variant="contained"
          fullWidth
        >
          {isPending ? "Enviando..." : "Começar"}
        </Button>
      </div>
    </form>
  );
};
