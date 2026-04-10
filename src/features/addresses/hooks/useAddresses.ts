import { useGetAddress } from "@/kubb";

export const useAddresses = () => {
  const query = useGetAddress();

  const adaptedData = query.data?.addresses?.map((addr) => ({
    id: addr._id,
    bairro: addr.bairro,
    rua: addr.endereco,
    estado: addr.estado,
    cep: addr.cep,
    complemento: addr.complemento,
    principal: addr.active,
    type: "Casa", // Default for handle with the designer's front-end. This field does'nt return of API
  }));

  return {
    ...query,
    data: adaptedData,
  }
};