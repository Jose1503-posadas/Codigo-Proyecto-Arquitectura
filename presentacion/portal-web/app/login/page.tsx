"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3001";

// Función para hacer login
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
  
  return res.json();
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    try {
      const result = await loginUser(data);
      console.log(result); // Aquí podrías guardar token o redirigir
      //alert(result.message);

      // ✔ Si el login es exitoso → REDIRIGIR AQUÍ
      router.push("/dashboard")
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    }
  }

  return (
    <div className="flex h-screen">
      {/* LEFT FORM */}
      <div className="flex flex-col justify-center p-20 w-1/2">
        <h1 className="text-4xl font-bold mb-3">¡Bienvenido Nuevamente!</h1>
        <p className="text-gray-500 mb-10">Por favor ingresa tus datos</p>

        {/* Boton google */}
        <div className="flex justify-center ">
          <button className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                {/* tu SVG exacto */}
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  style={{ display: "block" }}
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Iniciar Sesion con Google</span>
            </div>
          </button>
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
