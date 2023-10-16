import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {ContainerService} from "./service/container.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                private dockerContainerService: ContainerService) {
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

}
