import {Component, OnInit} from '@angular/core';
import {AgmInfoWindow} from '@agm/core';

import {Place} from '../place.model';
import {PlacesService} from './places.service';
import {AuthService} from '../../auth/auth.service';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {CategoriesService} from '../categories.service';
import {Observable} from 'rxjs/Observable';
import {AlertService} from '../../shared/alert/alert.service';
import {Alert} from '../../shared/alert/alert';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  // BUDAPEST
  lat = 47.498924;
  lng = 19.040579;
  places: Observable<Place[]>;

  constructor(private placesService: PlacesService, public auth: AuthService,
              private categoriesService: CategoriesService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }

  onAddToMyPlaces($key: string, infoWindow: AgmInfoWindow) {
    this.placesService.addToMyPlaces($key);
    this.alertService.showAlert.next(new Alert('INFO', 'Place successfully saved to your places', 'alert-info'));
    new TimerObservable(3000).subscribe(() => {
      infoWindow.close();
    });
  }

  getCategoryImagePath(category: string) {
    return this.categoriesService.getCategoryImagePath(category);
  }

  rightClickOnMapNewPlaceInfoWindow($event, infoWindow: AgmInfoWindow) {
    if (this.auth.isSignedUp.value) {
      infoWindow.latitude = $event.coords.lat;
      infoWindow.longitude = $event.coords.lng;
      infoWindow.open();
    }
  }
}
