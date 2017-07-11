import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import {PasswordValidators} from 'ngx-validators';

import {AuthService} from '../auth/auth.service';
import {BootstrapValidationService} from '../shared/bootstrap-validation.service';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loggedUser: User;

  constructor(public auth: AuthService, private bootstrapService: BootstrapValidationService) {
  }

  ngOnInit() {
    this.initForm();
    this.auth.getLoggedUser().subscribe(user => {
      this.loggedUser = user;
      this.profileForm.setValue({
        'username': this.loggedUser.username,
        'email': this.loggedUser.email,
        'password': '',
        'repeatPassword': ''
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
    let newUser: User = new User('','');
    const newProfileValues = this.profileForm.value;
    newUser.username = newProfileValues.username;
    newUser.email = newProfileValues.email;
    this.auth.updateUser(newUser, newProfileValues.password);
  }

  onDeleteAccount() {
    this.auth.deleteUser();
  }

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassDiv(control);
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassInput(control);
  }
}
