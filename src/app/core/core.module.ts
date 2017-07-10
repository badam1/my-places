import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { SideBarComponent } from './side-bar/side-bar.component';
import { MapComponent } from './map/map.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { GeocodingApiService } from './map/geocoding.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXzNCd2YePDSe0W49Cj04gIKip8rVWCHE'
    }),
    HttpModule
  ],
  declarations: [
    SideBarComponent,
    MapComponent,
    PlaceFormComponent
  ],
  providers: [GeocodingApiService],
  exports: [
    MapComponent,
    SideBarComponent
  ]
})
export class CoreModule {
}
