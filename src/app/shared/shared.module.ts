import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownDirective} from './app-drop-down.directive';
import { CloseDropdownDirective } from './close-dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    CloseDropdownDirective
  ],
  exports: [
    DropdownDirective
  ]
})
export class SharedModule { }
