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
  }));

  return {
    ...query,
    data: adaptedData,
  }
};