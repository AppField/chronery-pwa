import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const appear = trigger('cardAnimation', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(':enter', stagger('100ms', [
      animate('300ms ease-out', keyframes([
        style({ opacity: 0, transform: 'translate3d(0, 10px, 0)', offset: 0 }),
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
      ]))
    ]), { optional: true }),

    query(':leave', stagger('100ms', [
      animate('300ms ease-in', keyframes([
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0 }),
        style({ opacity: 0, transform: 'translate3d(0, 10px, 0)', offset: 1.0 })
      ]))
    ]), { optional: true })
  ])
]);

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

export function fadeInOut(opacityIn) {
  return trigger('fadeInOut', [
    state('*', style({
      'opacity': `${opacityIn}`,
    })),
    state('void', style({
      'opacity': '0'
    })),
    transition(':enter', animate('250ms ease-out')),
    transition(':leave', animate('250ms ease-in'))
  ]);
}
