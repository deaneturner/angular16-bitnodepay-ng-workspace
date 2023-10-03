import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {DockerContainerService} from "./service/docker.container.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                private dockerContainerService: DockerContainerService) {
      // TEST docker container service via socket
      dockerContainerService.getContainerCPUInfoById('a89e1fbd2b2ef85a1029d0a781dcba8f52c70db5923451bef61c80541d063ec9');
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

}
