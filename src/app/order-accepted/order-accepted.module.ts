import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	
import { IonicModule } from '@ionic/angular';

import { OrderAcceptedPageRoutingModule } from './order-accepted-routing.module';

import { OrderAcceptedPage } from './order-accepted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    OrderAcceptedPageRoutingModule
  ],
  declarations: [OrderAcceptedPage]
})
export class OrderAcceptedPageModule {}
