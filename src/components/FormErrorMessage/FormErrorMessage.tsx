"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

interface FormErrorMessageProps {
  message?: string | ReactNode;
  visible?: boolean;
}

/**
 * Componente padronizado para exibir mensagens de erro em formulários
 * Segue o padrão visual da UI do ConectaBem
 */
export const FormErrorMessage = ({
  message,
  visible = true,
}: FormErrorMessageProps) => {
  if (!visible || !message) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: "8px 12px",
        backgroundColor: "#fee",
        border: "1px solid #fcc",
        borderRadius: "6px",
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <span
        style={{
          color: "#d32f2f",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {message}
      </span>
    </Box>
  );
};

export default FormErrorMessage;
