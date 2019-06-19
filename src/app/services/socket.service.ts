import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private baseUrl = "http://localhost:3000";
  private socket;
  constructor() {
    this.socket = io(this.baseUrl);
   }

  onGetNotification(data: any) {
    this.socket.emit("getNotification", data);
  }

  onShow() {
    let observable = new Observable<any>(observer => {
      this.socket.on("showToall", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
