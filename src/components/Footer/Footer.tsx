export const Footer = () => {
  return (
    <footer className="bg-blue-800 flex flex-col items-center">
      <div className="flex gap-10 p-4 w-full justify-center">
        <div className="flex flex-col gap-2">
          <h4 className="text-button font-bold">Suporte</h4>
          <ul className="flex flex-col gap-1 text-white/70">
            <li>FAQ</li>
            <li>Contatos</li>
            <li>Tutoriais</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-button font-bold">Profissionais</h4>
          <ul className="flex flex-col gap-1 text-white/70">
            <li>Fisioterapeuta</li>
            <li>Quiropraxia</li>
            <li>Cromoterapia</li>
            <li>Reiki</li>
            <li>Acunpultura</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-button font-bold">Sobre nós</h4>
          <ul className="flex flex-col gap-1 text-white/70">
            <li>Quem Somos</li>
            <li>Valores</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center text-white bg-blue-950 w-full py-2 px-4">
        <div className="flex gap-4">
          <span>Termos de uso</span>
          <span>Politica de privacidade</span>
        </div>
        <span className="text-xs opacity-70">© 2025-{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};