import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {User} from './user.model';


@Injectable()
export class AuthService {
  private _token: string;
  private loggedInUser: FirebaseObjectObservable<User>;

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
        this.loggedInUser = this.afd.object(`/users/${this.getAuthCurrentUser().uid}`);
        this.refreshToken();
        this.router.navigate(['/places']);
      })
      .catch(error => console.log(error));
  }

  signOutUser() {
    this.afa.auth.signOut();
    this._token = null;
    this.router.navigate(['/places']);
  }

  getAuthCurrentUser() {
    return this.afa.auth.currentUser;
  }

  getLoggedUser(): FirebaseObjectObservable<User> {
    return this.loggedInUser;
  }

  updateUser(updatedUser: User, newPassword: string) {
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).update(updatedUser);
    this.afa.auth.currentUser.updateEmail(updatedUser.email);
    this.afa.auth.currentUser.updatePassword(newPassword);
    this._token = null;
    this.afa.auth.signOut();
    this.router.navigate(['/signin']);
  }

  deleteUser() {
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).remove();
    this.afa.auth.currentUser.delete();
    this._token = null;
    this.signOutUser();
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
