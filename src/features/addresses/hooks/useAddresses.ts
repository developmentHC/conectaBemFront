import { useGetAddress } from "@/kubb";
import type { Address } from "@/types/address";
import { toAddressProps } from "../adapters/toAddressProps";

export const useAddresses = () => {
  const query = useGetAddress();

  const data: Address[] | undefined = query.data?.addresses
    ?.map(toAddressProps)
    .filter((addr): addr is Address => addr !== null);

  return {
    ...query,
    data,
  };
};
