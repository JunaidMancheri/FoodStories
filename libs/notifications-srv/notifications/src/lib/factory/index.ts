/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseHandler, BaseSubscriber, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { notificationsModel } from "../infra/db/notifications.model";

export class NotificationsSubscriber extends BaseSubscriber {
  event = 'notifications';
  async execute(payload: any): Promise<void> {
    await notificationsModel.create({
      userId: payload.userId,
      message: payload.message,
    })
  }

}


export class GetNotificationsHandler extends BaseHandler {
 async execute(request: RequestPayload<any, any>): Promise<ResponsePayload<any>> {
    return respondSuccess({notifications: await notificationsModel.find({userId: request.data.userId})});
  }
  
}