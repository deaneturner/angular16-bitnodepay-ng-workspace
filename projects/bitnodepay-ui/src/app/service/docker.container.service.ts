import {Injectable, OnDestroy} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {map} from "rxjs/operators";
import {MessageErrorType, NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class DockerContainerService implements OnDestroy {

  constructor(private socket: Socket, private notificationService: NotificationService) {
    this.socket.on('disconnect', () => {
      this.notificationService.showMessage({severity: MessageErrorType.FATAL, summary: 'Container Service: Disconnected!', detail: 'Please refresh the browser window to re-establish the service.' });
    });
  }


  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  }

  getContainerCPUInfoById(id: string) {
    this.socket.emit('getSysInfo', id);
    this.socket.once(id, (data: any) => {
      this.notificationService.showMessage({severity: MessageErrorType.success, summary: 'Container Service: Connected!', detail: ''})
    });
    this.socket.on(id, (data: any) => {
      console.log(data);
    });
    this.socket.on('end', (status: any) => {
      console.log("[END] getContainerCPUInfoById");
    });
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
  }


}
