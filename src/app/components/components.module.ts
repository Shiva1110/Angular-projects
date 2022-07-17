import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginRegisterCommonComponent } from './login-register-common/login-register-common.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    RegistrationPageComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    LoginRegisterCommonComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class ComponentsModule { }
