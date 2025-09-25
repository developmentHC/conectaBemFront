import Image from "next/image";
import { ReactNode } from "react";

type ErrorTemplateProps = {
  status?: number;
  title: string;
  subtitle?: string | ReactNode;
  illustrationSrc: string;
  children?: ReactNode;
};

export function ErrorTemplate({
  status,
  title,
  subtitle,
  illustrationSrc,
  children,
}: ErrorTemplateProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 sm:px-6 sm:pt-8 sm:pb-6 lg:pb-10 flex flex-col items-center">
      {/* ilustração + badge de status */}
      <div className="relative mx-auto max-w-sm">
        <Image
          src={illustrationSrc}
          alt={`Erro ${status ?? ""}`}
          width={360}
          height={220}
          className="h-auto w-full"
          priority
        />
        {status && (
          <div className="absolute -left-3 -top-3 rounded-lg bg-blue-50 px-2 py-0.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
            {status}
          </div>
        )}
      </div>

      {/* título + texto */}
      <div className="mt-4 sm:mt-6 w-full max-w-xl self-center text-left">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>

        {typeof subtitle === "string" ? (
          <p className="mt-2 text-gray-600 whitespace-pre-line">{subtitle}</p>
        ) : (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* ações (search + botões) */}
      <div className="mt-4 sm:mt-6 w-full max-w-xl flex flex-col items-stretch gap-3 sm:gap-4">
        {children}
      </div>
    </main>
  );
}
