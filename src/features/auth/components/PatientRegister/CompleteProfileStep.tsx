import { ImageUpload } from "@/components/Inputs/ImageUpload";
import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useState } from "react";
import { usePatientRegisterStore } from "./usePatientRegisterStore";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import { useUserStore } from "@/stores/userSessionStore";
import { useProfilePhotoUpload } from "../../hooks/useProfilePhotoUpload";
import { gtmEvents } from "@/utils/gtm";

export const CompleteProfileStep = () => {

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
  const { idUser } = useUserStore();
  const { isUploading, onChangeImage } = useProfilePhotoUpload({
    onUpload: (url) => updateFields({ profilePhoto: url }),
    onClear: () => updateFields({ profilePhoto: undefined }),
  });

  const onSubmit = () => {
    if (!termsAccepted) {
      return;
    }

    createPatient({
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
      estadoResidencial || "not_specified"
    );
  };

  return (
    <form className="flex flex-col gap-8">
      <div className="flex justify-center items-center relative">
        <ImageUpload
          onChange={onChangeImage}
          value={profilePhoto}
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
            <Link underline="always" href="#">
              {" "}
              Termos de Uso e Política de Privacidade
            </Link>
          </p>
        }
      />

      <div className="flex flex-col gap-6">
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!termsAccepted || isPending || isUploading}
        >
          {isPending ? "Enviando..." : "Começar"}
        </Button>
      </div>
    </form>
  );
};
