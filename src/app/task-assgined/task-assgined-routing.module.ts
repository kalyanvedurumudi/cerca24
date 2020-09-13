import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskAssginedPage } from './task-assgined.page';

const routes: Routes = [
  {
    path: '',
    component: TaskAssginedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskAssginedPageRoutingModule {}
