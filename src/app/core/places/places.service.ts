/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
import {Injectable} from '@angular/core';

import {Place} from '../place.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class PlacesService {

  private places: FirebaseListObservable<Place[]>;

  constructor(private afd: AngularFireDatabase) {
    this.places = afd.list('/places');
  }

  getPlaces() {
    return this.places;
  }

  getPlaceById(id: number) {
    return this.places[id];
  }
}

