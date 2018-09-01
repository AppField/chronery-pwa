import { Component, OnInit } from '@angular/core';

import { MenuController, Platform, SplitPane } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
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
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  ionViewWillenter() {
    this.menuCtrl.enable(true);
  }

  initializeApp() {
  }
}
