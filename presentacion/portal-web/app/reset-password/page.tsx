"use client";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  // Extraer el código desde la URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const c = url.searchParams.get("code");
    setCode(c);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password")?.toString() || "";

    if (!code) {
      alert("Código de verificación inválido o faltante.");
      return;
    }

    setLoading(true);

    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, password }),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(result.error);
      return;
    }

    alert("Contraseña actualizada. Ya puedes iniciar sesión.");
    window.location.href = "/login";
  }

  // Si todavía no cargó el code
  if (code === null) {
    return <div className="p-10">Cargando...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center p-20 w-1/2">
        <h1 className="text-4xl font-bold mb-3">Restablecer contraseña</h1>
        <p className="text-gray-500 mb-10">
          Ingresa tu nueva contraseña para continuar.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            className="border rounded-lg p-3"
          />

          <button className="bg-black text-white py-3 rounded-lg" disabled={loading}>
            {loading ? "Procesando..." : "Actualizar contraseña"}
          </button>
        </form>

        <div className="mt-6 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600">Inicia sesión</a>
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
