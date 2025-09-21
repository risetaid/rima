import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  listenForUpdates(): Observable<any> {
    return this.socket.fromEvent('update');
  }

  // Placeholder for emitting if needed
  emitEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }
}