export interface ILogger {
   warn(message: string, metadata: unknown): void;
   error(message: string, metadata: unknown): void;
   debug(message: string, metadata: unknown): void;
   info(message: string, metadata: unknown): void;
}