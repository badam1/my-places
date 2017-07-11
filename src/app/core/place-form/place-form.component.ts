import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { GeocodingApiService } from './geocoding.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit, OnDestroy {

  lat = 47.498924;
  lng = 19.040579;
  placeForm: FormGroup;

  // Address controls and subscriptions for simple and reverse geocoding
  addressControl: any;
  addressSubscription: Subscription;

  constructor(private geocodingAPIService: GeocodingApiService) {
  }

  ngOnInit() {
    this.initForm();
    this.prepareForGeocoding();
  }

  ngOnDestroy() {
    this.addressSubscription.unsubscribe();
  }

  initForm() {
    this.placeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'categories': new FormControl(null, [Validators.required]),
      'imagePath': new FormControl(null, [Validators.required]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'webUrl': new FormControl(null, [Validators.required]),
      'openTime': new FormControl(null, [Validators.required]),
      'closeTime': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.placeForm);
  }

  prepareForGeocoding() {
    this.addressControl = this.placeForm.get('address');
    this.addressSubscription = this.addressControl.valueChanges.debounceTime(150).subscribe(
      () => {
        console.log('Address change');
        this.realtimeGeocoding();
      }
    );
  }

  realtimeGeocoding() {
    const address = this.addressControl.value;
    this.geocodingAPIService
      .findFromAddress(address, '', 'Budapest', '', '', 'Hungary')
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

  realtimeReverseGeocoding($event: any) {
    const lat = $event.coords.lat;
    const lng = $event.coords.lng;

    this.lat = lat;
    this.lng = lng;

    this.geocodingAPIService
      .findFromLatLng(lat, lng)
      .subscribe(response => {
        if (response.status === 'OK') {
          console.log(response.results[0].formatted_address);
          this.addressControl.patchValue(response.results[0].formatted_address);
        } else if (response.status === 'ZERO_RESULTS') {
          console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        } else {
          console.log('geocodingAPIService', 'Other error', response.status);
        }
      })
    ;
  }

}
