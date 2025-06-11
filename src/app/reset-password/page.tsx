'use client';

import { Suspense } from 'react';
import ResetPasswordForm from './resetPasswordForm';


export default function ResetPasswordPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Redefinir Senha</h1>
      <Suspense fallback={<p>Carregando...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
