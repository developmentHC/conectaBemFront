"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { ErrorTemplate } from "@/components/ErrorTemplate";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // útil p/ logs durante QA; em prod vai para o server log
    console.error(error);
  }, [error]);

  return (
    <ErrorTemplate
      title="Algo saiu do fluxo, mas já estamos resolvendo"
      subtitle={
        "Nosso sistema não está se sentindo muito bem agora.\nJá estamos cuidando disso para que tudo volte ao normal em breve."
      }
      illustrationSrc="/images/Error-500.svg"
    >
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={() => reset()}
        className="h-12 w-full rounded-lg font-semibold shadow transition"
        sx={{
          bgcolor: "#2563eb",
          textTransform: "none",
          borderRadius: "8px",
          "&:hover": { bgcolor: "#1e40af" },
        }}
      >
        Tentar Novamente
      </Button>

      <Button
        type="button"
        variant="outlined"
        size="large"
        component={Link}
        href="/"
        prefetch={false}
        className="h-12 w-full rounded-lg font-semibold transition"
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          borderColor: "#2563eb",
          color: "#2563eb",
          bgcolor: "#ffffff",
          "&:hover": { bgcolor: "#f3f4f6", borderColor: "#1e40af", color: "#1e40af" },
        }}
      >
        Voltar ao início
      </Button>
    </ErrorTemplate>
  );
}
