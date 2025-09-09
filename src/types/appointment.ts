export type IAppointment = {
  id: number;
  status: string;
  professional: {
    name: string;
    specialization: string;
    image: string;
  };
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  serviceId: string;
  address: {
    _id: string;
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    active: boolean;
  }[];
};
