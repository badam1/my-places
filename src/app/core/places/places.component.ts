import {Component, OnInit} from '@angular/core';
import {AgmInfoWindow} from '@agm/core';

import {Place} from '../place.model';
import {PlacesService} from './places.service';
import {FirebaseListObservable} from 'angularfire2/database';
import {AuthService} from '../../auth/auth.service';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {CategoriesService} from '../categories.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  // BUDAPEST
  lat = 47.498924;
  lng = 19.040579;
  //places: FirebaseListObservable<Place[]>;
  places: Observable<Place[]>;
  showMessage = false;

  constructor(private placesService: PlacesService, public auth: AuthService,private categoriesService:CategoriesService) {
  }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }

  onAddToMyPlaces($key: string, infoWindow: AgmInfoWindow) {
    this.placesService.addToMyPlaces($key);
    this.showMessage = true;
    new TimerObservable(3000).subscribe(()=> {
      this.showMessage = false;
      infoWindow.close();
    });
  }

  getCategoryImagePath(category: string) {
    return this.categoriesService.getCategoryImagePath(category);
  }
}
