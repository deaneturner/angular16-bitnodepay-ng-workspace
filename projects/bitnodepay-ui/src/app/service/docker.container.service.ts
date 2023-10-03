import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DockerContainerService {

  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  }

  getContainerCPUInfoById(id: string) {
    this.socket.emit('getSysInfo', id);
    this.socket.on(id, (data: any) => {
      console.log(data);
    });
    this.socket.on('end', (status: any) => {
      console.log("[END] getContainerCPUInfoById");
    });
  }
}
