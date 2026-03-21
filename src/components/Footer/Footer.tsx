type FooterLink = { label: string; href?: string };

type FooterSection = { title: string; links: FooterLink[] };

type FooterVariant =
  | "default"
  | "full"
  | "compact"
  | "support-legal"
  | "legal-only"
  | "logged-in-patient"
  | "logged-in-professional";

type FooterProps = {
  variant?: FooterVariant;
  sections?: FooterSection[];
  bottomLinks?: FooterLink[];
  showBrand?: boolean;
  showCopyright?: boolean;
  copyrightText?: string;
};

const PRESETS: Record<FooterVariant, Required<Omit<FooterProps, "variant">>> = {
  default: {
    sections: [
      {
        title: "Profissionais",
        links: [
          { label: "Quiropraxia" },
          { label: "Cromoterapia" },
          { label: "Reiki" },
          { label: "Acupuntura" },
        ],
      },
      {
        title: "Suporte",
        links: [{ label: "FAQ" }, { label: "Contatos" }, { label: "Tutoriais" }],
      },
      {
        title: "Sobre o Conecta Bem",
        links: [{ label: "Quem Somos" }, { label: "Valores" }],
      },
    ],
    bottomLinks: [{ label: "Termos de uso" }, { label: "Política de privacidade" }],
    showBrand: false,
    showCopyright: false,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
  full: {
    sections: [
      {
        title: "Explorar",
        links: [
          { label: "Buscar Profissionais" },
          { label: "Quero Ser um Profissional" },
          { label: "Navegação" },
        ],
      },
      {
        title: "Suporte",
        links: [{ label: "FAQ" }, { label: "Contato" }, { label: "Tutoriais" }],
      },
      {
        title: "Sobre o Conecta Bem",
        links: [{ label: "Quem Somos" }, { label: "Valores" }],
      },
    ],
    bottomLinks: [{ label: "Termos de uso" }, { label: "Política de privacidade" }],
    showBrand: true,
    showCopyright: false,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
  compact: {
    sections: [
      {
        title: "Suporte",
        links: [{ label: "FAQ" }, { label: "Contato" }],
      },
      {
        title: "Sobre o Conecta Bem",
        links: [{ label: "Quem Somos" }],
      },
    ],
    bottomLinks: [{ label: "Termos de uso" }, { label: "Política de privacidade" }],
    showBrand: true,
    showCopyright: false,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
  "support-legal": {
    sections: [
      { title: "Suporte", links: [{ label: "FAQ" }, { label: "Contato" }] },
      {
        title: "Legal",
        links: [{ label: "Termos de uso" }, { label: "Política de privacidade" }],
      },
    ],
    bottomLinks: [],
    showBrand: true,
    showCopyright: false,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
  "legal-only": {
    sections: [],
    bottomLinks: [{ label: "Termos de uso" }, { label: "Política de privacidade" }],
    showBrand: false,
    showCopyright: false,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
  "logged-in-patient": {
    sections: [
      {
        title: "Suporte",
        links: [{ label: "FAQ" }, { label: "Contato" }],
      },
      {
        title: "Sobre o Conecta Bem",
        links: [
          { label: "Quem Somos" },
          { label: "Termos de Uso" },
          { label: "Política de Privacidade" },
        ],
      },
    ],
    bottomLinks: [],
    showBrand: true,
    showCopyright: true,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
  "logged-in-professional": {
    sections: [
      {
        title: "Suporte",
        links: [{ label: "FAQ" }, { label: "Contato" }],
      },
      {
        title: "Legal",
        links: [{ label: "Termos de Uso" }, { label: "Política de Privacidade" }],
      },
    ],
    bottomLinks: [],
    showBrand: true,
    showCopyright: true,
    copyrightText: "© 2025 Conecta Bem. Todos os direitos reservados.",
  },
};

export const Footer = ({
  variant = "default",
  sections,
  bottomLinks,
  showBrand,
  showCopyright = false,
  copyrightText = "© 2025 Conecta Bem. Todos os direitos reservados.",
}: FooterProps) => {
  const preset = PRESETS[variant];
  const finalSections = sections ?? preset.sections;
  const finalBottom = bottomLinks ?? preset.bottomLinks;
  const withBrand = showBrand ?? preset.showBrand;

  return (
    <footer className="flex flex-col bg-[#253E99] px-6 py-8">
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-[1025px] flex-col items-start gap-[10px] lg:flex-row">
          {withBrand && (
            <div className="flex items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-lime-500 font-extrabold text-blue-900">
                CB
              </div>
            </div>
          )}
          {finalSections.map((section) => (
            <div key={section.title} className="flex min-w-[12rem] flex-col gap-2">
              <h4 className="font-bold text-[#D7FF7B]">{section.title}</h4>
              {section.links?.length ? (
                <ul className="flex flex-col gap-2 text-white/70">
                  {section.links.map((link) => (
                    <li key={link.label} className="cursor-pointer underline">
                      {link.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {finalBottom.length ? (
        <div className="mt-8 flex w-full justify-center">
          <div className="flex w-full max-w-[1025px] flex-wrap items-center justify-between gap-4">
            {finalBottom.map((link) => (
              <span key={link.label} className="cursor-pointer text-[#F2F1F3] underline">
                {link.label}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {showCopyright && (
        <div className="mt-8 flex w-full justify-center">
          <div className="flex w-full max-w-[1025px] border-white/20 border-t pt-4">
            <p className="text-sm text-white/70">{copyrightText}</p>
          </div>
        </div>
      )}
    </footer>
  );
};
