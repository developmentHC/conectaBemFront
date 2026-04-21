import { Address } from "@/types/address";

type ApiAddress = {
  _id?: string;
  bairro?: string;
  endereco?: string;
  estado?: string;
  cep?: string;
  complemento?: string;
  active?: boolean;
  type?: string;
  cidade?: string;
};

export const toAddressProps = (addr: ApiAddress): Address | null => {
  if (!addr._id) return null;

  return {
    id: addr._id,
    bairro: addr.bairro ?? "",
    rua: addr.endereco ?? "",
    estado: addr.estado ?? "",
    cep: addr.cep ?? "",
    complemento: addr.complemento ?? "",
    principal: addr.active ?? false,
    type: addr.type ?? "",
    cidade: addr.cidade ?? "",
  };
};