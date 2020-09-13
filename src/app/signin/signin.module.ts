import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { ApiProvider } from '../providers/api-provider';
import { HttpInterceptorService } from '../providers/HttpInterceptorService';
import { HttpModule } from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { LocationTracker } from '../providers/LocationTracker';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SigninPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [LocationAccuracy, LocationTracker, AndroidPermissions, ApiProvider, HttpInterceptorService],
  declarations: [SigninPage]
})
export class SigninPageModule { }
