import { Component } from '@angular/core';
import {LayoutService} from "../../layout/service/app.layout.service";
// import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './notfound.component.html'
})
export class NotfoundComponent {
	constructor(public layoutService: LayoutService){

    }
}
