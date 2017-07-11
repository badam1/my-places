import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AgmCoreModule} from '@agm/core';

import {HeaderComponent} from './header/header.component';
import {MapComponent} from './map/map.component';
import {PlaceFormComponent} from './place-form/place-form.component';
import {GeocodingApiService} from './map/geocoding.service';
import {NavBrandFlipDirective} from './header/nav-brand-flip.directive';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from '../auth/auth.service';
import {BootstrapValidationService} from '../shared/bootstrap-validation.service';

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
    MapComponent,
    PlaceFormComponent,
    NavBrandFlipDirective
  ],
  providers: [
    GeocodingApiService,
    AuthService,
    BootstrapValidationService,
  ],
  exports: [
    MapComponent,
    HeaderComponent
  ]
})
export class CoreModule {
}
