import { WelcomeSectionHeader } from '@/components/WelcomeSectionHeader';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { SocialNetwork } from '@/features/auth/components/SocialNetwork';
import { Divider } from '@mui/material';

export default function register() {
  return (
    <main className="flex md:justify-center">
      <div className="flex flex-col gap-8 md:max-w-[450px] w-full">
        <WelcomeSectionHeader href="/" title="Prazer ter você no ConectaBem!" />
        <div className="flex flex-col gap-12 w-full">
          <AuthForm />
          <Divider />
          <SocialNetwork />
        </div>
      </div>
    </main>
  );
}
