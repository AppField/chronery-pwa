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

export const fadeScaleInOut = trigger('fadeScaleInOut', [
  state('*', style({
    'opacity': '1',
    'transform': 'scale3d(1, 1, 1)'
  })),
  state('void', style({
    'opacity': '0',
    'transform': 'scale3d(0.5, 0.5, 0.5)'
  })),
  transition(':enter', animate('250ms ease-out')),
  transition(':leave', animate('250ms ease-in'))
]);

export const fadeInOut = trigger('fadeInOut', [
  state('*', style({
    'opacity': '1',
  })),
  state('void', style({
    'opacity': '0'
  })),
  transition(':enter', animate('250ms ease-out')),
  transition(':leave', animate('250ms ease-in'))
]);
