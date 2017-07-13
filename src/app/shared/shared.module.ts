import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './app-drop-down.directive';
import {AlertComponent} from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    AlertComponent,
  ],
  exports: [
    DropdownDirective,
    AlertComponent,
  ]
})
export class SharedModule { }
