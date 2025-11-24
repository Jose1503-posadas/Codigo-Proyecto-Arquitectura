export default class Perfil {
  constructor(
    public usuarioId: number,
    public telefono: string | null,
    public direccion: string | null,
    public ciudad: string | null,
    public pais: string | null
  ) {}
}
