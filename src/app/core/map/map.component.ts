import { Component, OnInit } from '@angular/core';
import { GeocodingApiService } from './geocoding.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // BUDAPEST
  lat = 47.498924;
  lng = 19.040579;

  constructor(private geocodingAPIService: GeocodingApiService) {
  }

  ngOnInit() {
  }

  updateLatLngFromAddress() {
    const address = 'Hrivnák Pál utca';
    const postalCode = '1237';
    const place = '';
    const province = '';
    const region = '';
    const country = '';

    this.geocodingAPIService
      .findFromAddress(address, postalCode, place, province, region, country)
      .subscribe(response => {
        if (response.status === 'OK') {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
        } else if (response.status === 'ZERO_RESULTS') {
          console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        } else {
          console.log('geocodingAPIService', 'Other error', response.status);
        }
      });
  }

}
