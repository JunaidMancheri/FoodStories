export interface IisRegisteredUserRepo {
  isRegisteredUser(email: string): Promise<boolean>;
}