import {Component} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {AuthService} from "../../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {confirmPasswordValidator} from "../newpassword/newpassword.component";

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form: FormGroup;

  errors: string[] = [];

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
        password: ['', Validators.required],
        confirm: ['', Validators.required],
      }, {
      validators: confirmPasswordValidator
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  register() {
    debugger;
    const val = this.form.value;
    if (val.email && val.password && val.password === val.confirm) {
      this.authService.register(val.name, val.email, val.password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');

            console.log("User created successfully")
          },
          error: response => this.errors = response.error.errors
        });

    }
  }

  protected readonly JSON = JSON;
}
