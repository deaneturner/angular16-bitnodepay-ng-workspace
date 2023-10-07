import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Terminal} from "xterm";
import {DOCUMENT} from "@angular/common";

import {AttachAddon} from 'xterm-addon-attach';
import {FitAddon} from 'xterm-addon-fit';
import {SerializeAddon} from "xterm-addon-serialize";
import {Unicode11Addon} from 'xterm-addon-unicode11';
import {WebLinksAddon} from 'xterm-addon-web-links';
import {DockerContainerService} from "../../../service/docker.container.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('terminal') terminalEl!: ElementRef;

  socket: Socket;
  terminal: Terminal;

  constructor(@Inject(DOCUMENT) private document: Document, private dockerContainerService: DockerContainerService) {
    const self = this;
    this.socket = this.dockerContainerService.socket;
    this.terminal = new Terminal({
      screenKeys: true,
      useStyle: true,
      cursorBlink: true,
      cursorStyle: 'bar', // 光标样式
      fullscreenWin: true,
      maximizeWin: true,
      screenReaderMode: true,
      cols: 128,
      theme: {
        foreground: 'white',
        background: '#2A2C34',
        cursor: 'help',
        lineHeight: 16,
      },
    } as any);  // TODO - troubleshoot if setting: as any - is detrimental
    const id = window.location.pathname.split('/')[3];
    const host = window.location.origin;
    // const socket = io.connect(host); // TODO - troubleshoot if setting: new AttachAddon(this.socket.ioSocket) below - is detrimental

    const attachAddon = new AttachAddon(this.socket.ioSocket); // TODO - troubleshoot if refactoring from: new AttachAddon(socket) - is detrimental
    const fitAddon = new FitAddon();
    this.terminal.loadAddon(fitAddon);
    const webLinksAddon = new WebLinksAddon();
    this.terminal.loadAddon(webLinksAddon);
    const unicode11Addon = new Unicode11Addon();
    this.terminal.loadAddon(unicode11Addon);
    const serializeAddon = new SerializeAddon();
    this.terminal.loadAddon(serializeAddon);
    this.terminal.loadAddon(attachAddon);
    // @ts-ignore
    this.terminal._initialized = true; //TODO - troubleshoot if ignoring: ._initialized - is detrimental
    this.terminal.focus();

    setTimeout(function () {
      fitAddon.fit();
      self.socket.emit('cmd', "export TERM=xterm\n");
      self.socket.emit('cmd', "PS1=\"\\[\\033[01;31m\\]\\u\\[\\033[01;33m\\]@\\[\\033[01;36m\\]\\h \\[\\033[01;33m\\]\\w \\[\\033[01;35m\\]\\$ \\[\\033[00m\\]\"\n");
      self.socket.emit('cmd', "alias ls='ls --color'\n");
      self.socket.emit('cmd', "alias ll='ls -alF'\n");
      self.socket.emit('cmd', "clear\n");
    });

    this.terminal.onResize(function (event) {
      const rows = event.rows;
      const cols = event.cols;
      console.log('resizing to', {cols: cols, rows: rows + 1});
      self.socket.emit('resize', {cols: cols, rows: rows + 1});
    });

    this.terminal.onTitleChange(function (event) {
      console.log(event);
    });

    window.onresize = function () {
      fitAddon.fit();
    };

    this.terminal.onData((data) => {
      this.socket.emit('cmd', data);
    });
    this.socket.on('show', (data: any) => {
      this.terminal.write(data);
    });

    this.socket.on('end', (status: any) => {
      // $('#terminal').empty();
      this.socket.disconnect();
      this.terminal.write('\r\n\nconnection has been terminated from the server-side (hit refresh to restart)\n');
    });
  }

  ngAfterViewInit(): void {
    this.socket.emit('exec', 'terminal', this.terminalEl.nativeElement.width(), this.terminalEl.nativeElement.height());
    this.terminal.open(this.terminalEl.nativeElement);
  }
}
