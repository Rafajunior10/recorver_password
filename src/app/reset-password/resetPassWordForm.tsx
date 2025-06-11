'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './resetPassWordForm.css'; // importa o CSS externo

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const accessToken = searchParams.get('access_token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!accessToken) {
            setStatus('Token inválido ou expirado.');
            return;
        }

        if (password !== confirmPassword) {
            setStatus('As senhas não coincidem.');
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
        <div className="container">
            <div className="box">
                <h2 className="title">Redefinir Senha</h2>

                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="password"
                        placeholder="Nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <button type="submit" className="button">Confirmar</button>
                </form>

                {status && <p className="status">{status}</p>}
            </div>
        </div>
    );
}
