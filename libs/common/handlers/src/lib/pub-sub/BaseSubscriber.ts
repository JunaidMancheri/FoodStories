/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class BaseSubscriber {
  abstract event: string;
  abstract execute(payload: any): Promise<void>;
  async handle(payload: any) {
    await this.execute(payload);
  } 
}