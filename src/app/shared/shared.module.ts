import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownDirective} from './app-drop-down.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective
  ],
  exports: [
    DropdownDirective
  ]
})
export class SharedModule { }
