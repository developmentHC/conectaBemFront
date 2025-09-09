import { IAppointment } from "@/types/appointment";
import Image from "next/image";
import { LuCalendarDays } from "react-icons/lu";
import { LuAlarmClock } from "react-icons/lu";

export const AppointmentCard = ({
  appointment,
}: {
  appointment: IAppointment;
}) => {
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
  const bgColor =
    {
      Aguardando: "bg-[#F8FAFF]",
      Confirmado: "bg-[#F8FAFF]",
      Realizado: "bg-[#E5EDFF]",
      Cancelado: "bg-[#E5EDFF]",
    }[appointment.status] || "";
  return (
    <div
      className={`max-w-[350px] flex flex-col gap-6 p-6 ${bgColor} rounded-lg shadow-md`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span
              className={`w-fit text-sm py-1 px-4 ${statusBgColor} ${statusTextColor} rounded-full`}
            >
              {appointment.status}
            </span>
            <h1 className="text-2xl font-semibold w-28 truncate">
              {appointment.professional.name}
            </h1>
            <p className="text-gray-400 w-28 truncate">
              {appointment.professional.specialization}
            </p>
            <span className="flex items-center gap-2 text-sm font-semibold">
              <LuCalendarDays className="text-gray-500" size={20} />
              {new Date(appointment.date).toLocaleDateString("pt-BR")}
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold">
              <LuAlarmClock className="text-gray-500" size={20} />
              {appointment.time
                ? new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString(
                    "pt-BR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : ""}
            </span>
          </div>
          <Image
            src={appointment.professional.image}
            alt="Imagem do Profissional"
            className="rounded-lg w-28 h-28 object-cover"
            width={200}
            height={200}
          />
        </div>
        <p className="text-gray-400">ID Serviço: {appointment.serviceId}</p>
      </div>
      <div className="flex flex-col gap-4">
        <button className="rounded-md bg-blue-600 text-button p-2">
          Agendar Novamente
        </button>
        <button className="border rounded-md border-blue-600 p-2">
          Informaões do Agendamento
        </button>
        <button className="border rounded-md border-blue-600 p-2">
          Cancelar Agendamento
        </button>
      </div>
    </div>
  );
};
