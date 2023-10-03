import { TestBed } from '@angular/core/testing';

import { DockerContainerService } from './docker.container.service';
import {SocketIoModule} from "ngx-socket-io";

describe('DockerContainerService', () => {
  let service: DockerContainerService;

  beforeEach(() => {
    let IO_CONFIG = { url: 'http://localhost:3000', options: {transports : ['websocket']} };
    TestBed.configureTestingModule({
      imports: [SocketIoModule.forRoot(IO_CONFIG)]
    });
    service = TestBed.inject(DockerContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
