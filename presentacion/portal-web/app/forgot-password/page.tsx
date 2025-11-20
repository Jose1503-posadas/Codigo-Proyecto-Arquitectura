export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen">
      {/* LEFT FORM */}
      <div className="flex flex-col justify-center p-20 w-1/2">
        <h1 className="text-4xl font-bold mb-3">Recuperar contraseña</h1>
        <p className="text-gray-500 mb-10">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
        </p>

        <form action="/api/forgot-password" method="POST" className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="border rounded-lg p-3"
          />

          <button className="bg-black text-white py-3 rounded-lg">
            Enviar enlace
          </button>
        </form>

        <div className="mt-6 text-sm">
          ¿Recuerdas tu contraseña?{" "}
          <a href="/login" className="text-blue-600">Inicia sesión</a>
        </div>
      </div>

      {/* RIGHT IMAGE BLOCK */}
      <div className="w-1/2 hidden md:block">
        <img
          src="/images/reset-password.jpg"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </div>
  );
}
