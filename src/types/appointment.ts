export type AppointmentStatusVariant = "pending" | "confirmed" | "completed" | "canceled";

export type AppointmentAddress = {
  _id?: string;
  id?: string;
  label?: string;
  cep?: string;
  address?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
  reference?: string;
  active?: boolean;
};

export type AppointmentService = {
  id: string;
  name: string;
  description?: string;
  durationMinutes?: number;
  price?: number;
};

export type AppointmentAttachment = {
  label: string;
  url: string;
};

export type IAppointment = {
  id: string | number;
  status: string;
  derivedStatus?: AppointmentStatusVariant;
  dateTime?: string;
  date?: string;
  time?: string;

  professional: {
    id?: string;
    name: string;
    specialization?: string;
    image?: string;
    profileImageUrl?: string;
    distanceKm?: number;
    rating?: number;
    totalReviews?: number;
    badges?: string[];
  };

  serviceName?: string;
  services?: AppointmentService[];
  duration?: number;
  price?: number;
  serviceId?: string;

  yourObservation?: string;
  selectedAddress?: string;
  address?: AppointmentAddress | AppointmentAddress[] | null;
  attachments?: AppointmentAttachment[];
};

export type IAppointmentDetail = IAppointment & {
  services: AppointmentService[];
  mapUrl?: string;
  mapSnapshot?: string;
  paymentMethod?: string;
  supportPhone?: string;
};

export type CancelAppointmentPayload = {
  reason: string;
};

export type CancelAppointmentResponse = {
  status: string;
  canceledAt: string;
};
