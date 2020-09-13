import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../providers/api-provider';
import { Storage } from '@ionic/storage';
import { GlobalvarService } from '../providers/GlobalvarService';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { LocationTracker } from '../providers/LocationTracker';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public onLoginForm: any;
  public loaderToShow: any;


  constructor(
    private navCtrl: NavController,
    private route: Router,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private loadingController: LoadingController,
    private apiProvider: ApiProvider,
    private storage: Storage,
    private globalvarService: GlobalvarService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private locationTracker: LocationTracker
  ) {
    this.checkGPSPermission();

  }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: [null, Validators.compose([
        Validators.required, Validators.maxLength(20),
      ])]
    });
  }
  async showToast(data) {
    const toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'middle'
    });
    (await toast).present();
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          // this.showToast('Turn on you location services to get your nearest orders');
          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          this.showToast('Turn on you location services to get your nearest orders');
          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        // this.login();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Authenticating ....'
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

  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  }
  signup() {
    this.route.navigate(['./signup']);
  }
  forgotpassword() {
    this.route.navigate(['./forgot-password']);
  }

  async login() {
    const inputdata = {
      email: this.onLoginForm.get('email').value,
      password: this.onLoginForm.get('password').value,

    };
    this.showLoader();
    this.apiProvider.login('auth/driver/login', inputdata).subscribe(
      async resdata => {
        console.log(resdata);
        if (resdata.data.token) {
          const token = resdata.data.token;
          this.globalvarService.setToken(token);
          this.storage.remove('token');
          this.storage.set('token', token);

          this.apiProvider.get('drivers/me').subscribe(
            async profiledata => {
              this.storage.remove('profile');
              this.storage.set('profile', profiledata.data);
              this.storage.remove('driverstatus');
              this.storage.set('driverstatus', profiledata.data.driverStatus);

              this.platform.ready().then(() => {
                this.locationTracker.startTracking();
              });

              this.hideLoader();
              this.navCtrl.navigateRoot(['./tabs']);
            },
            async (error) => {
              this.hideLoader();

            });
        } else {
          this.hideLoader();
          this.showToast('Authentication failed with the given credentials');
        }
      },
      async (error) => {
        this.hideLoader();

      });
  }
}
