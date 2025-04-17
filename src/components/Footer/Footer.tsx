export const Footer = () => {
  return (
    <footer className="bg-blue-800 flex flex-col pb-2">
      <div className="flex lg:flex-row flex-col gap-10 p-4 w-full px-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-button font-bold">Profissionais</h4>
          <ul className="flex flex-col gap-1 text-white/70">
            <li className="cursor-pointer">Fisioterapeuta</li>
            <li className="cursor-pointer">Quiropraxia</li>
            <li className="cursor-pointer">Cromoterapia</li>
            <li className="cursor-pointer">Reiki</li>
            <li className="cursor-pointer">Acunpultura</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-button font-bold">Suporte</h4>
          <ul className="flex flex-col gap-1 text-white/70">
            <li className="cursor-pointer">FAQ</li>
            <li className="cursor-pointer">Contatos</li>
            <li className="cursor-pointer">Tutoriais</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-button font-bold">Sobre o Conecta Bem</h4>
          <ul className="flex flex-col gap-1 text-white/70">
            <li className="cursor-pointer">Quem Somos</li>
            <li className="cursor-pointer">Valores</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-4 justify-between px-10">
        <span className="cursor-pointer text-button">Termos de uso</span>
        <span className="cursor-pointer text-button">
          Politica de privacidade
        </span>
      </div>
    </footer>
  );
};
