import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import 'rxjs/add/operator/filter';
import { ApiProvider } from './api-provider';
import { ToastController } from '@ionic/angular';
import { GlobalvarService } from './GlobalvarService';

@Injectable()
export class LocationTracker {

    public watch: any;
    public lat: number = 0;
    public lng: number = 0;

    constructor(public zone: NgZone,
        public backgroundGeolocation: BackgroundGeolocation,
        public geolocation: Geolocation,
        private apiProvider: ApiProvider,
        public toastCtrl: ToastController,
        public globalVar: GlobalvarService) {

    }

    async showToast(data) {
        const toast = this.toastCtrl.create({
            duration: 3000,
            message: data,
            position: 'middle'
        });
        (await toast).present();
    }

    startTracking() {
        const config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: false,
            interval: 2000
        };

        this.backgroundGeolocation.configure(config).then((location) => {

            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;
                this.globalVar.setCurrentLocLat(this.lat);
                this.globalVar.setCurrentLocLng(this.lng);
                const setdata: any = {
                    location: [this.lat, this.lng]
                }
                this.apiProvider.post('drivers/location', setdata).subscribe(
                    async resdata => {
                        console.log('started tracking')
                    },
                    async (error) => {
                        console.log(error);
                    });
            });

        }, (err) => {
            // alert(err);
            //console.log(err);

        });

        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();

        // Foreground Tracking

        const options = {
            frequency: 3000,
            enableHighAccuracy: true
        };

        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {


            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.globalVar.setCurrentLocLat(this.lat);
                this.globalVar.setCurrentLocLng(this.lng);

                const setdata: any = {
                    location: [this.lat, this.lng]
                }
                this.apiProvider.post('drivers/location', setdata).subscribe(
                    async resdata => {
                    },
                    async (error) => {
                        // alert("watch position error");
                        //alert(error);
                    });
            });

        }, async (error) => {
            this.showToast('Please turn on your location services to get the  delivery orders');

        });



    }

    stopTracking() {


    }

}