import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiProvider } from '../providers/api-provider';
import { Storage } from '@ionic/storage';
import { Subscription, interval } from 'rxjs';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  fabAction = false;
  origin: any = { lat: 17.4875, lng: 78.3953 };
  destination: any = { lat: 17.3983774, lng: 78.55826520000005 };
  waypoint: any = [];
  map: any;
  orderlist: any = [];
  ordercount = 0;
  _subs: Subscription;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  @ViewChild('map') mapElement: ElementRef;
  // tslint:disable-next-line:new-parens
  directionsService = new google.maps.DirectionsService;
  // tslint:disable-next-line:new-parens
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private navCtrl: NavController,
    private geolocation: Geolocation,
    private apiProvider: ApiProvider,
    public toastCtrl: ToastController,
    private storage: Storage) {

    this.storage.get('driverstatus').then((driverstatus) => {
     this.fabAction = driverstatus;
    });
  }

  ngOnInit() {
    //console.log("hhhi");
    this.findUserLocation();
    const source = interval(10000);
    this._subs = source.subscribe(val => {
      // TODO
      this.getmyorders();
    });
  }

  ionViewDidLoad(): void {
    this.findUserLocation();
    this.getmyorders();
  }

  async showToast(data) {
    const toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'middle'
    });
    (await toast).present();
  }
  findUserLocation() {
    console.log("user position");
    const options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    this.geolocation.getCurrentPosition(options).then((position) => {

      this.currentLocation.lat = position.coords.latitude;
      this.currentLocation.lng = position.coords.longitude;
      const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.loadMap(latLng);


    }).catch((error) => {
      this.showToast('Please turn on your location services to get the  delivery orders');
      //alert(error);
    });
  }

  loadMap(latLng: any) {
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    console.log("loading map");
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    // let content = '<h4>Information!</h4>';

    // this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getmyorders() {

    this.apiProvider.get('driver/orders').subscribe(
      async resdata => {
        console.log('started tracking')
        if (resdata.data) {
          this.orderlist = resdata.data.items;
          const filterdata = this.orderlist.filter(function (orderlist) {
            return orderlist.status != 'deliveried';
          });
          this.ordercount = filterdata.length;
        }
      },
      async (error) => {
        console.log(error);
      });
  }



  toggleFab(status) {
    this.apiProvider.get('driver/updatestatus/' + status).subscribe(
      async resdata => {
        this.fabAction =status;
        // !this.fabAction;
      },
      async (error) => {
        console.log(error);
      });

  }

  task_assgined() {
    //this.navCtrl.navigateRoot(['./task-assgined']);
    this.storage.remove('page');
    this.storage.set('page', 'home');
    this.navCtrl.navigateForward(['./myorders']);
  }
}
