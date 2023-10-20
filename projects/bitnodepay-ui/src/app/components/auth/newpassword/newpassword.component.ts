import { Component } from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirm
    ? null
    : { confirmPassword: true };
};

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
