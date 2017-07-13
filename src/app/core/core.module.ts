import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {HeaderComponent} from './header/header.component';
import {PlacesComponent} from './places/places.component';
import {PlaceFormComponent} from './place-form/place-form.component';
import {GeocodingApiService} from './place-form/geocoding.service';
import {NavBrandFlipDirective} from './header/nav-brand-flip.directive';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {PlacesService} from './places/places.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {BootstrapValidationService} from '../shared/bootstrap-validation.service';
import {AuthGuard} from '../auth/auth.guard';
import {CategoriesService} from './categories.service';
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXzNCd2YePDSe0W49Cj04gIKip8rVWCHE'
    }),
    HttpModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    PlacesComponent,
    PlaceFormComponent,
    NavBrandFlipDirective,
    HomeComponent
  ],
  providers: [
    GeocodingApiService,
    PlacesService,
    AuthService,
    AuthGuard,
    BootstrapValidationService,
    CategoriesService,
  ],
  exports: [
    PlacesComponent,
    HeaderComponent
  ]
})
export class CoreModule {
}
