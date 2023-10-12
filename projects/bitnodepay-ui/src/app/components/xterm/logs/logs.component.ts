import {AfterViewInit, Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';

import {Terminal} from "xterm";
import {Socket} from "ngx-socket-io";
import {DOCUMENT} from "@angular/common";
import {DockerContainerService} from "../../../service/docker.container.service";
import {FitAddon} from "xterm-addon-fit";
import {jsonPrettyPrint} from "../../../utils/helpers";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements AfterViewInit {
  @ViewChild('terminal') terminalEl!: ElementRef;

  @Input() containerId: string =  '';

  socket: Socket;
  terminal: Terminal;

  constructor(@Inject(DOCUMENT) private document: Document, private dockerContainerService: DockerContainerService) {
    this.socket = this.dockerContainerService.socket;
    this.terminal = new Terminal({
      theme: {
        foreground: 'black',
        background: 'white',
      },
      fontSize: 10,
      useStyle: true,
      convertEol: true,
      screenKeys: false,
      cursorBlink: false,
      visualBell: false,
      colors: (Terminal as any).xtermColors // TODO - troubleshoot if setting: as any - is detrimental
    } as any);  // TODO - troubleshoot if setting: as any - is detrimental
  }

  ngAfterViewInit(): void {
    const self = this;
    const fitAddon = new FitAddon();
    this.terminal.loadAddon(fitAddon);

    window.onload = function () {
      fitAddon.fit();
    };

    this.terminal.onResize(function (event) {
      const rows = event.rows;
      const cols = event.cols;
      console.log('resizing to', {cols: cols, rows: rows + 1});
      self.socket.emit('resize', {cols: cols, rows: rows + 1});
    });

    // var id = window.location.pathname.split('/')[3];
    // var host = window.location.origin;
    // var socket = io.connect(host);
    this.socket.on(this.containerId, (data: any) => {
      // self.terminal.write(data);
      console.log(data);
    });
    this.socket.emit('getContainersInfo', this.containerId); //  test socket.on containerInfo
    this.socket.on('containerInfo', (obj: any) => {
      self.terminal.write(jsonPrettyPrint(obj));
      console.log(JSON.stringify(obj));
    });

    this.socket.on('end', (status: any) => {
      self.socket.disconnect();
    });


    // TODO: Fix
    //this.socket.ioSocket.emit('attach', 'terminal', 300, 300);
    // this.socket.emit('attach', 'terminal', this.terminalEl.nativeElement.width(), this.terminalEl.nativeElement.height());

    this.terminal.open(this.terminalEl.nativeElement);
  }
}
