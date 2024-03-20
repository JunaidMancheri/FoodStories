/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class NotificationsWebsocket {
  socket = inject(Socket);
  snackBar = inject(MatSnackBar);

  connect(userId: string) {
    this.socket.emit('subscribe-to-notifications', userId)
    this.socket.on('notifications', (data: any) => {
      this.snackBar.open(data, 'dismiss', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
        panelClass: [ 'noti'],
      });
    });
  }
}
