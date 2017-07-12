import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {CategoriesService} from '../categories.service';
import {PlacesService} from '../places/places.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: string[];
  private filterMyPlaces = new BehaviorSubject<boolean>(false);

  constructor(public auth: AuthService, private categoriesService: CategoriesService, private placesService: PlacesService) {
    placesService.filterMyPlace = this.filterMyPlaces;
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
  }

  onFilterMyPlaces() {
    this.filterMyPlaces.next(true);
  }

  removeFilterMyPlaces() {
    this.filterMyPlaces.next(false);
  }

  onSignOut() {
    this.auth.signOutUser();
  }
}
