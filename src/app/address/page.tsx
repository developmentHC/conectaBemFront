"use client";

import clsx from "clsx";
import Image from "next/image";
import { ArrowLeftIcon, HouseIcon, LocationIcon } from "@/assets/svgs";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { Endereco } from "@/types/address";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Addresses() {
  const { data: addresses } = useAddresses();
  const router = useRouter();

  return (
    <main className="space-y-10 max-w-[452px] sm:px-0 w-full mx-auto">
      <div className="space-y-4">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="stroke-black-500" width={20} height={20} />
        </button>
        <div className="flex justify-between">
          <Typography variant="h5" component="h1">
            Endereços
          </Typography>
          <Button
            className={clsx({
              hidden: !addresses?.enderecos?.lista[0],
              block: addresses?.enderecos?.lista[0],
            })}
            variant="contained"
            size="large"
          >
            ADICIONAR
          </Button>
        </div>
      </div>
      {addresses?.enderecos?.lista[0] ? (
        <div className="space-y-8">
          {addresses.enderecos.lista.map((address: Endereco) => (
            <div
              key={address.id}
              className={clsx(
                address.principal && "border border-secondary-500",
                "bg-background-paper rounded-e-lg rounded-ss-lg space-y-4 py-4 px-6 shadow-[0px_4px_16px_0px_rgba(145,158,171,0.16)]"
              )}
            >
              {address.principal && (
                <div className="bg-secondary-500 px-4 py-1 w-fit text-[#EAEEFA] text-sm rounded-full">
                  Endereço principal
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Typography variant="h5">{address.tipo}</Typography>
                  {address.tipo === "Casa" && <HouseIcon width={31} height={31} className="fill-secondary-500" />}
                  {address.tipo === "Outros" && <LocationIcon width={31} height={31} className="fill-secondary-500" />}
                </div>
                <div className="space-y-2">
                  <Typography variant="body1">
                    {address.rua} - {address.bairro}, {address.cidade} - {address.estado}
                  </Typography>
                  <div className="space-y">
                    <div className="flex space-x-2">
                      <Typography className="font-bold">cep</Typography>
                      <Typography>{address.cep}</Typography>
                    </div>
                    <div className="flex space-x-2">
                      <Typography className="font-bold">complemento</Typography>
                      <Typography>{address.complemento}</Typography>
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="text-center space-y-8 px-6 mb-24 lg:mb-8">
            <Typography variant="h6">Você não possui endereços cadastrados</Typography>
            <Image className="mx-auto" src="/images/clipboard.png" alt={""} width={194} height={190} />
            <Typography variant="body1" className="text-base">
              Que tal <strong className="font-bold">adicionar</strong> um novo endereço e achar os melhores
              profissionais da sua região?
            </Typography>
          </div>
          <div className="bg-[#E7EBFE] lg:bg-transparent py-3 flex justify-center absolute bottom-0 left-0 w-full lg:static">
            <Button variant="contained" color="primary" size="large" className="w-[275px] lg:w-full">
              Adicionar Endereço
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
