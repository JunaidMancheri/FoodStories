export type Action<EntityName extends string,  ActionName extends string> = `${EntityName}.${ActionName}`; 

export enum HandlerType {
  RPC = 'rpc',
  EVENT = 'event'
}