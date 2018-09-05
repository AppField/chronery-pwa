import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.page.html',
  styleUrls: ['./working-hours.page.scss'],
})
export class WorkingHoursPage implements OnInit {

  toolbarColor: string;

  constructor(private platform: Platform) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
  }

  ngOnInit() {
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

}
