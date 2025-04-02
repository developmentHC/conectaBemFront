"use client";

import Image from "next/image";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, Rating, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/Carousel/Carousel";
export default function HomePage() {
  return (
    <h1 className="text-red-600 text-xl">
      Teste
    </h1>
  );
}
  