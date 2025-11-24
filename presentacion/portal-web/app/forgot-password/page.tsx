// pages/forgot-password/page.tsx
"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";

    setLoading(true);

    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(result.error);
      return;
    }

    alert("Te enviamos un código a tu correo.");
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center p-20 w-1/2">
        <h1 className="text-4xl font-bold mb-3">Recuperar contraseña</h1>
        <p className="text-gray-500 mb-10">
          Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            className="border rounded-lg p-3"
          />

          <button
            className="bg-black text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar código"}
          </button>
        </form>

        <div className="mt-6 text-sm">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600">Inicia sesión</a>
        </div>
      </div>

      <div className="w-1/2 hidden md:block">
        <img
          src="/images/reset-password.jpg"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </div>
  );
}
