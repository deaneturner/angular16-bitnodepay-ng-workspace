import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DockerContainerService {

  constructor(private socket: Socket) {
    debugger;
    this.getContainerCPUInfoById('a89e1fbd2b2ef85a1029d0a781dcba8f52c70db5923451bef61c80541d063ec9');
  }

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
