import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';

import {HeaderComponent} from './header/header.component';
import {PlacesComponent} from './places/places.component';
import {PlaceFormComponent} from './place-form/place-form.component';
import {GeocodingApiService} from './places/geocoding.service';
import {NavBrandFlipDirective} from './header/nav-brand-flip.directive';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXzNCd2YePDSe0W49Cj04gIKip8rVWCHE'
    }),
    HttpModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    PlacesComponent,
    PlaceFormComponent,
    NavBrandFlipDirective
  ],
  providers: [GeocodingApiService],
  exports: [
    PlacesComponent,
    HeaderComponent
  ]
})
export class CoreModule {
}
