
"use client";
import Link from "next/link";
import { ErrorTemplate } from "@/components/ErrorTemplate";
import { Button } from "@mui/material";

export default function GlobalError() {
  return (
    <html lang="pt-BR">
      <body>
        <ErrorTemplate

          title="Algo saiu do fluxo, mas ja estamos resolvendo"
          subtitle={"Nosso sistema nao esta se sentindo muito bem agora.\n Ja estamos cuidando disso para que tudo volte ao normal em breve."}
          illustrationSrc="/images/Error-500.svg"
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/"
            className="w-full rounded-xl font-medium shadow transition"
            sx={{
              bgcolor: "#2563eb",
              textTransform: "none",
              borderRadius: "10px",
              height: "56px",
              "&:hover": {
                bgcolor: "#1e40af",
              },
            }}
          >
            Tentar Novamente
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/"
            className="w-full rounded-xl font-medium shadow transition"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              borderColor: "#2563eb",
              color: "#2563eb",
              bgcolor: "#ffffff",
              height: "56px",
              "&:hover": {
                bgcolor: "#f3f4f6",
                borderColor: "#1e40af",
                color: "#1e40af",
              },
            }}
          >
            Voltar ao início
          </Button>

        </ErrorTemplate>
      </body>
    </html>
  );
}
