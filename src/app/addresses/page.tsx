"use client";

import { ArrowLeftIcon, HouseIcon } from "@/assets/svgs";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { Endereco } from "@/types/address";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Addresses() {
  const { data: addresses, isLoading, isError } = useAddresses();
  const router = useRouter();

  return (
    <main className="space-y-6">
      <div className="space-y-4">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="stroke-[#1D1B20]" width={20} height={20} />
        </button>
        <div className="flex justify-between">
          <Typography variant="h5" component="h1">
            Endereços
          </Typography>
          <Button variant="contained" color="primary" size="large">
            ADICIONAR
          </Button>
        </div>
      </div>
      {addresses?.enderecos.lista.map((address: Endereco) => (
        <div className="border border-[#253E99] rounded-e-lg rounded-ss-lg space-y-4 py-4 px-6">
          {address.principal && (
            <div className="bg-[#253E99] px-4 py-1 w-fit text-[#EAEEFA] text-sm rounded-full">Endereço principal</div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Typography variant="h5">{address.tipo}</Typography>
              {address.tipo === "Casa" && <HouseIcon width={31} height={31} className="fill-[#253E99]" />}
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
    </main>
  );
}
