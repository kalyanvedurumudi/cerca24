import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ApiProvider } from '../providers/api-provider';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  profile: any = {};
  profileForm: any;
  public loaderToShow: any;

  constructor(private navCtrl: NavController,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private route: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private toastCtrl: ToastController) {
    this.profileForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: [null, Validators.compose([
        Validators.minLength(6), Validators.maxLength(20),
      ])],
      phoneNumber: [null, Validators.compose([
        Validators.minLength(8), Validators.maxLength(12),
      ])],
      address: [null, Validators.compose([
        Validators.required
      ])],
      firstName: [null, Validators.compose([
        Validators.required
      ])],
      lastName: [null, Validators.compose([
        Validators.required
      ])]
    });
    this.storage.get('profile').then((profile) => {
      this.profile = profile;
      this.loadProfileData();

    });
  }

  ngOnInit() {

  }
  loadProfileData() {
    this.profileForm.controls['firstName'].setValue(this.profile.firstName);
    this.profileForm.controls['lastName'].setValue(this.profile.lastName);
    this.profileForm.controls['email'].setValue(this.profile.email);
    this.profileForm.controls['address'].setValue(this.profile.address);
    this.profileForm.controls['phoneNumber'].setValue(this.profile.phoneNumber);

  }
  gotoaccount() {
    this.route.navigate(['./account']);
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Updating ....'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    // this.hideLoader();
  }

  hideLoader() {
    this.loadingController.dismiss();
  }
  async showToast(data) {
    const toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'middle'
    });
    (await toast).present();
  }
  updateProfile() {
    const inputdata = {
      activated: true,
      address: this.profileForm.get('address').value,
      email: this.profileForm.get('email').value,
      emailVerified: true,
      phoneNumber: this.profileForm.get('phoneNumber').value,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
    };
    console.log(this.profileForm.get('password').value);
    this.showLoader();
    this.apiProvider.put('drivers', inputdata).subscribe(
      async resdata => {
        console.log(resdata);
        if (resdata.data) {
          this.apiProvider.get('drivers/me').subscribe(
            async profiledata => {
              this.storage.remove('profile');
              this.storage.set('profile', profiledata.data);

              this.hideLoader();
              this.showToast('Profile updated successfully');
            },
            async (error) => {
              this.hideLoader();

            });
        } else {
          this.hideLoader();
          //this.showToast('Faled');
        }
      },
      async (error) => {
        this.showToast('Failed to update the profile,Please try after sometime');
        this.hideLoader();

      });
  }

  gobacktolist() {
    this.navCtrl.navigateRoot(['./tabs/account']);
  }
  signin() {
    this.navCtrl.navigateRoot(['./signin']);
  }
}
