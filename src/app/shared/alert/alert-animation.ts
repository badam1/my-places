import {animate, state, style, transition, trigger} from '@angular/animations';
export const alertAnimation = [trigger('flyInOut', [
  state('out', style({transform: 'translateX(0)', opacity: 0})),
  transition('out => in', [
    style({transform: 'translateX(-100%)'}),
    animate(150)
  ]),
  transition('in => out', [
    animate(150, style({transform: 'translateX(100%)'}))
  ])
])];
