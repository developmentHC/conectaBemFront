import type { GetAddressQueryResponse } from "@/kubb/types/GetAddress";
import type { Address } from "@/types/address";

type ApiAddress = NonNullable<GetAddressQueryResponse["addresses"]>[number];

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
