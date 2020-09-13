import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profiledata: any = {};
  username = null;
  constructor(@Inject(APP_CONFIG) public config: AppConfig,
    private route: Router,
    private storage: Storage,
    private navCtrl: NavController) {
    this.storage.get('profile').then((profile) => {
      this.profiledata = profile;
      this.username = this.profiledata.firstName + ' ' + this.profiledata.lastName;
      console.log(this.profiledata);
    });
  }

  ngOnInit() {
   /* this.storage.get('profile').then((profile) => {
      this.profiledata = profile;
      this.username = this.profiledata.firstName + ' ' + this.profiledata.lastName;
      console.log(this.profiledata);
    });*/
  }
  profile() {
    this.route.navigate(['./my-profile']);
  }
  gotohome() {
    this.navCtrl.navigateRoot(['./tabs/home']);
  }
  select_language() {
    this.route.navigate(['./select-language']);
  }
  terms_conditions() {
    this.route.navigate(['./terms-conditions']);
  }
  support() {
    this.route.navigate(['./support']);
  }
  buyAppAction() {
    window.open("https://bit.ly/cc2_foodish", '_system', 'location=no');
  }
  orderhistory() {
    this.storage.remove('page');
    this.storage.set('page', 'history');
    this.route.navigate(['./myorders']);
  }
}
