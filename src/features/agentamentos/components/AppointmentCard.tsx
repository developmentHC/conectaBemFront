import { IAppointment } from "@/types/appointment";
import Image from "next/image";
import { LuWallet } from "react-icons/lu";

export const AppointmentCard = ({
  appointment,
}: {
  appointment: IAppointment;
}) => {
  // Mantém tuas cores por status para o badge, se você quiser reusar depois:
  const statusBgColor =
    {
      Aguardando: "bg-[#EAEEFA]",
      Confirmado: "bg-[#344A99]",
      Realizado: "bg-[#8498E1]",
      Cancelado: "bg-[#0A1129]",
    }[appointment.status] || "";
  const statusTextColor =
    {
      Confirmado: "text-white",
      Realizado: "text-white",
      Cancelado: "text-white",
    }[appointment.status] || "";

  // Tenta exibir uma lista com bullets:
  // - se existir appointment.items (array), usa ela
  // - senão, se specialization existir (string), mostra como 1 item
  const bulletItems: string[] =
    (Array.isArray((appointment as any).items) && (appointment as any).items.length
      ? (appointment as any).items
      : appointment.professional?.specialization
      ? [appointment.professional.specialization]
      : []) as string[];

  // Preço (se existir)
  const price = (appointment as any).price as string | number | undefined;

  return (
    <div className="w-full max-w-[660px] rounded-lg border border-[#E5E3E8] bg-white p-6 shadow-sm">
      {/* Topo: foto + infos */}
      <div className="flex items-start gap-4">
        <Image
          src={appointment.professional.image}
          alt={`Foto de ${appointment.professional.name}`}
          className="rounded-md w-[96px] h-[96px] object-cover"
          width={96}
          height={96}
        />

        <div className="flex-1 min-w-0">
          <h2 className="text-[18px] font-semibold text-[#3857F4] leading-[130%]">
            {appointment.professional.name}
          </h2>

          {/* Lista com bullets (quando houver itens) */}
          {bulletItems.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-[#19171C] space-y-1">
              {bulletItems.map((it) => (
                <li key={it} className="text-[16px] leading-[150%]">
                  {it}
                </li>
              ))}
            </ul>
          )}

          {/* Linha de preço (opcional) */}
          {typeof price !== "undefined" && (
            <div className="mt-2 flex items-center gap-2">
              <LuWallet size={20} className="text-[#9790A2]" />
              <span className="text-[16px] leading-[150%]">
                <span className="font-semibold">Preço:</span>{" "}
                {typeof price === "number"
                  ? price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : price}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Botão único */}
      <div className="mt-4">
        <button
          type="button"
          className="w-full h-12 rounded-lg bg-[#3857F4] text-[#D7FF7B] font-bold text-[16px] leading-[150%]"
        >
          Informações do Agendamento
        </button>
      </div>
    </div>
  );
};
