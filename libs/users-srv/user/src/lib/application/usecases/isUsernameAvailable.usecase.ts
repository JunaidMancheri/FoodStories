import { IisUsernameAvailableRepo } from "../interfaces/repository/isUsernameAvailable.interface";
import { IisUsernameAvailableUseCase, isUsernameAvailableNS } from "../interfaces/usecases/isUsernameAvailable.interface";

export class isUsernameAvailableUseCase implements IisUsernameAvailableUseCase {
  
  constructor(private isUsernameAvailableRepo: IisUsernameAvailableRepo) {}

  async execute(data: isUsernameAvailableNS.Request): Promise<isUsernameAvailableNS.Response> {
    const isAvailable = await this.isUsernameAvailableRepo.isUsernameAvailable(data.username);
    return { available: isAvailable}
  }

}