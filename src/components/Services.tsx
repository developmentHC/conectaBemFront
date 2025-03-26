import { Divider } from "@mui/material";
import Image from "next/image";

export const Services = ({ title, duration, price, description }) => {
  return (
    <div className="bg-[#F8FAFF] rounded-lg shadow-[#919EAB29] shadow-sm p-3 flex flex-col max-w-[440px] lg:max-w-[600px]">
      <div className="flex justify-between space-y-3">
        <div className="py-2 px-1 space-y-1">
          <h6 className="font-bold text-sm">{title}</h6>
          <div className="text-sm flex space-x-1">
            <p className="text-[#645D6F]">Duração:</p>
            <span className="font-bold">{duration}</span>
          </div>
        </div>
        <Divider
          className="mt-3 lg:mt-0"
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <div className="flex flex-col justify-center items-center">
          <Image src="/images/payment.svg" alt={""} width={22} height={16} />
          <p className="font-bold text-sm mx-1">{price}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-[#322F37] my-2">
          {description}
        </p>
        <p className="text-[#645D6F] text-xs lg:text-sm">- Ver menos</p>
      </div>
    </div>
  );
};
