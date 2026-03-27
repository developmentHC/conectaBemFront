// ErrorTemplate.tsx
import Image from "next/image";
import type { ReactNode } from "react";

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
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
      {/* Ilustração + badge */}
      <div className="relative w-full max-w-[452px]">
        <Image
          src={illustrationSrc}
          alt={`Erro ${status ?? ""}`}
          width={452}
          height={159}
          className="h-auto w-full"
          priority
        />
        {status && (
          <div className="absolute -top-3 -left-3 rounded-lg bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 text-sm ring-1 ring-blue-200">
            {status}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="mt-6 flex w-full max-w-[452px] flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="font-bold text-[24px] text-gray-900 leading-[31px]">{title}</h1>

          {typeof subtitle === "string" ? (
            <p className="whitespace-pre-line text-[16px] text-gray-600 leading-[24px]">
              {subtitle}
            </p>
          ) : (
            <div className="text-[16px] text-gray-600 leading-[24px]">{subtitle}</div>
          )}
        </div>

        {/* Ações */}
        <div className="flex w-full flex-col items-stretch gap-6">{children}</div>
      </div>
    </main>
  );
}
