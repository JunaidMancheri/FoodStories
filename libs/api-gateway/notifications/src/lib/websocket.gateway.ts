import { WebSocketGateway, WebSocketServer, OnGatewayConnection , SubscribeMessage, ConnectedSocket, MessageBody} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class NotificationsGateway implements OnGatewayConnection{

  handleConnection(client: Socket) {
    client.join(client.data.userId)
  }

  @SubscribeMessage('subscribe-to-notifications') 
  subscribe(@ConnectedSocket() client: Socket, @MessageBody() userId: string) {
    client.join(userId);
  } 

 sendNotification(userId: string, message:  string) {
    this.server.to(userId).emit('notifications', message);
  }
  @WebSocketServer() server!: Server;
}