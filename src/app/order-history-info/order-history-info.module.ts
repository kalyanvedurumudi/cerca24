import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryInfoPageRoutingModule } from './order-history-info-routing.module';

import { OrderHistoryInfoPage } from './order-history-info.page';
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
    OrderHistoryInfoPageRoutingModule
  ],
  providers: [ApiProvider, HttpInterceptorService],
  declarations: [OrderHistoryInfoPage]
})
export class OrderHistoryInfoPageModule { }
