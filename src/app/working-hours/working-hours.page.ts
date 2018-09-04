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

}
