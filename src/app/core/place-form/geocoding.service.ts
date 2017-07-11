/**
 * Created by sarmasagigy on 2017. 07. 10..
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodingApiService {
  API_KEY: string;
  API_URL_GEOCODE: string;
  API_URL_REVERSE_GEOCODE: string;

  constructor(private http: Http) {
    this.API_KEY = 'AIzaSyCXzNCd2YePDSe0W49Cj04gIKip8rVWCHE';
    this.API_URL_GEOCODE = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
    this.API_URL_REVERSE_GEOCODE = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&latlng=`
  }

  findFromAddress(address: string,
                  postalCode?: string,
                  place?: string,
                  province?: string,
                  region?: string,
                  country?: string): Observable<any> {
    const compositeAddress = [address];

    if (postalCode) {
      compositeAddress.push(postalCode);
    }
    if (place) {
      compositeAddress.push(place);
    }
    if (province) {
      compositeAddress.push(province);
    }
    if (region) {
      compositeAddress.push(region);
    }
    if (country) {
      compositeAddress.push(country);
    }

    const url = `${this.API_URL_GEOCODE}${compositeAddress.join(',')}`;

    return this.http.get(url).map(response => <any> response.json());
  }

  // REVERSE GEOCODING
  findFromLatLng(lat: number, lng: number) {
    const compositeAddress = [];
    if (lat) {
      compositeAddress.push(lat);
    }
    if (lng) {
      compositeAddress.push(lng);
    }
    const url = `${this.API_URL_REVERSE_GEOCODE}${compositeAddress.join(',')}`;
    return this.http.get(url).map(response => <any> response.json());
  }
}
