export type Action = `${string}.${string}`; 

export enum HandlerType {
  RPC = 'rpc',
  EVENT = 'event'
}

