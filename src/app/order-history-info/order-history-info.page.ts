import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
declare var google;
@Component({
  selector: 'app-order-history-info',
  templateUrl: './order-history-info.page.html',
  styleUrls: ['./order-history-info.page.scss'],
})
export class OrderHistoryInfoPage implements OnInit {
  fabAction = false;
  items: any = {};
  origin: any = { lat: 17.4875, lng: 78.3953 };
  destination: any = { lat: 17.3983774, lng: 78.55826520000005 };
  distance: any = 0;
  duration: any = 0;
  map: any;
  orderstatus = 'processing';
  @ViewChild('map') mapElement: ElementRef;
  // tslint:disable-next-line:new-parens
  directionsService = new google.maps.DirectionsService;
  // tslint:disable-next-line:new-parens
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(
    private route: Router,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.storage.get('items').then((items) => {
      this.items = items;
      console.log(this.items);
      this.destination.lat = this.items.location[0];
      this.destination.lng = this.items.location[1];
      this.origin.lat = this.items.pickUpAddress.lat;
      this.origin.lng = this.items.pickUpAddress.lng;
     
      this.loadMap();
 
    });
   }

  ngOnInit() {
  }

  loadMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 8.983333, lng: -79.516670 }
    });
    this.directionsDisplay.setMap(map);
    this.calculateAndDisplayRoute();


  }

  toggleFab() {
    this.fabAction = !this.fabAction;
  }

  calculateAndDisplayRoute() {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.origin);
    bounds.extend(this.destination);
    const that = this;
    console.log(this.origin);
    console.log(this.destination);
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
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

        const carMarker = new google.maps.Marker({
          position: myRoute.steps[0].start_location,
          map: this.map,
          icon: 'assets/imgs/store.png'
        });

        const endLoc = new google.maps.Marker({
          position: this.destination,
          map: this.map,
          icon: 'assets/imgs/home.png'
        });

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });


  }

  gotohome() {
    this.storage.remove('page');
    this.storage.set('page', 'history');
    this.route.navigate(['./myorders']);
  }

}
