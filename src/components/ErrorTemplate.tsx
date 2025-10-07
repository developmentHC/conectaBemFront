// ErrorTemplate.tsx
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
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
      {/* Ilustração + badge */}
      <div className="relative w-full max-w-[452px]">
        <Image
          src={illustrationSrc}
          alt={`Erro ${status ?? ""}`}
          width={452}
          height={159}
          className="w-full h-auto"
          priority
        />
        {status && (
          <div className="absolute -left-3 -top-3 rounded-lg bg-blue-50 px-2 py-0.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
            {status}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="mt-6 w-full max-w-[452px] flex flex-col items-start gap-6">
        <div className="w-full flex flex-col items-start gap-2">
          <h1 className="text-[24px] leading-[31px] font-bold text-gray-900">
            {title}
          </h1>

          {typeof subtitle === "string" ? (
            <p className="text-[16px] leading-[24px] text-gray-600 whitespace-pre-line">
              {subtitle}
            </p>
          ) : (
            <div className="text-[16px] leading-[24px] text-gray-600">{subtitle}</div>
          )}
        </div>

        {/* Ações */}
        <div className="w-full flex flex-col items-stretch gap-6">
          {children}
        </div>
      </div>
    </main>
  );
}
