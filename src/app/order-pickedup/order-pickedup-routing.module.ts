import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPickedupPage } from './order-pickedup.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPickedupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPickedupPageRoutingModule {}
