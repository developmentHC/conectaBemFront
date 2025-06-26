"use client"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/pt-br';

export const MuiLocalizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {children}
    </LocalizationProvider>
  );
};