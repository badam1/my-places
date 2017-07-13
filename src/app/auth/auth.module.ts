import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {SharedModule} from '../shared/shared.module';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule
  ],
  declarations: [
    SignUpComponent,
    SignInComponent,
    NotFoundComponent,
  ],
})
export class AuthModule {
}
