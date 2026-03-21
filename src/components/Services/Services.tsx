import { Divider } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import type { Service } from "./types";

export const Services = ({ title, duration, price, description, className }: Service) => {
  const [isExapanded, setIsExpanded] = useState(false);

  return (
    <div
      className={
        `flex flex-col rounded-lg rounded-bl-none bg-[#F8FAFF] p-3 shadow-[#919EAB29] shadow-lg` +
        className
      }
    >
      <div className="flex justify-between space-y-3">
        <div className="space-y-1 px-1 py-2">
          <h6 className="font-bold text-sm">{title}</h6>
          <div className="flex space-x-1 text-sm">
            <p className="text-[#645D6F]">Duração:</p>
            <span className="font-bold">{duration}</span>
          </div>
        </div>
        <Divider className="mt-3 lg:mt-0" orientation="vertical" variant="middle" flexItem />
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/payment.svg" alt={""} width={22} height={16} />
          <p className="mx-1 font-bold text-sm">{price}</p>
        </div>
      </div>
      <div className="space-y-1">
        {isExapanded === true && <p className="my-2 text-[#322F37] text-xs">{description}</p>}
        {isExapanded === true ? (
          <button onClick={() => setIsExpanded(false)}>
            <p className="text-[#645D6F] text-xs lg:text-sm">- Ver menos</p>
          </button>
        ) : (
          <button onClick={() => setIsExpanded(true)}>
            <p className="text-[#645D6F] text-xs lg:text-sm">+ Ver mais</p>
          </button>
        )}
      </div>
    </div>
  );
};
