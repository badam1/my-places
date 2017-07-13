import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appCloseDropdown]'
})
export class CloseDropdownDirective {

  @HostBinding('class.show') isShow = false;

  @HostListener('click') toggleShow() {
    this.isShow = !this.isShow;
  }

}
