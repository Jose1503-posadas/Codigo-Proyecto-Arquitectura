export default class Usuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;

  constructor(nombre: string, apellido: string, email: string, password: string) {
    if (!email.includes("@")) throw new Error("Email inválido");
    if (password.length < 6) throw new Error("Contraseña muy corta");

    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password; // será hasheado en el repo
  }
}
