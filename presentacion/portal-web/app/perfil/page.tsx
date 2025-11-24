"use client";

import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function PerfilPage() {
  const [user, setUser] = useState<any>(null);
  const [perfil, setPerfil] = useState({
    telefono: "",
    direccion: "",
    ciudad: "",
    pais: "",
  });

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // -------------------------------
  // Cargar los datos del user
  // -------------------------------
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch(`${API_URL}/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return;

      setUser(data);
      setPerfil(data.perfil);
    })
    .catch((err) => console.log(err));
}, []);



  // -------------------------------
  // Guardar perfil
  // -------------------------------
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${API_URL}/perfil`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(perfil),
    });

    if (res.ok) {
      alert("Perfil actualizado");
    }
  };

  // -------------------------------
  // Cerrar sesión
  // -------------------------------
  const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  localStorage.removeItem("token");
  window.location.href = "/login";
};


  // -------------------------------
  // Eliminar cuenta
  // -------------------------------
  const deleteAccount = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/DeleteUser/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  

  if (!user) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto">

      {/* Botón para regresar al dashboard */}
      <div className="flex justify-end">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="absolute top-5 right-5 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-full"
        >
          Home
        </button>
      </div>
    
      <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>

      {/* DATOS DEL user */}
      <div className="bg-gray-100 p-5 rounded-xl mb-6">
        <p><b>Nombre:</b> {user.nombre}</p>
        <p><b>Apellido:</b> {user.apellido}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Proveedor:</b> {user.provider}</p>
      </div>

      {/* FORMULARIO PERFIL */}
      <h2 className="text-xl font-semibold mb-3">Datos de contacto</h2>

      <div className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Teléfono"
          value={perfil.telefono}
          onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Dirección"
          value={perfil.direccion}
          onChange={(e) => setPerfil({ ...perfil, direccion: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Ciudad"
          value={perfil.ciudad}
          onChange={(e) => setPerfil({ ...perfil, ciudad: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="País"
          value={perfil.pais}
          onChange={(e) => setPerfil({ ...perfil, pais: e.target.value })}
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
      >
        Guardar cambios
      </button>

      {/* Botón cerrar sesión */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="mt-4 w-full bg-gray-300 py-3 rounded-xl hover:bg-gray-400"
      >
        Cerrar sesión
      </button>

      {/* Botón eliminar cuenta */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="mt-4 w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
      >
        Eliminar cuenta
      </button>

      {/* MODAL confirm logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">¿Deseas cerrar sesión?</h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL confirm delete account */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">
              ¿Seguro que deseas eliminar tu cuenta?
            </h3>

            <p className="text-red-600 mb-4">
              Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={deleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
