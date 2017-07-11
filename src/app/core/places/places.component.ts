import { Component, OnInit } from '@angular/core';
import { GeocodingApiService } from './geocoding.service';
import { Place } from '../place.model';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  // BUDAPEST
  lat = 47.498924;
  lng = 19.040579;
  places: Place[] = [];

  constructor(private geocodingAPIService: GeocodingApiService, private placesService: PlacesService) {
  }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
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
