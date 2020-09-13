import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	 
import { IonicModule } from '@ionic/angular';
import { MyordersPage } from './myorders.page';
import { MyordersPageRoutingModule } from './myorders-routing.module';
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
    MyordersPageRoutingModule
  ],
  providers: [ApiProvider,HttpInterceptorService],
  declarations: [MyordersPage]
})
export class MyordersPageModule {}
