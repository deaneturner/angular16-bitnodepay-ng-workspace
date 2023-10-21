import {Component} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {AuthService} from "../../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PasswordValidators} from "../validators/password-validators";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup;
  submitted: boolean = false;
  isWorking: boolean = false;

  errors: string[] = [];

  dialog = {
    display: false,
  }

  messagePerErrorCode = {
    min: 'The minimum length is 10 characters',
    uppercase: 'At least one upper case character',
    digits: 'At least one numeric character',
    "err_user": 'Could not create user'
  };

  confirmed: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, public layoutService: LayoutService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
          requiresDigit: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
          requiresSpecialChars: true
        })
      ])],
      confirmPassword: ['', [Validators.required,
        Validators.minLength(8)]],
      termsConditions: [false, Validators.requiredTrue],
    }, {
      validators: [PasswordValidators.MatchValidator]
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  register() {
    debugger;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isWorking = true;
    this.form.disable();

    setTimeout(() => {
      this.isWorking = false;
      this.form.enable();
    }, 1500);
  }

  get f() {
    return this.form.controls;
  }

  get passwordValid() {
    return this.form.controls["password"].errors === null;
  }

  get requiredValid() {
    return !this.form.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.form.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.form.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.form.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.form.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.form.controls["password"].hasError("requiresSpecialChars");
  }
}
