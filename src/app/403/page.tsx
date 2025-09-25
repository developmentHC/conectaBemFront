import Link from "next/link";
import { ErrorTemplate } from "@/components/ErrorTemplate";
import Button from "@mui/material/Button";

export default function Forbidden() {
  return (
    <ErrorTemplate
      title="Você não tem permissão para entrar aqui."
      subtitle="Este espaço é reservado para usuários com acesso especial. Se precisar, fale com nosso suporte!"
      illustrationSrc="/images/Error-403.svg"
    >
      {/* Botão azul cheio */}
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
        Voltar ao início
      </Button>
    </ErrorTemplate>
  );
}
