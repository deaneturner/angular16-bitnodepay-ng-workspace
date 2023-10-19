import {Injectable, OnDestroy} from '@angular/core';
import {Socket, SocketIoConfig} from "ngx-socket-io";
import {distinctUntilChanged, map, takeUntil} from "rxjs/operators";
import {MessageErrorType, NotificationService} from "./notification.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";

export const config: SocketIoConfig = {url: environment.wsUrl, options: {transports: ['websocket']}};

@Injectable({
  providedIn: 'root'
})
export class ContainerService implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  containers = {
    defaultId: '',
    connect: (monitor: any) => {
      monitor?.status.running$.pipe(takeUntil(this.destroy$)).subscribe((socketConnected: boolean) => {
        if (socketConnected) {
          console.log('Container Service: containers are starting.');
          this.getContainersInfo(this.containers.defaultId);
        } else {
          console.warn('Container Service: connect: waiting to connect...');
        }
      });
    },
    get: () => {
      return this.getContainers();
    },
  };

  monitor = {
    status: {
      subject: new BehaviorSubject<boolean>(false),
      running$: new Observable<boolean>(),
      update: (socketConnected: boolean) => {
        this.monitor.status.subject.next(socketConnected);
      },
      init: (socketConnected: boolean) => {
        this.monitor.status.subject = new BehaviorSubject<boolean>(socketConnected);
        this.monitor.status.running$ = this.monitor.status.subject.asObservable().pipe(distinctUntilChanged());
      }
    },
    socketConnected: false,
    sysInfo: {
      get: (id: string, socket: Socket, notifications: NotificationService) => {
        socket.emit('getSysInfo', id);
        socket.once(id, (data: any) => {
          if (!this.monitor.socketConnected) {
            const msg = 'Container Service is available.';
            console.log(msg);
            notifications.messages = [];
            this.monitor.socketConnected = true;
            this.monitor.status.update(this.monitor.socketConnected);
            notifications.showMessage({
              severity: MessageErrorType.success,
              summary: msg,
              detail: ''
            })
          }
        });
        socket.on('end', (status: any) => {
          const msg = 'Container Service: Gracefully Ended!';
          console.warn(msg);
          notifications.showMessage({
            severity: MessageErrorType.success,
            summary: msg,
            detail: ''
          })
        });
      },
      watch: (containerId: string, socket: Socket, notifications: NotificationService) => {
        this.monitor.sysInfo.get(containerId, socket, notifications);
        setTimeout(() => {
          if (!this.monitor.socketConnected) {
            const msg = 'The Container Service has not connected!';
            console.warn(msg);
            notifications.showMessage({
              severity: MessageErrorType.FATAL,
              summary: msg,
              detail: 'The service may be down or there may be no containers available to serve.',
              callback: () => {
                this.monitor.sysInfo.watch(this.containers.defaultId, this.socket, this.notificationService);
              },
            });
          }
        }, 3000);
      }
    },
    events: {
      watch: {
        onDisconnect: (socket: Socket, notifications: NotificationService) => {
          // handle disconnect
          socket.on('disconnect', () => {
            const msg = 'The Container Service has disconnected!';
            console.warn(msg);
            notifications.showMessage({
              severity: MessageErrorType.FATAL,
              summary: msg,
              detail: 'Closing this message will trigger a reconnect.',
              callback: () => {
                this.monitor.socketConnected = false;
                this.monitor.status.update(this.monitor.socketConnected);
                this.monitor.sysInfo.watch(this.containers.defaultId, this.socket, this.notificationService);
              },
            });
          });
        }
      }
    },
    init: (notifications: NotificationService) => {
      this.containers.get()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res: any) => {
            setTimeout(() => {
              this.notificationService.showMessage({
                severity: MessageErrorType.success,
                summary: 'Data Service is available.',
                detail: ''
              });
            }, 3000);
            // monitor instance uses first container for status reporting
            this.containers.defaultId = res[0].Id;
            // pass monitor instance for determination of status
            this.monitor.sysInfo.watch(this.containers.defaultId, this.socket, this.notificationService);
            this.monitor.events.watch.onDisconnect(this.socket, this.notificationService);
            this.monitor.status.init(this.monitor.socketConnected);
            return this.monitor;
          },
          (error) => {
            const msg = 'The Container Service has not connected!';
            notifications.showMessage({
              severity: MessageErrorType.FATAL,
              summary: msg,
              detail: 'Unfortunately, this error is fatal, backend, service error.',
              callback: () => {
                this.monitor.socketConnected = false;
                this.monitor.status.update(this.monitor.socketConnected);
                this.monitor.sysInfo.watch(this.containers.defaultId, this.socket, this.notificationService);
              },
            });
            console.error(msg, 'Most likely due to an authentication error (login page being returned from service...).');
            }
        );
    }
  }

  constructor(public socket: Socket, private notificationService: NotificationService, private http: HttpClient) {
    this.containers.connect(this.monitor.init(notificationService));
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
        map(data => data)
      );
  }

  getContainersStart(id: string) {
    return this.http.get<any>(`http://localhost:3000/api/containers/start/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  getContainersStop(id: string) {
    return this.http.get<any>(`http://localhost:3000/api/containers/stop/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  getContainersRemove(id: string) {
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

  getImagesRemove(id: string) {
    return this.http.get<any>(`http://localhost:3000/api/images/remove/${id}`)
      .pipe(
        map(data => data.json)
      );
  }

  /*
   * search
   */
  getSearch(name: string) {
    return this.http.get<any>(`/search/${name}`)
      .pipe(
        map(data => data.json)
      );
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  }

  /*
   * getContainersInfo / containerinfo
   */
  getContainersInfo(id: string) {
    this.socket.emit('getContainersInfo', id);
    this.socket.on('containerInfo', (data: any) => {
      console.log(data);
    });
    this.socket.on('end', (status: any) => {
      console.log("[END] getContainersInfo");
    });
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
