import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
  
import { IonicModule } from '@ionic/angular';

import { OrderPickedupPageRoutingModule } from './order-pickedup-routing.module';

import { OrderPickedupPage } from './order-pickedup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,  
    OrderPickedupPageRoutingModule
  ],
  declarations: [OrderPickedupPage]
})
export class OrderPickedupPageModule {}
