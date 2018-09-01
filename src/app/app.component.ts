import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'chy-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Arbeitsstunden',
      url: '/working-hours',
      icon: 'time'
    },
    {
      title: 'Bericht',
      url: '/report',
      icon: 'document'
    },
    {
      title: 'Projekte',
      url: '/projects',
      icon: 'briefcase'
    },
    {
      title: 'Einstellungen',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
  }
}
