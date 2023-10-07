import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';

import {Terminal} from "xterm";
import {Socket} from "ngx-socket-io";
import {DOCUMENT} from "@angular/common";
import {DockerContainerService} from "../../../service/docker.container.service";
import {FitAddon} from "xterm-addon-fit";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements AfterViewInit {
  @ViewChild('terminal') terminalEl!: ElementRef;

  socket: Socket;
  terminal: Terminal;

  constructor(@Inject(DOCUMENT) private document: Document, private dockerContainerService: DockerContainerService) {
    const self = this;
    this.socket = this.dockerContainerService.socket;
      this.terminal = new Terminal({
        useStyle: true,
        convertEol: true,
        screenKeys: false,
        cursorBlink: false,
        visualBell: false,
        colors: (Terminal as any).xtermColors // TODO - troubleshoot if setting: as any - is detrimental
      } as any);  // TODO - troubleshoot if setting: as any - is detrimental
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

      this.socket.on('show', (data: any) => {
        self.terminal.write(data);
      });

      this.socket.on('end', (status: any) => {
        self.socket.disconnect();
      });
    }

  ngAfterViewInit(): void {
    this.socket.emit('attach', 'terminal', this.terminalEl.nativeElement.width(), this.terminalEl.nativeElement.height());
    this.terminal.open(this.terminalEl.nativeElement);
    }
}
