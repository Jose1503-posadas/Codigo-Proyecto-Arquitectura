"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------------------------------
// LOGIN TRADICIONAL (sin router aquí adentro)
// -------------------------------------------
async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error en login");
  }

  // Regresamos el JSON con el token
  const result = await res.json();
  return result;
}

// -------------------------------------------
// GOOGLE GLOBAL
// -------------------------------------------
declare global {
  interface Window {
    google: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // -------------------------------------------
  // LOGIN TRADICIONAL
  // -------------------------------------------
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    try {
      const result = await loginUser(data);

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    }
  }

  // -------------------------------------------
  // LOGIN CON GOOGLE
  // -------------------------------------------
  async function handleCredentialResponse(response: any) {
    const idToken = response.credential;

    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const googleResult = await res.json();
      console.log("Resultado Login Google:", googleResult);

      if (googleResult.token) {
        localStorage.setItem("token", googleResult.token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error login Google:", err.message);
      alert(err.message);
    }
  }

  // -------------------------------------------
  // INICIALIZAR BOTÓN GOOGLE (SIN CAMBIAR NADA)
  // -------------------------------------------
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  // -------------------------------------------
  // UI IGUAL 100% COMO LA TENÍAS
  // -------------------------------------------
  return (
    <div className="flex h-screen">
      {/* LEFT FORM */}
      <div className="flex flex-col justify-center p-20 w-1/2">
        <h1 className="text-4xl font-bold mb-3">¡Bienvenido Nuevamente!</h1>
        <p className="text-gray-500 mb-10">Por favor ingresa tus datos</p>

        {/* Botón Google - SIN CAMBIAR */}
        <div className="flex justify-center mb-4">
          <div id="google-login"></div>
        </div>

        {/* Separación */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-4 text-gray-400">o</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="border rounded-lg p-3"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              className="border rounded-lg p-3 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2"></label>
            <a href="/forgot-password" className="text-blue-500">
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          <button className="bg-black text-white py-3 rounded-lg">
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-sm">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-600">
            Regístrate
          </a>
        </div>
      </div>

      {/* RIGHT IMAGE BLOCK */}
      <div className="w-1/2 hidden md:block">
        <img
          src="/images/login-cover.jpg"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </div>
  );
}