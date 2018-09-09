import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { endOfMonth } from 'date-fns';

@Component({
  selector: 'chy-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  toolbarColor: string;
  from: string;

  constructor(private platform: Platform) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.from = new Date().toISOString();

  }

  ngOnInit() {
  }

  updateReport(): void {
    console.log('update report');
  }

}
