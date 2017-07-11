import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    SignUpComponent,
    SignInComponent,
  ],
})
export class AuthModule {
}
