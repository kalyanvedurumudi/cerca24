import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GlobalvarService } from '../providers/GlobalvarService';
import { ApiProvider } from '../providers/api-provider';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs';
declare var google;
@Component({
  selector: 'app-task-assgined',
  templateUrl: './task-assgined.page.html',
  styleUrls: ['./task-assgined.page.scss'],
})
export class TaskAssginedPage implements OnInit {
  fabAction = false;
  items: any = {};
  loaderToShow: any;

  //origin: any = {lat: 9.122349099999997, lng: -79.7311627};
  //destination: any = {lat: 8.5849, lng: 82.3886};
  origin: any = { lat: 17.4875, lng: 78.3953 };
  destination: any = { lat: 17.3983774, lng: 78.55826520000005 };
  waypoint: any = [];
  map: any;
  distance: any = 0;
  duration: any = 0;
  orderstatus = 'processing';
  @ViewChild('map') mapElement: ElementRef;
  // tslint:disable-next-line:new-parens
  directionsService = new google.maps.DirectionsService;
  // tslint:disable-next-line:new-parens
  directionsDisplay = new google.maps.DirectionsRenderer;
  _subs: Subscription;
  pickaddress = null;
  constructor(private navCtrl: NavController,
    private storage: Storage,
    public globalVar: GlobalvarService,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public apiProvider: ApiProvider,
    private callNumber: CallNumber,
    private geolocation: Geolocation
  ) {

    this.storage.get('items').then((items) => {
      this.items = items;
      this.getordetdetails();


    });
  }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this._subs.unsubscribe();
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'loading ....'
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
  getordetdetails() {
    // this.showLoader();
    //this.hideLoader();
    this.apiProvider.get('driver/orders/' + this.items._id + '').subscribe(
      async orderdata => {
        console.log(orderdata.data);

        this.items = orderdata.data;
        if (this.items.status != 'deliveried') {
          this.destination.lat = this.items.location[0];
          this.destination.lng = this.items.location[1];
          this.pickaddress = this.items.details[0];
          console.log(this.pickaddress);
          this.origin.lat = this.items.pickUpAddress.lat;
          this.origin.lng = this.items.pickUpAddress.lng;
          this.loadMap();
          const source = interval(10000);
          this._subs = source.subscribe(val => {
            // TODO
            this.loadMap();
          });

          // this.hideLoader();
          if (this.items.status == 'processing') {
            this.orderstatus = 'accept';
          } else if (this.items.status == 'accept') {
            this.orderstatus = 'pickedUp';
          } else if (this.items.status == 'pickedUp') {
            this.orderstatus = 'onTheWay';
          } else if (this.items.status == 'onTheWay') {
            this.orderstatus = 'deliveried';
          } else {
            this.orderstatus = 'postponed';
          }
        } else {
          this.navCtrl.navigateRoot(['./delivery-completed']);
        }
      },
      async (error) => {
        this.hideLoader();

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

  updateorderstatus(st) {
    let inputdata: any;
    if (st == 'Y') {
      inputdata = {
        status: this.orderstatus
      };
    } else {
      inputdata = {
        status: st
      };
    }
    this.showLoader();
    this.apiProvider.put('driver/update/orders/' + this.items._id + '/' + this.orderstatus, inputdata).subscribe(
      async orderdata => {
        this.getordetdetails();
        this.hideLoader();
        this.showToast('Order updated successfully');

      },
      async (error) => {
        this.hideLoader();

      });

  }

  gobacktolist() {
    this.navCtrl.navigateRoot(['./myorders']);
  }

  makeCall(n: string) {
    this.callNumber.callNumber(n, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }


  loadMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 8.983333, lng: -79.516670 }
    });
    this.directionsDisplay.setMap(map);
    this.calculateAndDisplayRoute();


  }

  calculateAndDisplayRoute() {
    const bounds = new google.maps.LatLngBounds();
    //console.log("<<lat>>" + this.globalVar.getCurrentLocLat());
    //console.log("<<lng>>" + this.globalVar.getCurrentLocLng());
    //8.991763, -79.503250

    //this.globalVar.setCurrentLocLat(8.991763);
    //this.globalVar.setCurrentLocLng(-79.503250);

    /*if (this.globalVar.getCurrentLocLat() == null) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.globalVar.setCurrentLocLat(resp.coords.latitude);
        this.globalVar.setCurrentLocLng(resp.coords.longitude);
      });
    }*/

    console.log(this.globalVar.getCurrentLocLng());
    this.waypoint = [];
    this.waypoint.push({
      location: { lat: this.globalVar.getCurrentLocLat(), lng: this.globalVar.getCurrentLocLng() }, stopover: true
    });
    bounds.extend(this.origin);
    bounds.extend(this.destination);
    const that = this;
    console.log(this.origin);
    console.log(this.destination);
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      waypoints: this.waypoint,
      optimizeWaypoints: false,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        const myRoute = response.routes[0].legs[0];
        console.log(myRoute);
        this.distance = myRoute.distance.text;
        this.duration = myRoute.duration.text;
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setOptions({ suppressMarkers: true });
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: { lat: 8.983333, lng: -79.516670 }
        });
        this.directionsDisplay.setMap(this.map);

        var carMarker = new google.maps.Marker({
          position: myRoute.steps[0].start_location,
          map: this.map,
          icon: 'assets/imgs/store.png'
        });

        var carMarker = new google.maps.Marker({
          position: { lat: this.globalVar.getCurrentLocLat(), lng: this.globalVar.getCurrentLocLng() },
          map: this.map,
          icon: 'assets/imgs/bike48.png'
        });

        var endLoc = new google.maps.Marker({
          position: this.destination,
          map: this.map,
          icon: 'assets/imgs/home.png'
        });

      } else {
        //window.alert('Directions request failed due to ' + status);
      }
    });


    /* this.directionsService.route(
       {
         origin: this.destination,
         destination: this.origin,
         travelMode: 'DRIVING'
       },
       function(response, status) {
         if (status === 'OK') {
           this.directionsDisplay.setDirections(response);
         } else {
           window.alert("Directions request failed due to " + status);
         }
       }
     );*/
  }

  toggleFab() {
    this.fabAction = !this.fabAction;
  }
  navigation() {
    window.open('http://maps.google.com/maps?saddr=' +
      this.origin.lat + ','
      + this.origin.lng + '&daddr=' + this.destination.lat + ',' + this.destination.lng, '_system');

  }

  order_accepted() {
    this.navCtrl.navigateRoot(['./order-accepted']);
  }
}
