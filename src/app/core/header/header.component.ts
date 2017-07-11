import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseObjectObservable} from 'angularfire2/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  subscription: Subscription;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.loggedInUser = new User('', 'username');
    this.subscription = this.auth.loggedInUser.subscribe((user: FirebaseObjectObservable<User>) => {
      console.log(user);
      user.subscribe(user => {
        this.loggedInUser = user;
        console.log(user);
      });
    });
  }

  onSignOut() {
    this.auth.signOutUser();
  }

  ngOnDestroy()  {
    this.subscription.unsubscribe();
  }
}
