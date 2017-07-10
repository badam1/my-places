import {Directive, HostBinding, HostListener} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Directive({
  selector: '[appNavBrandFlip]'
})
export class NavBrandFlipDirective {

  @HostBinding('class.navbar-brand-flip') isFlipping = false;

  @HostListener('click') flipping() {
    this.isFlipping = true;
    new TimerObservable(4000).subscribe(() => this.isFlipping = false);
  }
}
