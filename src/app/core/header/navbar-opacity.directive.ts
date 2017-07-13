import {Directive, HostBinding, HostListener} from '@angular/core';
import {Router} from '@angular/router';


@Directive({
  selector: '[appNavbarOpacity]'
})
export class NavbarOpacityDirective {
  @HostBinding('style.opacity') opacity = 1;
  @HostBinding('style.transition') transition = '.4s ease-in-out';

  constructor(private router: Router) {
  }

  @HostListener('mouseout') initOpacity() {
    if (this.router.url.includes('home')) {
      this.opacity = 0;
    }
  }

  @HostListener('mouseover') changeOpacity() {
    if (this.router.url.includes('home')) {
      this.opacity = 1;
    }
  }
}
