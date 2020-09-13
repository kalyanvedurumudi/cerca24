import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { TaskAssginedPageRoutingModule } from './task-assgined-routing.module';

import { TaskAssginedPage } from './task-assgined.page';
import { ApiProvider } from '../providers/api-provider';
import { HttpInterceptorService } from '../providers/HttpInterceptorService';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TaskAssginedPageRoutingModule
  ],
  providers: [CallNumber, ApiProvider, HttpInterceptorService],
  declarations: [TaskAssginedPage]
})
export class TaskAssginedPageModule { }
