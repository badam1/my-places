import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import {PasswordValidators} from 'ngx-validators';

import {AuthService} from '../auth/auth.service';
import {BootstrapValidationService} from '../shared/bootstrap-validation.service';
import {User} from '../auth/user.model';
import {Place} from '../core/place.model';
import {PlacesService} from '../core/places/places.service';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loggedUser: User;
  loggedInUserPlaces: Place[] = [];

  constructor(public auth: AuthService,
              private bootstrapService: BootstrapValidationService,
              private placesService: PlacesService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    this.auth.getLoggedUser().subscribe(user => {
      this.loggedUser = user;
      this.refreshLoggedUserPlaces();
        this.profileForm.setValue({
          'username': this.loggedUser.username,
          'email': this.loggedUser.email,
          'password': '',
          'repeatPassword': ''
        });
    });
  }

  private refreshLoggedUserPlaces() {
    // this.loggedInUserPlaces = this.auth.getLoggedUser().switchMap(user => {
    //   return Observable.of(Object.keys(user.places)).mergeMap($key => this.placesService.getPlaceById($key));
    // });

    Object.keys(this.loggedUser.places).map($key => {
      this.placesService.getPlaceById($key)
        .subscribe(place => {
          this.loggedInUserPlaces.push(place);
        });
    });
  }

  private initForm() {
    let username = '';
    let email = '';
    let password = '';
    let repeatPassword = '';
    this.profileForm = new FormGroup({
      'username': new FormControl(username, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(email, [Validators.email]),
      'password': new FormControl(password, Validators.required),
      'repeatPassword': new FormControl(repeatPassword, Validators.required)
    });
    this.profileForm.setValidators(PasswordValidators.mismatchedPasswords('password', 'repeatPassword'));
  }

  onSubmit() {
    let newUser: User = new User('', '');
    const newProfileValues = this.profileForm.value;
    newUser.username = newProfileValues.username;
    newUser.email = newProfileValues.email;
    this.auth.updateUser(newUser, newProfileValues.password);
  }

  onDeleteAccount() {
    this.auth.deleteUser();
  }

  onOpenDetails(place: Place, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([`places/${place.$key}/details`]);
  }

  onRemovePlace(place: Place, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.auth.removePlaceFromUser(place.$key);
  }

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassDiv(control);
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassInput(control);
  }
}
