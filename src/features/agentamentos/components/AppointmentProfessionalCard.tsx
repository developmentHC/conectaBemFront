import Image from "next/image";
import { LuWallet } from "react-icons/lu";
import type { IAppointment } from "@/types/appointment";

export const AppointmentCard = ({ appointment }: { appointment: IAppointment }) => {
  const bulletItems: string[] = (
    Array.isArray((appointment as any).items) && (appointment as any).items.length
      ? (appointment as any).items
      : appointment.professional?.specialization
        ? [appointment.professional.specialization]
        : []
  ) as string[];

  const price = (appointment as any).price as string | number | undefined;

  return (
    <div className="w-full max-w-[660px] rounded-lg border border-[#E5E3E8] bg-white p-6 shadow-sm">
      {/* Topo: foto + infos */}
      <div className="flex items-start gap-4">
        <Image
          src={appointment.professional?.image ?? "/images/professional/woman (1).jpeg"}
          alt={`Foto de ${appointment.professional.name}`}
          className="h-[96px] w-[96px] rounded-md object-cover"
          width={96}
          height={96}
        />

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-[#3857F4] text-[18px] leading-[130%]">
            {appointment.professional.name}
          </h2>

          {bulletItems.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#19171C]">
              {bulletItems.map((it) => (
                <li key={it} className="text-[16px] leading-[150%]">
                  {it}
                </li>
              ))}
            </ul>
          )}

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

      <div className="mt-4">
        <button
          type="button"
          className="h-12 w-full rounded-lg bg-[#3857F4] font-bold text-[#D7FF7B] text-[16px] leading-[150%]"
        >
          Informações do Agendamento
        </button>
      </div>
    </div>
  );
};
