import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-accepted',
  templateUrl: './order-accepted.page.html',
  styleUrls: ['./order-accepted.page.scss'],
})
export class OrderAcceptedPage implements OnInit {
fabAction = false;
  constructor(private navCtrl: NavController, private route: Router) { }

  ngOnInit() {
  }

 toggleFab(){
      this.fabAction = !this.fabAction;
   }
	
 order_pickedup() {
    this.navCtrl.navigateRoot(['./order-pickedup']);
  }
	
 chats() {
    this.route.navigate(['./chat']);
  } 
}

