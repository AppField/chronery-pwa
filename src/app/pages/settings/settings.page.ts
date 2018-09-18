import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'chy-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  toolbarColor: string;
  user$: Observable<any>;

  constructor(private platform: Platform,
              public auth: AuthService) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;

    this.user$ = this.auth.user$;
  }

  ngOnInit() {

  }

  signOut(): void {
    this.auth.signOut();
  }

}
