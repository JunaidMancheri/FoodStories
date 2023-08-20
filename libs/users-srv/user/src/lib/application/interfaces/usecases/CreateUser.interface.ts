export interface ICreateUserUseCase {
  execute(params: void): Promise<void>;
}