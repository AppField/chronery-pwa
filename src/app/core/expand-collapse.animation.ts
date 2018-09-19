import { animate, state, style, transition, trigger } from '@angular/animations';


export const expandCollapse = trigger('expandCollapse', [
  state('*', style({
    'overflow-y': 'hidden',
    'height': '*'
  })),
  state('void', style({
    'height': '0',
    'overflow-y': 'hidden'
  })),
  transition(':enter', animate('250ms ease-out')),
  transition(':leave', animate('250ms ease-in'))
]);
