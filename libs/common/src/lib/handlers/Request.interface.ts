import { Action, HandlerType } from "./helper.interface";

export interface RequestPayload<RequestDataType = undefined, MetadataType = undefined> {
  type: HandlerType;
  action: Action<string, string>;
  data: RequestDataType extends object ? RequestDataType: undefined
  metadata?: MetadataType extends object  ? MetadataType: undefined;
}


