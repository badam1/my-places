import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { GeocodingApiService } from './geocoding.service';
import 'rxjs/add/operator/debounceTime';
import { BootstrapValidationService } from '../../shared/bootstrap-validation.service';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Place } from '../place.model';
import { PlacesService } from '../places/places.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit, OnDestroy {
  $key: string;
  place: Place;
  imagePath: string;
  lat = 47.498924;
  lng = 19.040579;
  placeForm: FormGroup;
  categories: string[];
  private invalidImageURL = 'assets/images/sad.png';
  imageLoading: boolean;

  // Address controls and subscriptions for simple and reverse geocoding
  addressControl: AbstractControl;
  addressSubscription: Subscription;

  constructor(private geocodingAPIService: GeocodingApiService,
              private bootstrapService: BootstrapValidationService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private placesService: PlacesService,
              private router: Router) {
  }

  ngOnInit() {
    this.imagePath = this.invalidImageURL;
    this.initForm();
    this.prepareForGeocoding();
    this.categories = this.categoriesService.getCategories();
    if (this.route.snapshot.params['key'] != null) {
      this.route.params.subscribe((params: Params) => {
        this.$key = params['key'];
        this.placesService.getPlaceById(this.$key).subscribe(place => {
          this.place = place;
          this.fillUpFormWithCurrentPlace();
        });
      });
    } else if (this.route.snapshot.params['lat'] != null && this.route.snapshot.params['lng'] != null) {
      // IF GET COORDS IN ROUTING PARAMETER, than call reverse geocoding function with that params.
      this.realtimeReverseGeocoding(+this.route.snapshot.params['lat'], +this.route.snapshot.params['lng']);
    }
  }

  initForm() {
    this.placeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'imagePath': new FormControl(null, [Validators.required,
        Validators.pattern('(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)')]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'webUrl': new FormControl(null, [Validators.required, CustomValidators.url]),
      'openTime': new FormControl(null, [Validators.required]),
      'closeTime': new FormControl(null, [Validators.required]),
    });

    this.placeForm.get('imagePath').valueChanges.debounceTime(1000).subscribe((imageURL) => {
      this.imageLoading = true;
      this.isValidImageURL(imageURL);
    });
  }

  fillUpFormWithCurrentPlace() {
    this.placeForm.setValue({
      'name': this.place.name,
      'description': this.place.description,
      'address': this.place.address,
      'category': this.place.category,
      'imagePath': this.place.imagePath,
      'phoneNumber': this.place.phoneNumber,
      'webUrl': this.place.webUrl,
      'openTime': this.place.openTime,
      'closeTime': this.place.closeTime,
    });
  }

  onSubmit() {
    if (this.route.snapshot.params['key'] != null) {
      this.placesService.updatePlace(this.$key, this.placeForm.value);
    } else {
      const newPlace: Place = this.placeForm.value;
      this.geocodingAPIService.findFromAddress(newPlace.address, '', 'Budapest', '', '', 'Hungary')
        .subscribe(response => {
          if (response.status === 'OK') {
            newPlace.latitude = response.results[0].geometry.location.lat;
            newPlace.longitude = response.results[0].geometry.location.lng;
          } else if (response.status === 'ZERO_RESULTS') {
            console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
          } else {
            console.log('geocodingAPIService', 'Other error', response.status);
          }
          this.placesService.addNewPlace(newPlace);
        });
    }
    this.router.navigate(['places']);
  }

  isValidImageURL(imageURL: string) {
    if (imageURL.match(/\.(jpeg|jpg|gif|png)/) != null) {
      const img = new Image();
      img.onerror = img.onabort = () => {
        this.imagePath = this.invalidImageURL;
      };
      img.onload = () => {
        this.imagePath = imageURL;
        this.imageLoading = false;
      };
      img.src = imageURL;
    } else {
      this.imagePath = this.invalidImageURL;
    }
  }

  getCategoryImagePath(category: string) {
    return this.categoriesService.getCategoryImagePath(category);
  }

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassDiv(control);
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassInput(control);
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

  realtimeReverseGeocoding(lat: number, lng: number) {

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

  ngOnDestroy() {
    this.addressSubscription.unsubscribe();
  }
}
