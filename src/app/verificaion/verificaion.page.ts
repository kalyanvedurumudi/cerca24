import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-verificaion',
  templateUrl: './verificaion.page.html',
  styleUrls: ['./verificaion.page.scss'],
})
export class VerificaionPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
 tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 
}
