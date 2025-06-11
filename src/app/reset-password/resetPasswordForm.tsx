'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../lib/supabase';


export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get('access_token');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      setStatus('Token inválido ou expirado.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus(`Erro: ${error.message}`);
    } else {
      setStatus('Senha atualizada com sucesso! Redirecionando...');
      setTimeout(() => router.push('/'), 3000);
    }
  };

  return (
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
      {status && <p>{status}</p>}
    </form>
  );
}
