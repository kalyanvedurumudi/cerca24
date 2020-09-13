import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public toastCtrl: ToastController) {

  }

  async showToast(data) {
    const toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'middle'
    });
    (await toast).present();
  }

  commingsoon() {
   this.showToast('Comming Soon');
  }

}
