import { sendGTMEvent } from "@next/third-parties/google";

export const gtmEvents = {
  login: (
    method: "email" | "google" | "facebook",
    isNewUser: boolean,
    idUser?: string,
    userType?: "patient" | "professional" | null
  ) => {
    sendGTMEvent({
      event: "login",
      method: method,
      user_status: isNewUser ? "new_user" : "returning_user",
      user_id_hash: idUser ? btoa(idUser) : "not_specified",
      user_type: userType || "not_specified",
      login_timestamp: new Date().toISOString(),
      event_category: "authentication",
    });
  },

  professionalRegistrationComplete: (
    idUser: string,
    specialty: string,
    serviceType: string,
    city: string,
    state: string
  ) => {
    sendGTMEvent({
      event: "professional_registration_complete",
      user_id_hash: btoa(idUser),
      professional_specialty: specialty,
      service_type: serviceType,
      professional_city: city,
      professional_state: state,
      registration_timestamp: new Date().toISOString(),
      event_category: "registration",
      user_type: "professional",
      value: 1,
    });
  },

  patientRegistrationComplete: (
    idUser: string,
    city: string,
    state: string
  ) => {
    sendGTMEvent({
      event: "patient_registration_complete",
      user_id_hash: btoa(idUser),
      patient_city: city,
      patient_state: state,
      registration_timestamp: new Date().toISOString(),
      event_category: "registration",
      user_type: "patient",
      value: 1,
    });
  },
};
