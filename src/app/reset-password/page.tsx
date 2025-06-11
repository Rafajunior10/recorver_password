'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../lib/supabase';


export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      setStatus('Token inválido ou expirado.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setStatus(`Erro: ${error.message}`);
    } else {
      setStatus('Senha atualizada com sucesso! Redirecionando...');
      setTimeout(() => router.push('/'), 3000);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit">Confirmar</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
}
