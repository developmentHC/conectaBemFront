import { useGetAddress } from "@/kubb";
import { Address } from "@/types/address";
import { toAddressProps } from "../adapters/toAddressProps";

export const useAddresses = () => {
  const query = useGetAddress();

   const adaptedData: Address[] =
    query.data?.addresses
      ?.map(toAddressProps)
      .filter((addr): addr is Address => addr !== null) || [];

  return {
    ...query,
    data: adaptedData,
  }
};