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

  socketConnected = false;

  constructor(private socket: Socket, private notificationService: NotificationService, private http: HttpClient) {
    this.socketContainers();
    this.socket.on('disconnect', () => {
      this.notificationService.showMessage({
        severity: MessageErrorType.FATAL,
        summary: 'The Container Service has disconnected!',
        detail: 'Closing this message will trigger a reconnect. Note: you can also try refreshing the browser window.',
        callback: () => {
          this.socketConnected = false;
          this.socketContainers();
        },
      });
    });
  }

  /*
   * overview
   */
  getOverview() {
      return this.http.get<any>('http://localhost:3000/api/overview')
        .pipe(
          map(data => data.json)
        );
  }

/**
 * containers list
 */
  getContainers() {
    return this.http.get<any>('http://localhost:3000/api/containers')
      .pipe(
        map(data => data.json)
      );
  }

  getContainersStart(id:string) {
    return this.http.get<any>(`http://localhost:3000/api/containers/start/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  getContainersStop(id:string) {
    return this.http.get<any>(`http://localhost:3000/api/containers/stop/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  getContainersRemove(id:string) {
    return this.http.get<any>(`http://localhost:3000/api/containers/remove/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  /*
   * images list
   */
  getImages() {
    return this.http.get<any>(`http://localhost:3000/api/images`)
      .pipe(
        map(data => data.json)
      );
  }

  getImagesRemove(id:string) {
    return this.http.get<any>(`http://localhost:3000/api/images/remove/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  /*
   * search
   */
  getSearch(name:string) {
    return this.http.get<any>(`/search/${name}`)
      .pipe(
        map(data => data.json)
      );
  }

  /*
   * socket
   */
  private socketContainers() {
    this.getContainersInfo('1105c672d412eb78e6ae4622b213b8afbd337b2e341d56a5f98e0c06c691240d');
    setTimeout(() => {
      if(!this.socketConnected) {
        this.notificationService.showMessage({
          severity: MessageErrorType.FATAL,
          summary: 'The Container Service has not connected!',
          detail: 'The service may be down or there may be no containers available to serve.',
          callback: () => {
            this.socketContainers();
          },
        });
      }
    }, 3000);
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
      if (!this.socketConnected) {
        this.notificationService.messages = [];
        this.socketConnected = true;
        this.notificationService.showMessage({severity: MessageErrorType.success, summary: 'Containers Info Service: Connected!', detail: ''})
      }
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
