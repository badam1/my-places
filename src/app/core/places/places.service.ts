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


@Injectable()
export class PlacesService {
  private places: FirebaseListObservable<Place[]>;
  filterMyPlace: BehaviorSubject<boolean>;

  constructor(private afd: AngularFireDatabase, private auth: AuthService) {
    this.places = afd.list('/places');
  }

  getPlaces() {
    return this.filterMyPlace.flatMap(isFiltered => {
      if (isFiltered) {
        return this.auth.getLoggedUser().
        flatMap(user => this.places
          .map(places => places.filter(place => user.places[place.$key] != null)));
      } else {
        return this.places;
      }
    });
  }

  addToMyPlaces($key: string) {
    this.auth.getLoggedUser().subscribe(user => {
      const userToUpdate = user;
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

