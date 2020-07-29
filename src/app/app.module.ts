import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login/login-routing.module';

import { SharedPrimeControlsModule } from './shared-prime-controls/shared-prime-controls.module';
import { SharedUserModule } from './shared-user/shared-user.module';
import { SharedWorkerModule } from './shared-worker/shared-worker.module';
import { SharedOrderDetailsModule } from './shared-order-details/shared-order-details.module';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginRoutingModule,
    SharedPrimeControlsModule,
    SharedOrderDetailsModule,
    SharedUserModule,
    SharedWorkerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
