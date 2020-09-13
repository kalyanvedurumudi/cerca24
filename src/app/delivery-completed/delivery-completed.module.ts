import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DeliveryCompletedPageRoutingModule } from './delivery-completed-routing.module';

import { DeliveryCompletedPage } from './delivery-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    DeliveryCompletedPageRoutingModule
  ],
  declarations: [DeliveryCompletedPage]
})
export class DeliveryCompletedPageModule {}
