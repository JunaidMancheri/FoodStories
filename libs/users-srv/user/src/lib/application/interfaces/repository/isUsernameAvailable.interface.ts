export interface IisUsernameAvailableRepo {
  isUsernameAvailable(username: string) : Promise<boolean>;
}