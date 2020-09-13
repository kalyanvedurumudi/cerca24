import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-delivery-completed',
  templateUrl: './delivery-completed.page.html',
  styleUrls: ['./delivery-completed.page.scss'],
})
export class DeliveryCompletedPage implements OnInit {

  constructor(private navCtrl: NavController, private route: Router, private storage: Storage) { }

  ngOnInit() {
  }

  tabs() {
    this.navCtrl.navigateRoot(['./tabs/home']);
  }
  order_history_info() {
    this.storage.remove('page');
    this.storage.set('page', 'history');
    this.route.navigate(['./myorders']);
  }
  wallet() {
    this.route.navigate(['./wallet']);
  }
}
