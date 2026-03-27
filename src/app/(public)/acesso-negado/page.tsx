import Button from "@mui/material/Button";
import Link from "next/link";
import { ErrorTemplate } from "@/components/ErrorTemplate";

export default function Forbidden() {
  return (
    <ErrorTemplate
      title="Você não tem permissão para entrar aqui."
      subtitle="Este espaço é reservado para usuários com acesso especial. Se precisar, fale com nosso suporte!"
      illustrationSrc="/images/Error-403.svg"
    >
      <Button
        variant="contained"
        size="large"
        component={Link}
        href="/"
        className="h-12 w-full rounded-lg font-semibold shadow transition"
        sx={{
          bgcolor: "#3857F4",
          textTransform: "none",
          borderRadius: "8px",
          "&:hover": { bgcolor: "#1e40af" },
        }}
      >
        Voltar ao início
      </Button>
    </ErrorTemplate>
  );
}
