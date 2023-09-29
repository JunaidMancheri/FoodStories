import { IisRegisteredUserRepo } from "../interfaces/repository/isRegisteredUser.interface";
import { IisRegisteredUserUseCase, isRegisteredUserNS } from "../interfaces/usecases/isRegisteredUser.interface";

export class IsRegisteredUserUsecase implements  IisRegisteredUserUseCase {
  constructor(private userRepo: IisRegisteredUserRepo) {}
  async execute(request: isRegisteredUserNS.Request): Promise<isRegisteredUserNS.Response> {
    const registered = await this.userRepo.isRegisteredUser(request.email);
    return { registered };
  }
  
}