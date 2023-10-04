import {Injectable, OnDestroy} from '@angular/core';
import {Socket, SocketIoConfig} from "ngx-socket-io";
import {map} from "rxjs/operators";
import {MessageErrorType, NotificationService} from "./notification.service";
import {HttpClient} from "@angular/common/http";

export const config: SocketIoConfig = {url: 'http://localhost:3000', options: {transports: ['websocket']}};

@Injectable({
  providedIn: 'root'
})
export class DockerContainerService implements OnDestroy {

  constructor(private socket: Socket, private notificationService: NotificationService, private http: HttpClient) {
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

  /*
   * overview
   */
  getOverview() {
    return this.http.get<any>('api/overview')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

/**
 * containers list
 */
  getContainers() {
    return this.http.get<any>('api/containers')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  getContainersStart(id:string) {
    return this.http.get<any>(`api/containers/start/${id}`)
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  getContainersStop(id:string) {
    return this.http.get<any>(`api/containers/stop/${id}`)
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  getContainersRemove(id:string) {
    return this.http.get<any>(`api/containers/remove/${id}`)
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  /*
   * images list
   */
  getImages(id:string) {
    return this.http.get<any>(`api/images`)
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  getImagesRemove(id:string) {
    return this.http.get<any>(`api/images/remove/${id}`)
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  /*
   * search
   */
  getSearch(name:string) {
    return this.http.get<any>(`/search/${name}`)
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  /*
   * socket
   */
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

  /*
   * getSysInfo / id
   */
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

  /*
   * getContainersInfo / containerinfo
   */
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
