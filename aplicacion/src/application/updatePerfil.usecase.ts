import Perfil from "../domain/perfil.entity";
import perfilRepo from "../infrastructure/perfil.repository";

export default class UpdatePerfilUseCase {
  async execute(usuarioId: number, data: any) {
    const perfil = new Perfil(
      usuarioId,
      data.telefono || null,
      data.direccion || null,
      data.ciudad || null,
      data.pais || null
    );

    return await perfilRepo.upsert(perfil);
  }
}
