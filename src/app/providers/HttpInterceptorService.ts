import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

// operators
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';



@Injectable()
export class HttpInterceptorService extends Http {


    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        private storage: Storage,
        private router: Router,
        public toastCtrl: ToastController,
        public loadingController: LoadingController


    ) {
        super(backend, options);
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

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
            .catch(this.handleError);
    }

    handleError = (error: Response) => {
        // Do messaging and error handling here

        this.hideLoader();
        if (error.status == 401 || error.status == 500) {
            const errMessage = '';
            if (error.status == 401) {
                this.showToast('Session has expired, Please re login');
                this.router.navigate(['/login']);
            } else {
                this.showToast('Something went wrong.Please try after some time');
            }

        } else if (error.status == 400) {
            const resp = JSON.parse(JSON.stringify(error));
            const bodydata = JSON.parse(resp._body);
            console.log(bodydata);
            this.showToast(bodydata.data.message);
        }

        else {
            this.hideLoader();
            return Observable.throw(error);
        }
    }
}
