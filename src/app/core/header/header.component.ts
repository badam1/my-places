import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {CategoriesService} from '../categories.service';
import {PlacesService} from '../places/places.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  categories: string[];
  private filterPlaces = new BehaviorSubject<string>('all');
  private filterDebounceTimer: Subscription;

  constructor(public auth: AuthService, private categoriesService: CategoriesService,
              private placesService: PlacesService, public router: Router) {
    this.placesService.filterPlaces = this.filterPlaces;
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
  }

  onFilterMyPlaces() {
    if (this.auth.getLoggedUser()) {
      this.filterPlaces.next('myPlaces');
    }
  }

  onFilterByCategory(category: string) {
    this.filterPlaces.next('category:' + category);
  }

  onSearch(event: KeyboardEvent) {
    if (this.filterDebounceTimer != null) {
      this.filterDebounceTimer.unsubscribe();
    }
    this.filterDebounceTimer = new TimerObservable(300).subscribe(() => {
      this.filterPlaces.next((<HTMLInputElement>event.srcElement).value);
      this.filterDebounceTimer = null;
    });
  }

  removeFilterMyPlaces() {
    this.filterPlaces.next('all');
  }

  onSignOut() {
    this.auth.signOutUser();
  }
}
