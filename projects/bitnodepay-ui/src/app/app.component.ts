import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {DockerContainerService} from "./service/docker.container.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                private dockerContainerService: DockerContainerService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

}
