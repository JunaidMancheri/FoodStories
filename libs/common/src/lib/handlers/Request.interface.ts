/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandlerType } from "./helper.interface";

export interface RequestPayload<RequestDataType = any, MetadataType = any>  {
  type: HandlerType;
  data: RequestDataType extends object ? RequestDataType: undefined
  metadata: MetadataType extends object  ? MetadataType: undefined;
}


