"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    const res = await fetch("/api/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit">Enviar</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
}
