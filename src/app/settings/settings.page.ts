import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'chy-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  toolbarColor: string;

  constructor(private platform: Platform) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
  }

  ngOnInit() {
  }

}
