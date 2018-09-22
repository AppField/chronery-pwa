import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'chy-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  toolbarColor: string;
  user$: Observable<any>;

  constructor(private platform: Platform,
              public auth: AuthService,
              private router: Router,
              private alertCtrl: AlertController,
              private zone: NgZone) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;

    this.user$ = this.auth.user$;
  }

  ngOnInit() {

  }

  signOut(): void {
    this.auth.signOut();
  }

  private async deleteAccount(email: string) {
    const deleted = await this.auth.deleteAccount(email);
    if (deleted) {
      this.zone.run(() => this.router.navigate(['/']));
    }
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Wollen Sie wirklich Ihren Account löschen?',
      message: 'Bitte geben Sie als Bestätigung Ihre E-Mail Adresse ein.',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'E-Mail Adresse'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        }, {
          text: 'Account löschen',

          handler: (inputs) => this.deleteAccount(inputs.email)
        }
      ]
    });

    await alert.present();
  }
}
