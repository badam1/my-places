import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AngularFireModule} from 'angularfire2';


import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {ProfileModule} from './profile/profile.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {firebaseConfig} from '../environments/firebase.config';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    ProfileModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
