import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import { ImageUpload } from "@/components/Inputs/ImageUpload";
import { useUserStore } from "@/stores/userSessionStore";
import { gtmEvents } from "@/utils/gtm";
import { useProfilePhotoUpload } from "../../hooks/useProfilePhotoUpload";
import { useRegisterProfissional } from "../../hooks/useRegisterProfissional";
import { useProfissionalRegisterStore } from "./useProfissionalRegisterStore";

export const CompleteProfileStep = () => {
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

  const { idUser } = useUserStore();
  const { mutate: createProfissional, isPending } = useRegisterProfissional();
  const { isUploading, onChangeImage } = useProfilePhotoUpload({
    onUpload: (url) => updateFields({ photo: url }),
    onClear: () => updateFields({ photo: undefined }),
  });

  const onSubmit = () => {
    createProfissional({
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
      <div className="relative flex items-center justify-center">
        <ImageUpload onChange={onChangeImage} value={photo} className="mb-4" />
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
