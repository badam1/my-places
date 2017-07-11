import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MapComponent} from './core/map/map.component';
import {ProfileComponent} from './profile/profile.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/places', pathMatch: 'full'},
  {path: 'places', component: MapComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
