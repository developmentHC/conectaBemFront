import { ImageUpload } from "@/components/Inputs/ImageUpload";
import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { useState } from "react";
import { usePatientRegisterStore } from "./usePatientRegisterStore";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import { useUserStore } from "@/stores/userSessionStore";
import { usePhotoUpload } from "../../hooks/usePhotoUpload";
import { gtmEvents } from "@/utils/gtm";
import toast from "react-hot-toast";

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
  const { idUser, setProfilePhoto, clearProfilePhoto } = useUserStore();
  const { mutateAsync: uploadPhoto } = usePhotoUpload();

  const [isUploading, setIsUploading] = useState(false);

  const onChangeImage = async (file: File | null, _previewUrl: string | null) => {
    if (!file) {
      setImage(null);
      clearProfilePhoto();
      updateFields({ profilePhoto: undefined });
      return;
    }

    try {
      setIsUploading(true);

      // Upload photo via multipart/FormData
      const photoUrl = await uploadPhoto(file);

      // Store the URL returned from backend
      setImage(photoUrl);
      setProfilePhoto(photoUrl);
      updateFields({ profilePhoto: photoUrl });
      toast.success(`Foto enviada! URL: ${photoUrl}`);
    } catch (error) {
      console.error(error);
      // Error toast is handled by usePhotoUpload hook
    } finally {
      setIsUploading(false);
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
