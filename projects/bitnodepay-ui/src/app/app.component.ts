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
      dockerContainerService.getContainerCPUInfoById('c52e343389f92e8de78ec0343577a4f1a2a6e9356bcc0ffd272208255aa5f3a8');
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

}
