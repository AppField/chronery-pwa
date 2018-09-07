import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { WorkingHours } from '../../models/working-hours';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.page.html',
  styleUrls: ['./working-hours.page.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('350ms', [
          animate('500ms ease-in', keyframes([
            // style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            // style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            // style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),

            style({ opacity: 0, transform: 'translate3d(0, 20px, 0)', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))
        ]), { optional: true }),

        query(':leave', stagger('350ms', [
          animate('500ms ease-in', keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0 }),
            style({ opacity: 0, transform: 'translate3d(0, 20px, 0)', offset: 1.0 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class WorkingHoursPage implements OnInit {

  toolbarColor: string;

  workingHours: WorkingHours[] = [];

  constructor(private platform: Platform) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.createDummyData();
  }

  ngOnInit() {
  }

  addWorkingHours(): void {
    this.workingHours.push(new WorkingHours());
  }

  deleteWorkingHours(workingHours: WorkingHours): void {
    // TODO: Implement actual delete method
    this.workingHours.pop();
  }

  /*
  * Used to remove opened modal when pressing the back button on a smartphone.
  * */
  // backButtonListener(): void {
  //   window.onpopstate = (evt) => {
  //     // Close any active modals or overlays
  //     let activePortal = this._ionicApp._loadingPortal.getActive() ||
  //       this._ionicApp._modalPortal.getActive() ||
  //       this._ionicApp._toastPortal.getActive() ||
  //       this._ionicApp._overlayPortal.getActive();
  //     if (activePortal) {
  //       activePortal.dismiss();
  //       return;
  //     }
  //   }
  // }

  // TODO: Remove method with actual data
  private createDummyData(): void {
    for (let i = 0; i < 4; i++) {
      this.workingHours.push(new WorkingHours());
    }
  }

}
