import { CodeForm } from "@/features/auth/components/CodeForm/CodeForm";
import { TitleCode } from "@/features/auth/components/CodeForm/TitleCode";
import { Divider } from "@mui/material";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function ConfirmCode() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col md:max-w-[450px] justify-center gap-8">
        <TitleCode />

        <CodeForm />

        <Divider />

        <div className="flex flex-col gap-4 text-gray-600">
          <span className="">
            Não se esqueça de verificar sua caixa de spam, caso não encontre
            nosso e-mail
          </span>
          <div className="flex items-center gap-2">
            <FaRegQuestionCircle />

            <span className="">Precisa de ajuda?</span>
          </div>
        </div>
      </div>
    </main>
  );
}
