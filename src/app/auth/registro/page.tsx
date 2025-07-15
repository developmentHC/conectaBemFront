import { Suspense } from 'react';
import RegistroClient from '@/features/auth/components/RegisterClient';

export default function RegistroPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RegistroClient />
    </Suspense>
  );
}