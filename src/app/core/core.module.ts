import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';

import {SideBarComponent} from './side-bar/side-bar.component';
import {MapComponent} from './map/map.component';
import {PlaceFormComponent} from './place-form/place-form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXzNCd2YePDSe0W49Cj04gIKip8rVWCHE'
    })
  ],
  declarations: [
    SideBarComponent,
    MapComponent,
    PlaceFormComponent
  ],
  exports: [
    MapComponent,
    SideBarComponent
  ]
})
export class CoreModule {
}
