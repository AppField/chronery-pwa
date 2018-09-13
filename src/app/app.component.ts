import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WindowRefService } from './services/window-ref.service';

@Component({
  selector: 'chy-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    },
    {
      title: 'Authentifizieren',
      url: '/authenticate',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private windowRef: WindowRefService
  ) {
  }

  ngOnInit() {
    if (environment.production) {
      this.setupSWUpdate();
    }
  }

  private setupSWUpdate(): void {
    this.swUpdate.available
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        console.log('[App] Update available: current version is', event.current, 'available version is', event.available);

        this.presentUpdateToast();
      });
  }

  private async presentUpdateToast() {
    const toast = await this.toastCtrl.create({
      message: 'Eine neue Version ist verfügbar',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Aktualisieren'
    });

    toast.present();

    const dismiss = await toast.onDidDismiss();
    console.log('Dismissed toast', dismiss);
    this.windowRef.nativeWindow.location.reload();
    if (dismiss.role === 'close') {
      console.log('Close button pressed!');
    }

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
