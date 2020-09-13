import { Injectable } from '@angular/core';

@Injectable()

export class GlobalvarService {
    currentLocLat: string;
    currentLocLng: string;
    token: string;

    constructor() {
        this.currentLocLat = null;
        this.currentLocLng = null;
        this.token = null;
    }
    setToken(token) {
    this.token =token;
    }
    getToken() {
        return this.token;
    }

    setCurrentLocLat(currentLocLat) {
        this.currentLocLat = currentLocLat
    }

    getCurrentLocLat() {
        return this.currentLocLat;
    }

    setCurrentLocLng(currentLocLng) {
        this.currentLocLng = currentLocLng
    }

    getCurrentLocLng() {
        return this.currentLocLng;
    }



}