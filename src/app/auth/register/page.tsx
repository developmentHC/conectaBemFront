import { WelcomeSectionHeader } from '@/components/WelcomeSectionHeader';
import { Button } from '@mui/material';
import { FaRegQuestionCircle } from 'react-icons/fa';

export default function register() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col gap-8 w-full md:max-w-[450px] justify-center">
        <WelcomeSectionHeader
          href="/auth"
          title="Tudo pronto para começar"
          progress={20}
        />
        <div className="flex flex-col gap-6">
          <Button className="text-black" variant="outlined">
            Paciente
          </Button>
          <Button className="text-black" variant="outlined">
            Profissional
          </Button>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FaRegQuestionCircle />

          <span>Precisa de ajuda?</span>
        </div>
      </div>
    </main>
  );
}
