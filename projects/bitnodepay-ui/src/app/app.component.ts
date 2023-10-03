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
      dockerContainerService.getContainerCPUInfoById('78a12d9321c52b099f6949e47845b16d7b0f8d40dcf2829c1b761f0758de5aa1');
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

}
