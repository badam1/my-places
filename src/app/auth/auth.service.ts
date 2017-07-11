import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {User} from './user.model';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AuthService {
  private _token: string;
  loggedInUser = new Subject<FirebaseObjectObservable<User>>();

  constructor(private afa: AngularFireAuth, private afd: AngularFireDatabase, private router: Router) {
  }

  signUpUser(email: string, username: string, password: string) {
    this.afa.auth.createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).set(new User(email, username));
  }

  signInUser(email: string, password: string) {
    this.afa.auth.signInWithEmailAndPassword(email, password)
      .then((response: firebase.User) => {
        console.log('firebase Auth promise response', response.toJSON());
        const currentUser = this.afd.object(`/users/${this.getAuthCurrentUser().uid}`);
        this.loggedInUser.next(currentUser);
        this.refreshToken();
        this.router.navigate(['/places']);
      })
      .catch(error => console.log(error));
  }

  signOutUser() {
    this.afa.auth.signOut();
    this._token = null;
  }

  getAuthCurrentUser() {
    return this.afa.auth.currentUser;
  }

  updateUser(updatedUser: User) {
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).update(updatedUser);
  }

  deleteUser() {
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).remove();
  }

  getToken(): string {
    this.refreshToken();
    return this._token;
  }

  isAuthenticated(): boolean {
    return this._token != null;
  }

  refreshToken() {
    this.afa.auth.currentUser.getIdToken().then((token: string) => this._token = token);
  }
}
