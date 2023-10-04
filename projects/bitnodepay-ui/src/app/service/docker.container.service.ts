import {Injectable, OnDestroy} from '@angular/core';
import {Socket, SocketIoConfig} from "ngx-socket-io";
import {map} from "rxjs/operators";
import {MessageErrorType, NotificationService} from "./notification.service";

export const config: SocketIoConfig = {url: 'http://localhost:3000', options: {transports: ['websocket']}};

@Injectable({
  providedIn: 'root'
})
export class DockerContainerService implements OnDestroy {

  constructor(private socket: Socket, private notificationService: NotificationService) {
    this.socketContainers();
    this.socket.on('disconnect', () => {
      this.notificationService.showMessage({
        severity: MessageErrorType.FATAL,
        summary: 'The Container Service has disconnected!',
        detail: 'Closing this message will trigger a reconnect. Note: you can also try refreshing the browser window.',
        callback: () => {
          this.socketContainers();
        },
      });
    });
  }

  private socketContainers() {
    this.getContainersInfo('5c6eecc37462aea1efc9f372b9366232c8d5209ceabd24b626aa07d59c6d7d57');
    // this.getContainerCPUInfoById('5c6eecc37462aea1efc9f372b9366232c8d5209ceabd24b626aa07d59c6d7d57');
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
      this.notificationService.showMessage({severity: MessageErrorType.success, summary: 'Container CPU Info Service: Connected!', detail: ''})
    });
    this.socket.on(id, (data: any) => {
      console.log(data);
    });
    this.socket.on('end', (status: any) => {
      console.log("[END] getContainerCPUInfoById");
    });
  }

  // containerInfo
  // getContainersInfo
  getContainersInfo(id: string) {
    this.socket.emit('getContainersInfo', id);
    this.socket.once('containerInfo', (data: any) => {
      this.notificationService.showMessage({severity: MessageErrorType.success, summary: 'Containers Info Service: Connected!', detail: ''})
    });
    this.socket.on('containerInfo', (data: any) => {
      console.log(data);
    });
    this.socket.on('end', (status: any) => {
      console.log("[END] getContainersInfo");
    });
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
  }


}
