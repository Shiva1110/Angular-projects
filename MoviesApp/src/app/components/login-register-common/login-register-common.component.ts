import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login-register-common',
  templateUrl: './login-register-common.component.html',
  styleUrls: ['./login-register-common.component.scss']
})
export class LoginRegisterCommonComponent implements OnInit {

  @Input() page: string = '';
  registrationForm: FormGroup;
  loginForm: FormGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hide: boolean = true;
  hideRegPass: boolean = true;
  hideRegRepass: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
      //profileImage: ['', Validators.required]
    },
    {
      validators: this.passwordMatch('password', 'rePassword')
    });

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideIcon() {
    this.hide = !this.hide;
  }

  hideRegPassIcon() {
    this.hideRegPass = !this.hideRegPass;
  }

  hideRegRepassIcon() {
    this.hideRegRepass = !this.hideRegRepass;
  }

  passwordMatch(passwordControl: string, repassControl: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[passwordControl];
      const repass = formGroup.controls[repassControl];
      if(repass.errors && !repass.errors['passwordMatch']) {
        return;
      }
      if(pass.value !== repass.value) {
        repass.setErrors({passwordMatch: true});
      } else {
        repass.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
  }

  registerUser() {
    let data = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    console.log(data);
  }

  logInUser() {
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(data);
  }

}
