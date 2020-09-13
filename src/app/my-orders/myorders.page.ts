import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiProvider } from '../providers/api-provider';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {
  orderlist: any = [];
  page = null;
  constructor(
    private route: Router,
    private apiProvider: ApiProvider,
    private navCtrl: NavController,
    private storage: Storage) {
    this.storage.get('page').then((page) => {
      this.page = page;
      this.getmyorders();
    });
  }

  ngOnInit() {

  }
  gotoorderdetails(items) {
    this.storage.remove('items');
    this.storage.set('items', items);
    //alert(items.deliveryStatus);
    if (items.status != 'deliveried') {
      this.navCtrl.navigateRoot(['./task-assgined']);
    } else {
      this.navCtrl.navigateRoot(['./order-history-info']);
    }
  }

  gotohome() {
    if (this.page == 'home') {
      this.navCtrl.navigateRoot(['./tabs/home']);
    }
    else {
      this.navCtrl.navigateRoot(['./tabs/account']);
    }
  }

  getmyorders() {

    this.apiProvider.get('driver/orders').subscribe(
      async resdata => {
        if (resdata.data) {
          // this.orderlist = resdata.data.items;
          if (this.page == 'home') {
            const filterdata = resdata.data.items.filter(function (orderlist) {
              return orderlist.status != 'deliveried';
            });
            this.orderlist = filterdata;
          } else {
            const filterdata = resdata.data.items.filter(function (orderlist) {
              return orderlist.status == 'deliveried';
            });
            this.orderlist = filterdata;
          }
        }
      },
      async (error) => {
        console.log(error);
      });
  }
}
