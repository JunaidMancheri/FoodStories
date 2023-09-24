export  interface IisUsernameAvailableUseCase {
  execute(data: isUsernameAvailableNS.Request): Promise<isUsernameAvailableNS.Response>
}

export namespace isUsernameAvailableNS {
  export type Request = { username: string };
  export type Response = { available :  boolean };
}