import { WebSocketGateway, WebSocketServer, OnGatewayConnection , SubscribeMessage, ConnectedSocket, MessageBody} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class NotificationsGateway implements OnGatewayConnection{

  handleConnection(client: Socket, ...args: any[]) {
    client.join(client.data.userId)
  }

  @SubscribeMessage('subscribe-to-notifications') 
  subscribe(@ConnectedSocket() client: Socket, @MessageBody() userId: string) {
    console.log(userId);
    client.join(userId);
  } 

 sendNotification(userId: string, message:  string) {
  console.log(userId, message)
    this.server.to(userId).emit('notifications', message);
  }
  @WebSocketServer() server!: Server;
}