import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  private loggedInUser: FirebaseObjectObservable<User>;
  private _isSignedUp = new BehaviorSubject<boolean>(false);

  constructor(private afa: AngularFireAuth, private afd: AngularFireDatabase, private router: Router) {
    afa.authState.subscribe(
      (userObject: firebase.User) => {
        if (userObject != null) {
          this.loggedInUser = this.afd.object(`/users/${userObject.uid}`);
        }
        userObject == null ? this._isSignedUp.next(false) : this._isSignedUp.next(true);
      });
  }

  signUpUser(email: string, username: string, password: string) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password).then((response) =>
      this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).set(new User(email, username))
    ).catch(error => console.log(error));
  }

  signInUser(email: string, password: string) {
    this.afa.auth.signInWithEmailAndPassword(email, password)
      .then((response: firebase.User) => {
        console.log('firebase Auth promise response', response.toJSON());
        this.loggedInUser = this.afd.object(`/users/${this.getAuthCurrentUser().uid}`);
        this.router.navigate(['/places']);
      })
      .catch(error => console.log(error));
  }

  signOutUser() {
    this.afa.auth.signOut();
    this.loggedInUser = null;
    this.router.navigate(['/places']);
  }

  getAuthCurrentUser() {
    return this.afa.auth.currentUser;
  }

  getLoggedUser(): FirebaseObjectObservable<User> {
    return this.loggedInUser;
  }

  updateUser(updatedUser: User, newPassword?: string) {
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).update(updatedUser);
    this.afa.auth.currentUser.updateEmail(updatedUser.email);
    this.afa.auth.currentUser.updatePassword(newPassword);
    this.afa.auth.signOut();
    this.router.navigate(['/signin']);
  }

  deleteUser() {
    this.afd.object(`/users/${this.getAuthCurrentUser().uid}`).remove();
    this.afa.auth.currentUser.delete();
    this.signOutUser();
  }

  removePlaceFromUser($key: string): firebase.Promise<void> {
    return this.afd.object(`/users/${this.getAuthCurrentUser().uid}/places/${$key}`).remove();
  }

  // ezt csak a guardokban kell hasznalni
  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.afa.authState.map(user => !!user).subscribe(v => {
        observer.next(v);
        observer.complete();
      });
    });
  }

  get isSignedUp(): BehaviorSubject<boolean> {
    return this._isSignedUp;
  }
}
