import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAcceptedPage } from './order-accepted.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAcceptedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAcceptedPageRoutingModule {}
