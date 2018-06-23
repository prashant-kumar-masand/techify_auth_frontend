import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import {
  MdDialogModule,
  MdSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BackendService } from './backend.service'
import { PasswordValidatorDirective } from "./directives/password-validator.directive";
import { HomeComponent } from './home/home.component';

import { userDataService } from "./service/user-data.service";
import { AuthGuard } from "./service/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PasswordValidatorDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MdDialogModule,
    MdSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [BackendService, AuthGuard, userDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
