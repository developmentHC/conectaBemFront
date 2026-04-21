import { useGetAddress } from "@/kubb";
import { Address } from "@/types/address";

export const useAddresses = () => {
  const query = useGetAddress();
  
  const adaptedData: Address[] =
    query.data?.addresses
      ?.map((addr) => {
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
      })
      .filter((addr): addr is Address => addr !== null) || [];

  return {
    ...query,
    data: adaptedData,
  }
};