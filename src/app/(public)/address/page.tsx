"use client";

import { Button, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { HouseIcon, LocationIcon } from "@/assets/svgs";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { useQueryClient } from "@tanstack/react-query";
import { PutActiveAddressMutationRequest, usePutActiveAddress, usePutAddress } from "@/kubb";
import { Address } from "@/types/address";

export default function Addresses() {
  const { data: addresses } = useAddresses();
  const queryClient = useQueryClient();

  const { mutate } = usePutActiveAddress({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      },
    },
  });

  const handleSetActive = (address: Address) => {
    mutate({
      data: {
        addressId: address.id,
      } satisfies PutActiveAddressMutationRequest,
    });
  };

  return (
    <main className="mx-auto w-full max-w-[452px] space-y-10 sm:px-0">
      <div className="space-y-4">
        <div className="flex justify-between">
          <Typography variant="h5" component="h1">
            Endereços
          </Typography>

          <Button
            className={clsx({
              hidden: !addresses?.length,
              block: addresses?.length,
            })}
            variant="contained"
            size="large"
          >
            ADICIONAR
          </Button>
        </div>
      </div>

      {addresses?.length ? (
        <div className="space-y-8">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={clsx(
                address.principal && "border border-secondary-500",
                "space-y-4 rounded-e-lg rounded-ss-lg bg-background-paper px-6 py-4 shadow-[0px_4px_16px_0px_rgba(145,158,171,0.16)]",
              )}
            >
              {address.principal && (
                <div className="w-fit rounded-full bg-secondary-500 px-4 py-1 text-[#EAEEFA] text-sm">
                  Endereço principal
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Typography variant="h5">{address.type}</Typography>

                  {address.type === "Casa" && (
                    <HouseIcon width={31} height={31} className="fill-secondary-500" />
                  )}

                  {address.type !== "Casa" && (
                    <LocationIcon width={31} height={31} className="fill-secondary-500" />
                  )}
                </div>

                <div className="space-y-2">
                  <Typography variant="body1">
                    {address.rua} - {address.bairro}, {address.cidade} - {address.estado}
                  </Typography>

                  <div>
                    <div className="flex space-x-2">
                      <Typography className="!font-bold">cep</Typography>
                      <Typography>{address.cep}</Typography>
                    </div>

                    <div className="flex space-x-2">
                      <Typography className="!font-bold">complemento</Typography>
                      <Typography>{address.complemento}</Typography>
                    </div>
                  </div>
                </div>
              </div>

              {!address.principal && (
                <Button
                  onClick={() => handleSetActive(address)}
                  className="w-full"
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Tornar principal
                </Button>
              )}

              <div className="flex gap-4">
                <Button className="w-full" variant="outlined" color="primary" size="large">
                  Editar
                </Button>
                <Button className="w-full" variant="outlined" color="primary" size="large">
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="mb-24 space-y-8 px-6 text-center lg:mb-8">
            <Typography variant="h6">
              Você não possui endereços cadastrados
            </Typography>

            <Image
              className="mx-auto"
              src="/images/clipboard.png"
              alt=""
              width={194}
              height={190}
            />

            <Typography variant="body1" className="text-base">
              Que tal <strong className="font-bold">adicionar</strong> um novo endereço e achar os
              melhores profissionais da sua região?
            </Typography>
          </div>

          <div className="absolute bottom-0 left-0 flex w-full justify-center bg-[#E7EBFE] py-3 lg:static lg:bg-transparent">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="w-[275px] lg:w-full"
            >
              Adicionar Endereço
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}