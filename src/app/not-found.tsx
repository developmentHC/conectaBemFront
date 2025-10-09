import Link from "next/link";
import { ErrorTemplate } from "@/components/ErrorTemplate";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import Button from "@mui/material/Button";

export default function NotFound() {
  return (
    <ErrorTemplate
      title="OOPs,"
      subtitle={
        "Não encontramos essa página, mas estamos aqui para te ajudar.\nRespire fundo. Vamos te guiar de volta."
      }
      illustrationSrc="/images/Error-404.svg"
    >
      <div className="w-full max-w-[480px] ">
        <SearchInput  />
</div>
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
        Voltar ao Início
      </Button>
    </ErrorTemplate>
  );
}
