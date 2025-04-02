import { Divider } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export const Services = ({ title, duration, price, description, className }) => {
  const [isExapanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-[#F8FAFF] rounded-lg rounded-bl-none shadow-[#919EAB29] shadow-lg p-3 flex flex-col ` + className}>
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
        {isExapanded == true &&
          <p className="text-xs text-[#322F37] my-2">
            {description}
          </p>
        }
        {isExapanded == true
          ?
          <button onClick={() => setIsExpanded(false)}>
            <p className="text-[#645D6F] text-xs lg:text-sm">- Ver menos</p>
          </button>
          :
          <button onClick={() => setIsExpanded(true)}>
            <p className="text-[#645D6F] text-xs lg:text-sm">+ Ver mais</p>
          </button>
        }

      </div>
    </div>
  );
};
