import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    this.socket = io(environment.SERVER_URL);
  }

  // HANDLER example
  onMonitorUpdate() {
    return new Observable((observer) => {
      this.socket.on('monitorUpdate', (msg) => {
        observer.next(msg);
      });
    });
  }
}
