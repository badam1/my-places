import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PlacesComponent} from './core/places/places.component';
import {ProfileComponent} from './profile/profile.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {PlaceFormComponent} from 'app/core/place-form/place-form.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './core/home/home.component';
import {NotFoundComponent} from './auth/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/about', pathMatch: 'full'},
  {path: 'about', component: HomeComponent},
  {path: 'places', component: PlacesComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignUpComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: SignInComponent, canActivate: [AuthGuard]},
  {path: 'newPlace', component: PlaceFormComponent, canActivate: [AuthGuard]},
  {path: 'newPlace/:lat/:lng', component: PlaceFormComponent, canActivate: [AuthGuard]},
  {path: 'places/:key/details', component: PlaceFormComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
