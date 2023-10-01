import { Component } from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
// import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './register.component.html'
})
export class RegisterComponent {

	confirmed: boolean = false;

	constructor(public layoutService: LayoutService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

}
