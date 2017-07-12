/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import {Place} from '../place.model';
import {AuthService} from '../../auth/auth.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class PlacesService {
  private places: FirebaseListObservable<Place[]>;
  filterPlaces: BehaviorSubject<string>;

  constructor(private afd: AngularFireDatabase, private auth: AuthService) {
    this.places = afd.list('/places');
  }

  getPlaces() {
    return this.filterPlaces.flatMap(filter => {
      switch (filter.split(':')[0]) {
        case 'all':
          return this.places;
        case 'myPlaces':
          return this.auth.getLoggedUser().flatMap(user => this.places
            .map(places => places.filter(place => user.places[place.$key] != null)));
        case 'category':
          return this.filterPlacesForCategory(filter.split(':')[1]);
        default:
          return this.filterForText(filter.split(':')[0]);
      }
    });
  }

  filterPlacesForCategory(category: string) {
    return this.places.map(places => places.filter(place => place.category == category));
  }

  filterForText(text: string) {
    return this.places.map(places => places.filter((place: Place) =>
      Object.values(place).join().toLowerCase().includes(text.toLowerCase())));
  }

  addToMyPlaces($key: string) {
    this.auth.getLoggedUser().take(1).subscribe(user => {
      console.log('placeserviceTS');
      const userToUpdate = user;
      // subscription.unsubscribe();
      if (userToUpdate.places == null) {
        userToUpdate.places = {};
        userToUpdate.places[$key] = true;
      } else {
        userToUpdate.places[$key] = true;
      }

      this.afd.object(`/users/${this.auth.getAuthCurrentUser().uid}`).update(userToUpdate);
    });

  }

  addNewPlace(newPlace: Place) {
    this.places.push(newPlace);
  }

  updatePlace($key: string, updatedPlace: Place) {
    this.places.update($key, updatedPlace);
  }

  getPlaceById($key: string): FirebaseObjectObservable<Place> {
    return this.afd.object(`/places/${$key}`);
  }
}

