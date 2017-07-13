import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isShow = false;
  thisElementClicked: boolean = false;

  constructor() { }

  @HostListener('click', ['$event'])
  onLocalClick() {
    this.thisElementClicked = true;
    this.isShow = !this.isShow;
  }

  @HostListener('document:click', ['$event'])
  onClick() {
    if (!this.thisElementClicked) {
     this.isShow = false;
    }
    this.thisElementClicked = false;
  }
}
