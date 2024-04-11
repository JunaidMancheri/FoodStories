import { Schema, model } from "mongoose";

const notificationSchema  = new Schema({
  type: String,
  message: String,
  userId: String,
  fromUserId: String,
})


export const notificationsModel = model('notifications', notificationSchema);