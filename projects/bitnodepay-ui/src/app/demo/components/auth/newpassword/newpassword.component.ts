import { Component } from '@angular/core';
import {LayoutService} from "../../../../layout/service/app.layout.service";
// import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './newpassword.component.html'
})
export class NewPasswordComponent {

	rememberMe: boolean = false;

	constructor(public layoutService: LayoutService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

}
