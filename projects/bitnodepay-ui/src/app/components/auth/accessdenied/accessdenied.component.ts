import { Component } from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
// import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
    templateUrl: './accessdenied.component.html'
})
export class AccessdeniedComponent {
    constructor(public layoutService: LayoutService){

    }
}
