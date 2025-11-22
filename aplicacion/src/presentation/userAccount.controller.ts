import { Controller, Delete, Req, UseGuards } from "@nestjs/common";
import { DeleteUserUseCase } from "../application/deleteUser.usecase";
import { AuthGuard } from "./auth.guard";

@Controller("DeleteUser")
export class UserAccountController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @UseGuards(AuthGuard)
  @Delete("delete")
  async delete(@Req() req) {
    await this.deleteUserUseCase.execute(req.user.id);
    return { message: "Cuenta eliminada" };
  }
}
