import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-pickedup',
  templateUrl: './order-pickedup.page.html',
  styleUrls: ['./order-pickedup.page.scss'],
})
export class OrderPickedupPage implements OnInit {
fabAction = false;
  constructor(private navCtrl: NavController, private route: Router) { }

  ngOnInit() {
  }


 toggleFab(){
      this.fabAction = !this.fabAction;
   }
	
 delivery_completed() {
    this.navCtrl.navigateRoot(['./delivery-completed']);
  }
	
 chats() {
    this.route.navigate(['./chat']);
  } 
}
