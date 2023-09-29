export interface IisRegisteredUserUseCase {
  execute(request: isRegisteredUserNS.Request): Promise<isRegisteredUserNS.Response>
}

export namespace isRegisteredUserNS {
  export type Request = { email : string };
  export type Response = { registered: boolean};
}