'use client'

import { useRouter } from 'next/navigation'

export default function RedirectToResetPasswordPage() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/reset-password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Recuperar Senha</h2>

        <button
          onClick={handleClick}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
        >
          Ir para redefinir senha
        </button>
      </div>
    </div>
  )
}
