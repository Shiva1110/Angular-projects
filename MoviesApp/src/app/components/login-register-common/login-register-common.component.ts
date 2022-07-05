import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register-common',
  templateUrl: './login-register-common.component.html',
  styleUrls: ['./login-register-common.component.scss']
})
export class LoginRegisterCommonComponent implements OnInit {

  @Input() page: string = '';
  registrationForm: FormGroup;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      profileImage: ['', Validators.required]
    });

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  validateForm() {
    
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
