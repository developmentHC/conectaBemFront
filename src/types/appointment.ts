export type IAppointment = {
  id: string | number; 
  status: string;
  derivedStatus?: "pending" | "confirmed" | "completed" | "canceled";

  
  dateTime?: string;

  
  date?: string;
  time?: string;

  professional: {
    name: string;
    specialization?: string;
    image?: string;
    profileImageUrl?: string;
  };

  serviceName?: string;
  duration?: number;
  price?: number;
  serviceId?: string;

  address?: {
    _id?: string;
    cep?: string;
    address?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    active?: boolean;
  } | null;
};
