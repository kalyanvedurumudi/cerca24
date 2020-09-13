import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';
import { ApiProvider } from '../providers/api-provider';
import { HttpInterceptorService } from '../providers/HttpInterceptorService';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    MyProfilePageRoutingModule
  ],
  providers: [ApiProvider, HttpInterceptorService],

  declarations: [MyProfilePage]
})
export class MyProfilePageModule { }
