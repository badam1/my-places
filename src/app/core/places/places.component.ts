import { Component, OnInit } from '@angular/core';
import { GeocodingApiService } from '../place-form/geocoding.service';
import { Place } from '../place.model';
import { PlacesService } from './places.service';
import {FirebaseListObservable} from 'angularfire2/database';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  // BUDAPEST
  lat = 47.498924;
  lng = 19.040579;
  places: FirebaseListObservable<Place[]>;

  constructor(private placesService: PlacesService, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }
  getCategoryImagePath(category: string) {
    return this.categoriesService.getCategoryImagePath(category);
  }
}
