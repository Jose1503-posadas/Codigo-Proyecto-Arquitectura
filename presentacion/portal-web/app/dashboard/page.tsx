"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="h-screen p-6">
      {/* Barra superior */}
      <div className="flex justify-end">
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
          onClick={() => router.push("/perfil")} 
        >
          Perfil
        </button>
      </div>

      {/* Contenido */}
      <div className="mt-10 text-center text-gray-500">
        <h1 className="text-2xl font-semibold">Bienvenido</h1>
        <p>Pantalla inicial después de iniciar sesión.</p>
      </div>
    </div>
  );
}

